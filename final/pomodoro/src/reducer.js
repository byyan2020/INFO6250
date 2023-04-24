import { CLIENT, ACTIONS, TIMER_TIME } from "./constants";

export const initialState = {
	error: "",
	username: "",
	isLoggedIn: false,
	timerState: {},
	alarmState: {},
	recordState: {},
};

function reducer(state, action) {
	switch (action.type) {
		// Sessions
		case ACTIONS.LOG_IN:
			return {
				...state,
				error: "",
				isLoggedIn: true,
				username: action.username,
			};

		case ACTIONS.LOG_OUT:
			return {
				...state,
				error: "",
				isLoggedIn: false,
				username: "",
			};

		// Timer
		case ACTIONS.TIMER_SET:
			return {
				...state,
				timerState: action.timerState,
			};

		case ACTIONS.TIMER_DECREMENT:
			return {
				...state,
				timerState: {
					...state.timerState,
					secondsLeft: state.timerState.secondsLeft - 1,
				},
			};

		case ACTIONS.TIMER_DURATION:
			return {
				...state,
				timerState: {
					...state.timerState,
					workDuration: action.workDuration,
					restDuration: action.restDuration,
				},
			};

		// Alarm
		case ACTIONS.SET_ALARM:
			return {
				...state,
				alarmState: action.alarmState,
			};

		// Record
		case ACTIONS.SET_RECORD:
			return {
				...state,
				recordState: action.recordState,
			};

		case ACTIONS.REPORT_ERROR:
			return {
				...state,
				error: action.error || "ERROR",
			};

		default:
			throw new Error({ error: CLIENT.UNKNOWN_ACTION, detail: action });
	}
}

export default reducer;
