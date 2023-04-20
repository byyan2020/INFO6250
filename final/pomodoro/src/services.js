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

export function fetchPutTimer(timer, isTimerRunning, isTimerPaused, isWorkFinished) {
	return fetch("/api/timer", {
		method: "PUT",
		headers: new Headers({
			"content-type": "application/json",
		}),
		body: JSON.stringify({
			timer: timer,
			isTimerRunning: isTimerRunning,
			isTimerPaused: isTimerPaused,
      isWorkFinished: isWorkFinished
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

export function fetchPutAlarm(alarm, isAlarmOn) {
	return fetch("/api/alarm", {
		method: "PUT",
		headers: new Headers({
			"content-type": "application/json",
		}),
		body: JSON.stringify({
			alarm: alarm,
			isAlarmOn: isAlarmOn,
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
