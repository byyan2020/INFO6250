import { MESSAGES } from "./constants";

const state = {
	isLoggedIn: false,
  isLoginPending: false,
  isChatPending: false,
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
  state.isLoginPending = false;
	state.username = username;
	state.error = "";
}

export function logout() {
	state.isLoggedIn = false;
  state.isLoginPending = false;

	state.username = "";
	state.error = "";
}

export function waitOnChat() {
  state.users = {};
  state.messages = [];
  state.isChatPending = true
  state.error = '';
}

export function setLoginUsers(data) {
  state.isChatPending = false
	state.users = data;
  state.error = "";
}

export function setMessages(data) {
  state.isChatPending = false
	state.messages = data;
  state.error = "";
}

export function setError(error) {
  if(!error) {
    state.error = '';
    return;
  }
  state.error = MESSAGES[error] || MESSAGES.default;
  state.isLoginPending = false;
  state.isChatPending = false
}

export default state;
