import { renderChat, renderApp } from "./render";
import state, { login, logout, setLoginUsers, setMessages, setError } from "./state";
import { addLoginListener, addLogoutListener, addPostMessageListener } from "./listeners";
import { SERVER, CLIENT } from "./constants";
import { fetchSession, fetchLoginUsers, fetchMessages } from "./services";

const appEl = document.querySelector("#app");
const chatEl = document.querySelector("#chat")
renderApp({ state, appEl });
renderChat({ state, chatEl });
addLoginListener({ state, appEl, chatEl });
addLogoutListener({ state, appEl, chatEl });
addPostMessageListener({ state, appEl, chatEl });
checkForSession();
pollData();

// Polling
function pollData() {
	refreshData();
	setTimeout(pollData, 5000);
}

function refreshData() {
	if (!state.isLoggedIn) {
		return;
	}
	fetchLoginUsers()
		.then((users) => {
			setLoginUsers(users);
			renderChat({ state, chatEl });
			return fetchMessages();
		})
    .catch((err) => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION })
      }
			setError(err?.error || "ERROR");
			renderApp({ state, appEl });
		})
		.then((messages) => {
			setMessages(messages);
			renderChat({ state, chatEl });
		})
		.catch((err) => {
			setError(err?.error || "ERROR");
			renderApp({ state, appEl });
		});
}

function checkForSession() {
	// Fetch current user
	fetchSession()
		.then((session) => {
			login(session.username);
			renderApp({ state, appEl });
			return fetchLoginUsers();
		})
		.catch((err) => {
			if (err?.error === SERVER.AUTH_MISSING) {
				return Promise.reject({ error: CLIENT.NO_SESSION });
			}
			return Promise.reject(err);
		})
		// Fetch login users
		.then((users) => {
			setLoginUsers(users);
			renderChat({ state, chatEl });
			return fetchMessages();
		})
		.catch((err) => {
			if (err?.error == CLIENT.NO_SESSION) {
				logout();
				renderApp({ state, appEl });
				return;
			}
			setError(err?.error || "ERROR");
			renderApp({ state, appEl });
		})
		// Fetch all messages
		.then((messages) => {
			setMessages(messages);
			renderChat({ state, chatEl });
		})
		.catch((err) => {
			setError(err?.error || "ERROR");
			renderApp({ state, appEl });
		});
}
