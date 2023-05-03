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

function resetAlarm(userId) {
	alarm[userId] = {
		alarmTime: null,
		isAlarmOn: false,
	};
	return alarm[userId];
}

function getAlarm(userId) {
	if (!(userId in alarm)) {
		return;
	}
	return alarm[userId];
}

function setAlarm(userId, alarmTime) {
	alarm[userId] = {
		alarmTime: alarmTime,
		isAlarmOn: true,
	};
	return alarm[userId];
}

module.exports = {
	resetAlarm,
	getAlarm,
	setAlarm,
};
