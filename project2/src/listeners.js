import {
	fetchLogin,
	fetchLoginUsers,
	fetchLogout,
	fetchMessages,
	fetchPostMessage,
} from "./services";
import render from "./render";
import { login, logout, setError, setLoginUsers, setMessages } from "./state";

export function addLoginListener({ state, appEl }) {
	appEl.addEventListener("submit", (e) => {
		e.preventDefault();
		if (!e.target.classList.contains("login-form")) {
			return;
		}

		const username = appEl.querySelector(".login-username").value;
		// Service call to login
		fetchLogin(username)
			.then((users) => {
				login(username);
				setLoginUsers(users);
				render({ state, appEl });
        return fetchMessages()
			})
			.catch((err) => {
				setError(err?.error || "ERROR");
				render({ state, appEl });
			})
			// Fetch all messages
			.then((messages) => {
				login(username);
				setMessages(messages);
				console.log("After fetch messages: ", { state });
				render({ state, appEl });
			})
			.catch((err) => {
				setError(err?.error || "ERROR");
				render({ state, appEl });
			});
	});
}

export function addLogoutListener({ state, appEl }) {
	appEl.addEventListener("submit", (e) => {
		e.preventDefault();
		if (!e.target.classList.contains("logout-form")) {
			return;
		}

		logout();
		render({ state, appEl });
		fetchLogout().catch((err) => {
			setError(err?.error || "ERROR");
			render({ state, appEl });
		});
	});
}

export function addPostMessageListener({ state, appEl }) {
	appEl.addEventListener("submit", (e) => {
		if (!e.target.classList.contains("chat-form")) {
			return;
		}
		const message = appEl.querySelector(".message").value;
		fetchPostMessage(message)
			.then((messages) => {
				setMessages(messages);
				render({ state, appEl });
			})
			.catch((err) => {
				console.log(err);
				setError(err?.error || "ERROR"); // Ensure that the error ends up truthy
				render({ state, appEl });
			});
	});
}
