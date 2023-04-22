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
	},
};

function resetTimer(userId) {
  timer[userId] = {
    secondsLeft: 8,
    startTime: 0,
		isTimerStart: false,
		isTimerPaused: false,
		isOnWorkSession: false,
    workDuration: 8,
    restDuration: 5
  }
  console.log('reset: ', timer[userId])
  return timer[userId]
}

function startWork(userId) {
  const startTime = new Date().getTime()
  const secondsLeft = timer[userId].workDuration
  timer[userId] = {
    ...timer[userId],
    secondsLeft: secondsLeft,
    startTime: startTime,
		isTimerStart: true,
    isOnWorkSession:true
  }
  console.log('work: ', timer[userId])
  return timer[userId]
}

function startRest(userId) {
  const startTime = new Date().getTime()
  const secondsLeft = timer[userId].restDuration
  timer[userId] = {
    ...timer[userId],
    secondsLeft: secondsLeft,
    startTime: startTime,
		isTimerStart: true,
    isOnWorkSession:false
  }
  console.log('rest: ', timer[userId])
  return timer[userId]
}

function pauseTimer(userId) {
  const currentTime = new Date().getTime()
  console.log(new Date(currentTime), new Date(timer[userId].startTime))
  const secondsPassed = Math.floor((currentTime - timer[userId].startTime) / 1000)
  console.log(timer[userId].secondsLeft)
  const secondsLeft = timer[userId].secondsLeft - secondsPassed
  timer[userId] = {
    ...timer[userId],
    secondsLeft: secondsLeft,
    startTime: null,
		isTimerPaused: true,
  }
  console.log('pause: ', timer[userId])
  return timer[userId]
}

function continueTimer(userId) {
  const startTime = new Date().getTime()
  timer[userId] = {
    ...timer[userId],
    startTime: startTime,
		isTimerPaused: false,
  }
  console.log('continue: ',  timer[userId])
  return timer[userId]
}

function getTimer(userId) {
  if (timer[userId].isTimerPaused || (!timer[userId].isTimerStart)) {
    console.log('get: ', timer[userId])
    return timer[userId]
  }
  console.log('get_cal: ', timer[userId])
  const currentTime = new Date().getTime()
  const secondsPassed = Math.floor((currentTime - timer[userId].startTime) / 1000)
  const secondsLeft = timer[userId].secondsLeft - secondsPassed
  timer[userId] = {
    ...timer[userId],
    secondsLeft: secondsLeft
  }
	return timer[userId];
}

function setTimer(userId, timerStatus) {
	timer[userId] = timerStatus;
  console.log('set: ', timer[userId])
	return timer[userId];
}

module.exports = {
  resetTimer,
	getTimer,
	setTimer,
  startWork,
  startRest,
  pauseTimer,
  continueTimer,
};
