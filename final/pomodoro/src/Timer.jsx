import { useEffect, useState } from "react";
import { ACTIONS, TIMER_STATUS, TIMER_TIME } from "./constants";
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
		fetchPutTimer(TIMER_STATUS.WORK).then(({ timerState }) => {
			dispatch({ type: ACTIONS.TIMER_SET, timerState });
		});
	};

	const handleRest = () => {
		fetchPutTimer(TIMER_STATUS.REST).then(({ timerState }) => {
			dispatch({ type: ACTIONS.TIMER_SET, timerState });
		});
	};

	const handlePause = () => {
		if (state.timerState.isTimerPaused) {
			fetchPutTimer(TIMER_STATUS.CONTINUE).then(({ timerState }) => {
        dispatch({ type: ACTIONS.TIMER_SET, timerState });
      });
		} else {
			fetchPutTimer(TIMER_STATUS.PAUSE).then(({ timerState }) => {
        dispatch({ type: ACTIONS.TIMER_SET, timerState });
      });
		}
	};

	const handleCancleTimer = () => {
		fetchPutTimer(TIMER_STATUS.RESET).then(({ timerState }) => {
			dispatch({ type: ACTIONS.TIMER_SET, timerState });
		});
	};

	// Change timer every second
	useEffect(() => {
		if (state.timerState.isTimerStart && !state.timerState.isTimerPaused) {
			const timer = setInterval(() => {
				dispatch({ type: ACTIONS.TIMER_DECREMENT });
			}, 1000);
			if (state.timerState.secondsLeft === 0 && state.timerState.isOnWorkSession) {
				fetchPutTimer(TIMER_STATUS.REST).then(({ timerState }) => dispatch({ type: ACTIONS.TIMER_SET, timerState }));
			} else if (state.timerState.secondsLeft === 0 && !state.timerState.isOnWorkSession) {
        fetchPutTimer(TIMER_STATUS.WORK).then(({ timerState }) => {
          dispatch({ type: ACTIONS.TIMER_SET, timerState });
        });
				dispatch({ type: ACTIONS.RECORD_INCREMENT });
			}
			return () => clearInterval(timer);
		}
	}, [state.timerState.isTimerStart, state.timerState.isTimerPaused, state.timerState.secondsLeft]);

	// Fetch timer from backend when page reload
	useEffect(() => {
		fetchTimer()           
			.then(({ timerState }) => {
        console.log(timerState)
				dispatch({ type: ACTIONS.TIMER_SET, timerState });
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const minutes = Math.floor(state.timerState.secondsLeft / 60);
	const seconds = state.timerState.secondsLeft % 60;
	const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
		.toString()
		.padStart(2, "0")}`;

	return (
		<>
			<h2>Timer</h2>
			<div>Timer: {formattedTime}</div>
			{state.timerState.isTimerStart && (
				<p>
					{!state.timerState.isOnWorkSession
						? "You are currently on a rest cycle"
						: "You are currently on a work cycle"}
				</p>
			)}
			{state.timerState.isTimerStart && (
				<button onClick={handlePause}>
					{state.timerState.isTimerPaused ? "Continue" : "Pause"}
				</button>
			)}
			{!state.timerState.isTimerStart && (
				<button onClick={handleWork}>Start a new work cycle</button>
			)}
			{state.timerState.isTimerStart && !state.timerState.isOnWorkSession && (
				<button onClick={handleWork}>Start a new work cycle</button>
			)}
			{state.timerState.isTimerStart && state.timerState.isOnWorkSession && (
				<button onClick={handleRest}>Skip to rest</button>
			)}
			{state.timerState.isTimerStart && <button onClick={handleCancleTimer}>Cancle Timer</button>}
		</>
	);
}

export default Timer;
