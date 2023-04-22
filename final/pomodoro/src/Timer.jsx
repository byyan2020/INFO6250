import { useEffect, useState } from "react";
import { ACTIONS, TIMER_TIME } from "./constants";
import {
	fetchPutTimer,
	fetchTimer,
	fetchTimerContinue,
	fetchTimerPause,
	fetchTimerReset,
  fetchTimerRest,
	fetchTimerWork,
} from "./services";
import { useContext } from "react";
import AppContext from "./AppContext";

function Timer() {
	const { state, dispatch } = useContext(AppContext);

	/* Timer status
  1. not running
  2. running & in work session
  3. runing & in work session & paused
  4. runnins & in rest session
  5. running & in rest session & paused
  */

	const handleWork = () => {
		fetchTimerWork().then(({ timerStatus }) => {
			dispatch({ type: ACTIONS.TIMER_SET, timerStatus });
		});
	};

	const handleRest = () => {
		fetchTimerRest().then(() => {
			dispatch({ type: ACTIONS.TIMER_REST_SESSION });
		});
	};

	const handlePause = () => {
		if (state.timerStatus.isTimerPaused) {
			fetchTimerContinue().then(() => {
				dispatch({ type: ACTIONS.TIMER_CONTINUE });
			});
		} else {
			fetchTimerPause().then(() => {
				dispatch({ type: ACTIONS.TIMER_PAUSE });
			});
		}
	};

	const handleCancleTimer = () => {
		fetchTimerReset().then(() => {
			dispatch({ type: ACTIONS.TIMER_NOT_START });
		});
	};

	// Change timer every second
	useEffect(() => {
		if (state.timerStatus.isTimerStart && !state.timerStatus.isTimerPaused) {
			const timer = setInterval(() => {
				dispatch({ type: ACTIONS.TIMER_DECREMENT });
			}, 1000);
			if (state.timerStatus.secondsLeft === 0 && state.timerStatus.isOnWorkSession) {
				fetchTimerRest().then(() => dispatch({ type: ACTIONS.TIMER_REST_SESSION }));
			} else if (state.timerStatus.secondsLeft === 0 && !state.timerStatus.isOnWorkSession) {
        fetchTimerWork().then(() => dispatch({ type: ACTIONS.TIMER_WORK_SESSION }))
				dispatch({ type: ACTIONS.RECORD_INCREMENT });
			}
			return () => clearInterval(timer);
		}
	}, [state.timerStatus.isTimerStart, state.timerStatus.isTimerPaused, state.timerStatus.secondsLeft]);

	// Fetch timer from backend when page reload
	useEffect(() => {
		fetchTimer()           
			.then(({ timerStatus }) => {
        console.log(timerStatus)
				dispatch({ type: ACTIONS.TIMER_SET, timerStatus });
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	// Update backend timer when frontend timer change
	// useEffect(() => {
	// 	if (state.timerStatus.isTimerStart) {
	// 		fetchPutTimer(state.timerStatus).catch((err) => {
	// 			console.log(err);
	// 		});
	// 	}
	// }, [state.timerStatus]);

	const minutes = Math.floor(state.timerStatus.secondsLeft / 60);
	const seconds = state.timerStatus.secondsLeft % 60;
	const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
		.toString()
		.padStart(2, "0")}`;

	return (
		<>
			<h2>Timer</h2>
			<div>Timer: {formattedTime}</div>
			{state.timerStatus.isTimerStart && (
				<p>
					{!state.timerStatus.isOnWorkSession
						? "You are currently on a rest cycle"
						: "You are currently on a work cycle"}
				</p>
			)}
			{state.timerStatus.isTimerStart && (
				<button onClick={handlePause}>
					{state.timerStatus.isTimerPaused ? "Continue" : "Pause"}
				</button>
			)}
			{!state.timerStatus.isTimerStart && (
				<button onClick={handleWork}>Start a new work cycle</button>
			)}
			{state.timerStatus.isTimerStart && !state.timerStatus.isOnWorkSession && (
				<button onClick={handleWork}>Start a new work cycle</button>
			)}
			{state.timerStatus.isTimerStart && state.timerStatus.isOnWorkSession && (
				<button onClick={handleRest}>Skip to rest</button>
			)}
			{state.timerStatus.isTimerStart && <button onClick={handleCancleTimer}>Cancle Timer</button>}
		</>
	);
}

export default Timer;
