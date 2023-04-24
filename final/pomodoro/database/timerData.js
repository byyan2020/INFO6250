const uuid = require("uuid").v4;

const userid = uuid();
const timer = {
	// Example data
	[userid]: {
		secondsLeft: 9,
		startTime: 1682111395126,
		isTimerStart: false,
		isTimerPaused: false,
		isOnWorkSession: false,
		workDuration: 25 * 60,
		restDuration: 5 * 60,
	},
};

function cal_seconds_left(userId) {
	const currentTime = new Date().getTime();
	const secondsPassed = Math.floor((currentTime - timer[userId].startTime) / 1000);
	let secondsLeft = timer[userId].secondsLeft - secondsPassed;
	if (secondsLeft <= 0) {
		secondsLeft = 0;
		timer[userId].isTimerPaused = true;
	}
	return secondsLeft;
}

function setDuration(userId, workDuration, restDuration) {
	timer[userId].workDuration = workDuration * 60;
	timer[userId].restDuration = restDuration * 60;
  timer[userId].secondsLeft = workDuration * 60
	return { workDuration: workDuration, restDuration: restDuration };
}

function createTimer(userId) {
	timer[userId] = {
		secondsLeft: 25 * 60,
		startTime: 0,
		isTimerStart: false,
		isTimerPaused: false,
		isOnWorkSession: false,
		workDuration: 25 * 60,
		restDuration: 5 * 60,
	};
	console.log("create: ", timer[userId]);
	return timer[userId];
}

function resetTimer(userId) {
	timer[userId] = {
    ...timer[userId],
		secondsLeft: timer[userId].workDuration,
		startTime: 0,
		isTimerStart: false,
		isTimerPaused: false,
		isOnWorkSession: false,
	};
	console.log("reset: ", timer[userId]);
	return timer[userId];
}

function startWork(userId) {
	const startTime = new Date().getTime();
	const secondsLeft = timer[userId].workDuration;
	timer[userId] = {
		...timer[userId],
		secondsLeft: secondsLeft,
		startTime: startTime,
		isTimerStart: true,
		isOnWorkSession: true,
	};
	console.log("work: ", timer[userId]);
	return timer[userId];
}

function startRest(userId) {
	const startTime = new Date().getTime();
	const secondsLeft = timer[userId].restDuration;
	timer[userId] = {
		...timer[userId],
		secondsLeft: secondsLeft,
		startTime: startTime,
		isTimerStart: true,
		isOnWorkSession: false,
	};
	console.log("rest: ", timer[userId]);
	return timer[userId];
}

function pauseTimer(userId) {
	const secondsLeft = cal_seconds_left(userId);
	timer[userId] = {
		...timer[userId],
		secondsLeft: secondsLeft,
		startTime: null,
		isTimerPaused: true,
	};
	console.log("pause: ", timer[userId]);
	return timer[userId];
}

function continueTimer(userId) {
	const startTime = new Date().getTime();
	timer[userId] = {
		...timer[userId],
		startTime: startTime,
		isTimerPaused: false,
	};
	console.log("continue: ", timer[userId]);
	return timer[userId];
}

function getTimer(userId) {
	if (!(userId in timer)) {
		return;
	}

	if (timer[userId].isTimerPaused || !timer[userId].isTimerStart) {
		console.log("get: ", timer[userId]);
		return timer[userId];
	}
	const secondsLeft = cal_seconds_left(userId);
	timer[userId] = {
		...timer[userId],
		secondsLeft: secondsLeft,
	};
	console.log("get_cal: ", timer[userId]);
	return timer[userId];
}

module.exports = {
  createTimer,
	resetTimer,
	getTimer,
	startWork,
	startRest,
	pauseTimer,
	continueTimer,
	setDuration,
};
