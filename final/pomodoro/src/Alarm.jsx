import { useState, useEffect, useContext } from "react";
import { ACTIONS, TIMER_STATUS } from "./constants";
import { fetchAlarm, fetchPutAlarm, fetchPutTimer, fetchDeleteAlarm } from "./services";
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
		fetchPutAlarm(inputTime)
			.then(({ alarmState }) => {
				dispatch({ type: ACTIONS.SET_ALARM, alarmState });
			})
			.catch((err) => console.log(err));
	};

	const handleCancelAlarm = (e) => {
		e.preventDefault();
		fetchDeleteAlarm()
			.then((alarmState) => {
				dispatch({ type: ACTIONS.SET_ALARM, alarmState });
			})
			.catch((err) => console.log(err));
	};

	// Compare current time with alarm time every second, if they equals then start timer and cancel alarm
	useEffect(() => {
		const checkAlarm = (currentTime) => {
			const date = new Date();
			const alarmDate = new Date(date.toDateString() + " " + state.alarmState.alarmTime);
			const currentDate = new Date(date.toDateString() + " " + currentTime);
			if (alarmDate.getTime() === currentDate.getTime()) {
				fetchPutTimer(TIMER_STATUS.WORK)
					.then(({ timerState }) => {
						dispatch({ type: ACTIONS.TIMER_SET, timerState });
						return fetchDeleteAlarm();
					})
					.catch((err) => Promise.reject(err))
					.then((alarmState) => {
						dispatch({ type: ACTIONS.SET_ALARM, alarmState });
					})
					.catch((err) => console.log(err));
			}
		};

		if (state.alarmState.isAlarmOn) {
			const timer = setInterval(() => {
				const currentTime = getCurrentTime();
				setCurrentTime(currentTime);
				checkAlarm(currentTime);
			}, 1000);

			return () => clearInterval(timer);
		}
	}, [state.alarmState.alarmTime]);

	useEffect(() => {
		fetchAlarm()
			.then(({ alarmState }) => {
				dispatch({ type: ACTIONS.SET_ALARM, alarmState });
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className="alarm">
			<h2 class="alarm-heading">Alarm</h2>
			<p class="alarm-message">The current time is: {currentTime}</p>
			<form className="alarm-form" onSubmit={handleSetAlarm}>
				<label htmlFor="alarmTime">Schedule time to start Pomodoro timer:</label>
				<input type="time" id="alarmTime" name="alarmTime" value={state.alarmState.alarmTime} className="alarm-input"/>
				<button type="submit" className="btn">Set</button>
			</form>
			{state.alarmState.isAlarmOn && (
				<form onSubmit={handleCancelAlarm}>
					<button type="submit" className="btn">Cancel</button>
				</form>
			)}
		</div>
	);
}

export default Alarm;
