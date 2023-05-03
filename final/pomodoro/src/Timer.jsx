import { useEffect } from "react";
import { ACTIONS, TIMER_STATUS } from "./constants";
import {
	fetchPutTimer,
	fetchTimer,
  fetchPutRecord
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

	useEffect(() => {
    // Change timer every second
		if (state.timerState.isTimerStart && !state.timerState.isTimerPaused) {
			const timer = setInterval(() => {
				dispatch({ type: ACTIONS.TIMER_DECREMENT });
			}, 1000);
      // Change timer from work session to rest session
			if (state.timerState.secondsLeft === 0 && state.timerState.isOnWorkSession) {
				fetchPutTimer(TIMER_STATUS.REST).then(({ timerState }) => dispatch({ type: ACTIONS.TIMER_SET, timerState }));
      // Change timer from rest session to work session
			} else if (state.timerState.secondsLeft === 0 && !state.timerState.isOnWorkSession) {
        fetchPutTimer(TIMER_STATUS.WORK).then(({ timerState }) => {
          dispatch({ type: ACTIONS.TIMER_SET, timerState });
          // Increment the record count when one circle finished
          return fetchPutRecord(state.recordState.count + 1)
        })
        .catch(err => Promise.reject(err))
        .then(({recordState}) => {
          dispatch({ type: ACTIONS.SET_RECORD, recordState });
        })
        .catch(err => console.log(err))
			}
			return () => clearInterval(timer);
		}
	}, [state.timerState.isTimerStart, state.timerState.isTimerPaused, state.timerState.secondsLeft]);

	// Fetch timer from backend when page reload
	useEffect(() => {
		fetchTimer()           
			.then(({ timerState }) => {
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
		<div className="timer">
			<h2 className="timer-heading">Timer</h2>
			<p className="timer-message">Timer: {formattedTime}</p>
			{state.timerState.isTimerStart && (
				<p>
					{!state.timerState.isOnWorkSession
						? "You are currently on a rest cycle"
						: "You are currently on a work cycle"}
				</p>
			)}
			{state.timerState.isTimerStart && (
				<button onClick={handlePause} className="btn">
					{state.timerState.isTimerPaused ? "Continue" : "Pause"}
				</button>
			)}
			{!state.timerState.isTimerStart && (
				<button onClick={handleWork} className="btn">Start a new work cycle</button>
			)}
			{state.timerState.isTimerStart && !state.timerState.isOnWorkSession && (
				<button onClick={handleWork} className="btn">Start a new work cycle</button>
			)}
			{state.timerState.isTimerStart && state.timerState.isOnWorkSession && (
				<button onClick={handleRest} className="btn">Skip to rest</button>
			)}
			{state.timerState.isTimerStart && <button onClick={handleCancleTimer} className="btn">Cancle Timer</button>}
		</div>
	);
}

export default Timer;
