import React, { useEffect, useState, useContext } from "react";
import { fetchLogin, fetchLogout, fetchPutTimer, fetchSession } from "./services";
import { SERVER, ACTIONS, TIMER_STATUS } from "./constants";
import AppContext from "./AppContext";

function Login() {
	const { state, dispatch } = useContext(AppContext);

	const [tempUsername, setTempUsername] = useState("");

	function handleLogin(e) {
		e.preventDefault();
		fetchLogin(tempUsername)
			.then(({ username }) => {
				dispatch({ type: ACTIONS.LOG_IN, username });
			})
			.catch((err) => {
				dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
			});
	}

	function handleLogout() {
		dispatch({ type: ACTIONS.LOG_OUT });
    // Reset timer when you log out
		fetchPutTimer(TIMER_STATUS.RESET)
			.then(({ timerState }) => {
				dispatch({ type: ACTIONS.TIMER_SET, timerState });
			})
			.catch((err) => {
				dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
			});
		fetchLogout().catch((err) => {
			dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
		});
	}

	function checkForSession() {
		fetchSession()
			.then(({ username }) => {
				dispatch({ type: ACTIONS.LOG_IN, username: username });
				console.log(username);
				return username;
			})
			.catch((err) => {
				if (err?.error === SERVER.AUTH_MISSING) {
					dispatch({ type: ACTIONS.LOG_OUT });
					return;
				}
				dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
			});
	}

	useEffect(() => {
		checkForSession();
	}, []);

	return (
		<div className="login">
			<h2>User</h2>
			{state.isLoggedIn ? (
				<div className="logout">
					Hello {state.username}
					<button onClick={handleLogout} className="logout-btn">
						Logout
					</button>
				</div>
			) : (
				<form className="login-form" onSubmit={handleLogin}>
					<label className="form-label">
						<span>Username:</span>
						<input
							className="login-username"
							value={tempUsername}
							onInput={(e) => setTempUsername(e.target.value)}
						/>
					</label>
					<button type="submit" className="form-btn">
						Submit
					</button>
				</form>
			)}
		</div>
	);
}

export default Login;
