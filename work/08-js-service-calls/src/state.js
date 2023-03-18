import { MESSAGES } from "./constants";

const state = {
	word: "",
	isLoggedIn: false,
	username: "",
	error: "",
};

export function login(username) {
	state.isLoggedIn = true;
	state.username = username;
	state.error = "";
}

export function logout() {
	state.isLoggedIn = false;
	state.username = "";
	state.word = "";
	state.error = "";
}

export function setWord(word) {
    state.word = word;
    state.error = "";
}

export function setError(error) {
    state.error = MESSAGES[error] || MESSAGES.default;
}

export default state;
