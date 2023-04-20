import { useState, useRef, useEffect } from "react";
import { TIMER_TIME } from "./constants";
import { fetchAlarm, fetchPutAlarm, fetchPutTimer } from "./services";

function Alarm({setTime, setIsRunning}) {
	const getCurrentTime = () => {
		const date = new Date();
		return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
	};

	const [currentTime, setCurrentTime] = useState(getCurrentTime());
	const [alarmTime, setAlarmTime] = useState(null);
	const [alarmOn, setAlarmOn] = useState(false);

	const handleSetAlarm = (e) => {
		e.preventDefault();
		let inputTime = e.target.elements.alarmTime.value;
		setAlarmTime(inputTime);
		setAlarmOn(true);
    fetchPutAlarm(inputTime, true).catch(err => console.log(err))
	};

	const handleCancelAlarm = (event) => {
		event.preventDefault();
		setAlarmTime(null);
		setAlarmOn(false);
    fetchPutAlarm(null, false).catch(err => console.log(err))
	};

	useEffect(() => {
		const checkAlarm = (currentTime) => {
			const date = new Date();
			const alarmDate = new Date(date.toDateString() + " " + alarmTime);
			const currentDate = new Date(date.toDateString() + " " + currentTime);
			if (alarmDate.getTime() === currentDate.getTime()) {
				setTime(TIMER_TIME.WORK)
        setIsRunning(true)
				setAlarmTime(null);
				setAlarmOn(false);
        fetchPutAlarm(null, false).catch(err => console.log(err))
        fetchPutTimer(TIMER_TIME.WORK, true, false, false)
			}
		};

		const timer = setInterval(() => {
      const currentTime = getCurrentTime()
			setCurrentTime(currentTime);
			checkAlarm(currentTime);
		}, 1000);

		return () => clearInterval(timer);
	}, [alarmTime]);

  useEffect(() => {
    fetchAlarm()
    .then(response => {
      setAlarmTime(response.alarm)
      setAlarmOn(response.isAlarmOn)
    })
    .catch(err => console.log(err))
  }, [])

	return (
		<div className="alarm">
			<h2>Alarm</h2>
			<p>The current time is: {currentTime}</p>
			<form onSubmit={handleSetAlarm}>
				<label htmlFor="alarmTime">Schedule time to start Pomodoro timer:</label>
				<input type="time" id="alarmTime" name="alarmTime" value={alarmTime}/>
				<button type="submit">Set</button>
			</form>
			{alarmOn && (
				<form onSubmit={handleCancelAlarm}>
					<button type="submit">Cancel</button>
				</form>
			)}
		</div>
	);
}

export default Alarm;
