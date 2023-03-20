users = {
	// "Amit": "Amit",
	// "Bob": "Bob",
};

function isValid(username) {
	if (!username) {
		return false;
	}
	if (!username.match(/^[A-Za-z0-9_]+$/)) {
		return false;
	}
	return true;
}

function registerUser(username) {
	users[username] = username;
}

module.exports = {
	isValid,
	registerUser,
};
