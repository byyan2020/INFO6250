import {
	fetchLogin,
	fetchLoginUsers,
	fetchLogout,
	fetchMessages,
	fetchPostMessage,
} from "./services";
import { renderApp, renderChat } from "./render";
import { login, logout, setError, setLoginUsers, setMessages } from "./state";

export function addLoginListener({ state, appEl, chatEl }) {
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
				renderApp({ state, appEl });
				renderChat({ state, chatEl });
				return fetchMessages();
			})
			.catch((err) => {
        return Promise.reject(err);
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
	});
}

export function addLogoutListener({ state, appEl, chatEl }) {
	appEl.addEventListener("submit", (e) => {
		e.preventDefault();
		if (!e.target.classList.contains("logout-form")) {
			return;
		}

		logout();
		renderApp({ state, appEl });
		renderChat({ state, chatEl });
		fetchLogout().catch((err) => {
			setError(err?.error || "ERROR");
			renderApp({ state, appEl });
		});
	});
}

export function addPostMessageListener({ state, appEl, chatEl }) {
	appEl.addEventListener("submit", (e) => {
		if (!e.target.classList.contains("chat-form")) {
			return;
		}
		let message = appEl.querySelector(".message").value;
		fetchPostMessage(message)
			.then((messages) => {
				setMessages(messages);
        renderApp({ state, appEl });
				renderChat({ state, chatEl });
			})
			.catch((err) => {
				console.log(err);  
				setError(err?.error || "ERROR"); // Ensure that the error ends up truthy
				renderApp({ state, appEl });
			});
	});
}
