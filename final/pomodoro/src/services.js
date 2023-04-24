// Session
export function fetchSession() {
	return fetch("/api/session", {
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

export function fetchLogout() {
	return fetch("/api/session", {
		method: "DELETE",
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

export function fetchLogin(username) {
	return fetch("/api/session", {
		method: "POST",
		headers: new Headers({
			"content-type": "application/json",
		}),
		body: JSON.stringify({ username }),
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

// Timer
export function fetchTimer() {
	return fetch("/api/timer", {
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

export function fetchPutTimer(timerStatus) {
	return fetch("/api/timer", {
		method: "PUT",
		headers: new Headers({
			"content-type": "application/json",
		}),
		body: JSON.stringify({
			timerStatus,
		}),
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

export function fetchPutTimerDuration(workDuration, restDuration) {
	return fetch("/api/timer/duration", {
		method: "PUT",
		headers: new Headers({
			"content-type": "application/json",
		}),
		body: JSON.stringify({
			workDuration: workDuration,
			restDuration: restDuration,
		}),
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

// Alarm
export function fetchAlarm() {
	return fetch("/api/alarm", {
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

export function fetchPutAlarm(alarmTime) {
	return fetch("/api/alarm", {
		method: "PUT",
		headers: new Headers({
			"content-type": "application/json",
		}),
		body: JSON.stringify({
			alarmTime: alarmTime,
		}),
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

export function fetchDeleteAlarm() {
	return fetch("/api/alarm", {
		method: "DELETE",
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

// Record
export function fetchRecord() {
	return fetch("/api/record", {
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

export function fetchPutRecord(count) {
	return fetch("/api/record", {
		method: "PUT",
		headers: new Headers({
			"content-type": "application/json",
		}),
		body: JSON.stringify({
			count: count,
		}),
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
