import { useEffect, useState } from "react";
import { TIMER_TIME } from "./constants";
import { fetchPutTimer, fetchTimer } from "./services";

function Timer({ time, setTime, isRunning, setIsRunning, count, setCount }) {
	const [workFinished, setWorkFinished] = useState(false);
	const [isTempPaused, setIsTempPaused] = useState(false);

  /* 
  1. not running
  2. running & in work session
  3. runing & in work session & paused
  4. runnins & in rest session
  5. running & in rest session & paused
  */

	const handleWork = () => {
		setTime(TIMER_TIME.WORK);
		setIsRunning(true);
		setWorkFinished(false);
	};

	const handleRest = () => {
		setTime(TIMER_TIME.REST);
		setIsRunning(true);
		setWorkFinished(true);
	};

	const handlePause = () => {
		setIsTempPaused(!isTempPaused);
	};

	const handleCancleTimer = () => {
		setIsRunning(false);
		setIsTempPaused(false);
		setTime(TIMER_TIME.WORK);
	};

  // Change timer every second
	useEffect(() => {
		if (isRunning && !isTempPaused) {
			const timer = setInterval(() => {
				setTime((prevTime) => prevTime - 1);
			}, 1000);
			if (time === 0 && !workFinished) {
				setTime(TIMER_TIME.REST);
				setWorkFinished(true);
			} else if (time === 0 && workFinished) {
				setTime(TIMER_TIME.WORK);
				setWorkFinished(false);
				setCount((prevCount) => prevCount + 1);
			}
			return () => clearInterval(timer);
		}
	}, [isRunning, isTempPaused, time]);

  // Fetch timer from backend when page reload
	useEffect(() => {
		fetchTimer()
			.then(({ timer, isTimerRunning, isTimerPaused, isWorkFinished }) => {
        console.log(timer, isTimerRunning, isTimerPaused, isWorkFinished)
				setTime(timer);
				setIsRunning(isTimerRunning);
				setIsTempPaused(isTimerPaused);
        setWorkFinished(isWorkFinished)
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

  // Update backend timer when frontend timer change
	useEffect(() => {
    if (isRunning) {
      fetchPutTimer(time, isRunning, isTempPaused, workFinished).catch((err) => {
        console.log(err);
		})};
	}, [time, isRunning, isTempPaused, workFinished]);

	const minutes = Math.floor(time / 60);
	const seconds = time % 60;
	const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
		.toString()
		.padStart(2, "0")}`;

	return (
		<>
			<h2>Timer</h2>
			<div>Timer: {formattedTime}</div>
			{isRunning && (
				<p>
					{workFinished ? "You are currently on a rest cycle" : "You are currently on a work cycle"}
				</p>
			)}
			{isRunning && <button onClick={handlePause}>{isTempPaused ? "Continue" : "Pause"}</button>}
			{!isRunning && <button onClick={handleWork}>Start a new work cycle</button>}
			{isRunning && workFinished && <button onClick={handleWork}>Start a new work cycle</button>}
			{isRunning && !workFinished && <button onClick={handleRest}>Skip to rest</button>}
			{isRunning && <button onClick={handleCancleTimer}>Cancle Timer</button>}
		</>
	);
}

export default Timer;
