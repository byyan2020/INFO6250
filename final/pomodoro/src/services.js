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

export function fetchTimerWork() {
	return fetch("/api/timer/work", {
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

export function fetchTimerRest() {
	return fetch("/api/timer/rest", {
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

export function fetchTimerPause() {
	return fetch("/api/timer/pause", {
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

export function fetchTimerContinue() {
	return fetch("/api/timer/continue", {
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

export function fetchTimerReset() {
	return fetch("/api/timer/reset", {
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

export function fetchPutAlarm(alarmTime, isAlarmOn) {
	return fetch("/api/alarm", {
		method: "PUT",
		headers: new Headers({
			"content-type": "application/json",
		}),
		body: JSON.stringify({
			alarmStatus: { alarmTime: alarmTime, isAlarmOn: isAlarmOn },
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
