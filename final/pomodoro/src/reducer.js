import { CLIENT, ACTIONS, TIMER_TIME } from "./constants";

export const initialState = {
	error: "",
	username: "",
	isLoggedIn: false,
	timerStatus: {},
	alarmStatus: {},
	count: 0,
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
				timerStatus: action.timerStatus,
			};

		case ACTIONS.TIMER_DECREMENT:
			return {
				...state,
				timerStatus: {
					...state.timerStatus,
					seconds: state.timerStatus.seconds - 1,
				},
			};

		case ACTIONS.TIMER_WORK_SESSION:
			return {
				...state,
				error: "",
				timerStatus: {
					...state.timerStatus,
					seconds: TIMER_TIME.WORK,
					isTimerStart: true,
					isTimerPaused: false,
					isOnWorkSession: true,
				},
			};

		case ACTIONS.TIMER_REST_SESSION:
			return {
				...state,
				error: "",
				timerStatus: {
					...state.timerStatus,
					seconds: TIMER_TIME.REST,
					isTimerStart: true,
					isTimerPaused: false,
					isOnWorkSession: false,
				},
			};

		case ACTIONS.TIMER_PAUSE:
			return {
				...state,
				error: "",
				timerStatus: {
					...state.timerStatus,
					isTimerPaused: true,
				},
			};

		case ACTIONS.TIMER_CONTINUE:
			return {
				...state,
				error: "",
				timerStatus: {
					...state.timerStatus,
					isTimerPaused: false,
				},
			};

		case ACTIONS.TIMER_NOT_START:
			return {
				...state,
				error: "",
				timerStatus: {
					...state.timerStatus,
					seconds: TIMER_TIME.WORK,
					isTimerStart: false,
					isTimerPaused: false,
					isOnWorkSession: true,
				},
			};

		// Alarm
		case ACTIONS.SET_ALARM:
			return {
				...state,
				alarmStatus: action.alarmStatus,
			};

		// Record
		case ACTIONS.RECORD_INCREMENT:
			return {
				...state,
				count: state.count + 1,
			};

		case ACTIONS.REPORT_ERROR:
			// We could move the "pick the message" logic from Status.jsx here. Better? It depends.
			return {
				...state,
				error: action.error || "ERROR", // ERROR is just to ensure a truthy value
			};

		default:
			throw new Error({ error: CLIENT.UNKNOWN_ACTION, detail: action });
	}
}

export default reducer;
