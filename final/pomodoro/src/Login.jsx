import React, { useEffect, useState, useContext } from "react";
import { fetchLogin, fetchLogout, fetchSession } from "./services";
import { CLIENT, ACTIONS } from "./constants";
import AppContext from "./AppContext";

function Login() {
  const {state, dispatch} = useContext(AppContext)

  const [tempUsername, setTempUsername] = useState('')

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
		fetchLogout() 
			.catch((err) => {
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
				if (err?.error === CLIENT.NO_SESSION) {
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
