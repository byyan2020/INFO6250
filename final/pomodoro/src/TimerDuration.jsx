import React, { useState } from "react";
import { useContext } from "react";
import AppContext from "./AppContext";
import { fetchPutTimerDuration, fetchTimer } from "./services";
import { ACTIONS } from "./constants";

function TimerDuration() {
	const { state, dispatch } = useContext(AppContext);
	const [workDuration, setWorkDuration] = useState(state.timerState.workDuration / 60);
	const [restDuration, setRestDuration] = useState(state.timerState.restDuration / 60);

	function handleSetTimeDuration(e) {
		e.preventDefault();
		fetchPutTimerDuration(workDuration, restDuration)
			.then(({ workDuration, restDuration }) => {
				dispatch({ type: ACTIONS.TIMER_DURATION, workDuration, restDuration });
				return fetchTimer();
			})
			.catch((err) => Promise.reject(err))
			.then(({ timerState }) => {
				dispatch({ type: ACTIONS.TIMER_SET, timerState });
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<div>
			<h2>Set Timer Duration</h2>
			<form onSubmit={handleSetTimeDuration}>
				<label>
					Set work duration (minutes):
					<input
						type="number"
						min="0"
						step="1"
						value={workDuration}
						onChange={(e) => setWorkDuration(e.target.value)}
					/>
				</label>
				<label>
					Set rest duration (minutes):
					<input
						type="number"
						min="0"
						step="1"
						value={restDuration}
						onChange={(e) => setRestDuration(e.target.value)}
					/>
				</label>
				<button type="submit" className="form-btn">
					Submit
				</button>
			</form>
		</div>
	);
}

export default TimerDuration;
