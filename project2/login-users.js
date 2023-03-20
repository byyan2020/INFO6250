let loginUsers = {
	// 'Amit': 'Amit',
	// 'Bob': 'Bob',
};

function addLoginUsers(username) {
	loginUsers[username] = username;
  console.log({loginUsers})
}

function getLoginUsers() {
	return loginUsers;
}

function deleteLoginUsers(username) {
	delete loginUsers[username];
  console.log({loginUsers})
}

module.exports = {
	getLoginUsers,
	addLoginUsers,
	deleteLoginUsers,
};
