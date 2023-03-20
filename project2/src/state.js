import { MESSAGES } from "./constants";

const state = {
	isLoggedIn: false,
	username: "",
	error: "",
	users: {
		// "Amit": "Amit",
		// "Bob": "Bob",
	},
	messages: [
		// { sender: "Amit", text: "You up?" },
		// { sender: "Bao", text: "Good" },
	],
};

export function login(username) {
  console.log("login called")
	state.isLoggedIn = true;
	state.username = username;
	state.error = "";
}

export function logout() {
	state.isLoggedIn = false;
	state.username = "";
	state.error = "";
}

export function setLoginUsers(data) {
	state.users = data;
}

export function setMessages(data) {
	state.messages = data;
}

export function setError(error) {
	state.error = MESSAGES;
}

export default state;
