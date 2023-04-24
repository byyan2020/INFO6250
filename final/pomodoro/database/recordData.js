const uuid = require("uuid").v4;

const userid1 = uuid();
const userid2 = uuid();

const record = {
	[userid1]: {
		count: 0,
	},
	[userid2]: {
		count: 3,
	},
};

function createRecord(userId) {
	record[userId] = {
		count: 0,
	};
	return record[userId];
}

function getRecord(userId) {
  if (!(userId in record)) {
		return;
	}
	return record[userId];
}

function setRecord(userId, count) {
	record[userId] = {
		count: count,
	};
	return record[userId];
}

module.exports = {
	createRecord,
	getRecord,
	setRecord,
};
