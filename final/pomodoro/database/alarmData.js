const uuid = require("uuid").v4;

const userid1 = uuid();
const userid2 = uuid();

const alarm = {
	[userid1]: {
		alarmTime: "23:18",
		isAlarmOn: false,
	},
	[userid2]: {
		alarmTime: "08:26",
		isAlarmOn: true,
	},
};

function createAlarm(userId) {
	alarm[userId] = {
		alarmTime: null,
		isAlarmOn: true,
	};
  return alarm[userId]
}

function getAlarm(userId) {
	return alarm[userId];
}

function setAlarm(userId, alarmStatus) {
	alarm[userId] = alarmStatus;
	return alarm[userId];
}

module.exports = {
  createAlarm,
	getAlarm,
	setAlarm,
};
