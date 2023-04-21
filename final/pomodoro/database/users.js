const users = {};
const uuid = require('uuid').v4;

function isValid(username) {
	let isValid = true;
	isValid = !!username && username.trim();
	isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
	return isValid;
}

function getUserId(username) {
	return users[username];
}

function createUser(username) {
	users[username] = uuid();
  return users[username]
}

module.exports = {
	isValid,
	getUserId,
	createUser,
};
