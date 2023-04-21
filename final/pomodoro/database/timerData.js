const uuid = require("uuid").v4;

const userid1 = uuid();
const userid2 = uuid();
const timer = {
	[userid1]: {
		seconds: 9,
		isTimerStart: false,
		isTimerPaused: false,
		isOnWorkSession: false,
	},
	[userid2]: {
		seconds: 7,
		isTimerStart: false,
		isTimerPaused: false,
		isOnWorkSession: false,
	},
};

function createTimer(userId) {
  timer[userId] = {
    seconds: 7,
		isTimerStart: false,
		isTimerPaused: false,
		isOnWorkSession: false,
  }
  return timer[userId]
}

function getTimer(userId) {
	return timer[userId];
}

function setTimer(userId, timerStatus) {
	timer[userId] = timerStatus;
	return timer[userId];
}

module.exports = {
  createTimer,
	getTimer,
	setTimer,
};
