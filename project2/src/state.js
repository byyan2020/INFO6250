import { MESSAGES } from "./constants";

const state = {
	isLoggedIn: false,
  isLoginPending: true,
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

export function waitOnLogin() {
  state.isLoggedIn = false;
  state.isLoginPending = true;
  state.username = '';
  state.users = {};
  state.messages = [];
  state.error = '';
}

export function login(username) {
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
  state.error = "";
}

export function setMessages(data) {
	state.messages = data;
  state.error = "";
}

export function setError(error) {
  if(!error) {
    state.error = '';
    return;
  }
  state.error = MESSAGES[error] || MESSAGES.default;
}

export default state;
