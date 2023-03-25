export function fetchLogin(username) {
	return fetch("/api/v1/session", {
		method: "POST",
		headers: new Headers({
			"content-type": "application/json",
		}),
		body: JSON.stringify({ username }),
	})
		.catch(() => Promise.reject({ error: "network-error" }))
		.then((response) => {
			if (!response.ok) {
				return response.json().then((err) => Promise.reject(err));
			}
			return response.json();
		});
}

export function fetchLogout() {
	return fetch("/api/v1/session", {
		method: "DELETE",
	})
		.catch((err) => Promise.reject({ error: "network-error" }))
		.then((response) => {
			if (!response.ok) {
				return response.json().then((err) => Promise.reject(err));
			}
			return response.json();
		});
}

export function fetchSession() {
	return fetch("/api/v1/session", {
		method: "GET",
	})
		.catch(() => Promise.reject({ error: "networkError" }))
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
			return response
				.json()
				.catch((error) => Promise.reject({ error }))
				.then((err) => Promise.reject(err));
		});
}

export function fetchLoginUsers() {
	return fetch("/api/v1/users", {
		method: "GET",
	})
		.catch((err) => Promise.reject({ error: "network-error" }))
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
			return response
				.json()
				.catch((error) => Promise.reject({ error }))
				.then((err) => [Promise.reject(err)]);
		});
}

export function fetchMessages() {
	return fetch("/api/v1/messages", {
		method: "GET",
	})
		.catch((err) => Promise.reject({ error: "network-error" }))
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
			return response
				.json()
				.catch((error) => Promise.reject({ error }))
				.then((err) => [Promise.reject(err)]);
		});
}

export function fetchPostMessage(message) {
	return fetch("/api/v1/messages", {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({ message }),
	})
		.catch((err) => Promise.reject({ error: "network-error" }))
		.then((response) => {
			if (!response.ok) {
				return response.json().then((err) => Promise.reject(err));
			}
			return response.json();
		});
}
