function makeData() {
	const data = {};
	const dataDetails = {
    // record state
		record: 1,

    // timer state
		timer: 9,
		isTimerRunning: false,
		isTimerPaused: false,
		isWorkFinished: false,

    // alarm state
		alarm: "23:18",
    isAlarmOn: false
	};

	data.getTimer = function getTimer() {
		return {
			timer: dataDetails.timer,
			isTimerRunning: dataDetails.isTimerRunning,
			isTimerPaused: dataDetails.isTimerPaused,
      isWorkFinished: dataDetails.isWorkFinished
		};
	};

	data.setTimer = function setTimer(timer, isTimerRunning, isTimerPaused, isWorkFinished) {
		dataDetails.timer = timer;
		dataDetails.isTimerRunning = isTimerRunning;
		dataDetails.isTimerPaused = isTimerPaused;
    dataDetails.isWorkFinished = isWorkFinished
		return dataDetails.timer;
	};

  data.getAlarm = function getAlarm() {
    return {
      alarm: dataDetails.alarm,
      isAlarmOn: dataDetails.isAlarmOn
    }
  }

  data.setAlarm = function setAlarm(alarm, isAlarmOn) {
    dataDetails.alarm = alarm
    dataDetails.isAlarmOn = isAlarmOn
    return dataDetails.alarm
  }

	return data;
}

module.exports = {
	makeData,
};
