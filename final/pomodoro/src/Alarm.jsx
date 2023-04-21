import { useState, useEffect, useContext } from "react";
import { ACTIONS, TIMER_TIME } from "./constants";
import { fetchAlarm, fetchPutAlarm, fetchPutTimer } from "./services";
import AppContext from "./AppContext";

function Alarm() {
	const { state, dispatch } = useContext(AppContext);

	const getCurrentTime = () => {
		const date = new Date();
		return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
	};

	const [currentTime, setCurrentTime] = useState(getCurrentTime());

	const handleSetAlarm = (e) => {
		e.preventDefault();
		let inputTime = e.target.elements.alarmTime.value;
		fetchPutAlarm(inputTime, true)
			.then((alarmStatus) => {
				dispatch({ type: ACTIONS.SET_ALARM, alarmStatus });
			})
			.catch((err) => console.log(err));
	};

	const handleCancelAlarm = (event) => {
		event.preventDefault();
		fetchPutAlarm(null, false)
			.then((alarmStatus) => {
				dispatch({ type: ACTIONS.SET_ALARM, alarmStatus });
			})
			.catch((err) => console.log(err));
	};

	// Compare current time with alarm time every second, if they equals then start timer and cancel alarm
	useEffect(() => {
		const checkAlarm = (currentTime) => {
			const date = new Date();
			const alarmDate = new Date(date.toDateString() + " " + state.alarmStatus.alarmTime);
			const currentDate = new Date(date.toDateString() + " " + currentTime);
			if (alarmDate.getTime() === currentDate.getTime()) {
				fetchPutAlarm(null, false)
					.then((alarmStatus) => {
						dispatch({ type: ACTIONS.SET_ALARM, alarmStatus });
					})
					.catch((err) => console.log(err));
				// TODO first set frontend then send data to backend?
				dispatch({ type: ACTIONS.TIMER_WORK_SESSION });
				fetchPutTimer(state.timerStatus)
					.then((timerStatus) => {
						dispatch({ type: ACTIONS.TIMER_WORK_SESSION });
					})
					.catch((err) => console.log(err));
			}
		};

		const timer = setInterval(() => {
			const currentTime = getCurrentTime();
			setCurrentTime(currentTime);
			checkAlarm(currentTime);
		}, 1000);

		return () => clearInterval(timer);
	}, [state.alarmStatus.alarmTime]);

	useEffect(() => {
		fetchAlarm()
			.then((alarmStatus) => {
				dispatch({ type: ACTIONS.SET_ALARM, alarmStatus });
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className="alarm">
			<h2>Alarm</h2>
			<p>The current time is: {currentTime}</p>
			<form onSubmit={handleSetAlarm}>
				<label htmlFor="alarmTime">Schedule time to start Pomodoro timer:</label>
				<input type="time" id="alarmTime" name="alarmTime" value={state.alarmStatus.alarmTime} />
				<button type="submit">Set</button>
			</form>
			{state.alarmStatus.isAlarmOn && (
				<form onSubmit={handleCancelAlarm}>
					<button type="submit">Cancel</button>
				</form>
			)}
		</div>
	);
}

export default Alarm;
