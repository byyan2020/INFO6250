import React, { useEffect, useState } from "react";
import { fetchLogin, fetchLogout, fetchSession } from "./services";
import { SERVER } from "./constants";

function Login({ isLoggedIn, setIsLoggedIn, setError, setLoading }) {
	const [username, setUsername] = useState("");

	const loginHandler = (e) => {
		e.preventDefault();
		setLoading(true);
		fetchLogin(username)
			.then(() => {
				setIsLoggedIn(true);
				setError("");
				setLoading(false);
			})
			.catch((err) => {
				setError(err?.error || "ERROR");
				setLoading(false);
			});
	};

	const logoutHandler = () => {
		setIsLoggedIn(false);
		setUsername("");
		setError("");
    setLoading(false);
		fetchLogout().catch((err) => {
			setError(err?.error || "ERROR");
      setLoading(false);
		});
	};

	const checkForSession = () => {
		setLoading(true);
		fetchSession().then(({ username }) => {
			setUsername(username);
			setIsLoggedIn(true);
			setLoading(false);
			setError("");
		})
    .catch(err => {
      setLoading(false)
      if (err?.error === SERVER.AUTH_MISSING) {
        return 
      }
      setError(err?.error || "ERROR");
    });
	};

	useEffect(() => {
		checkForSession();
	}, []);

	return (
		<div className="login">
			<h2>User</h2>
			{isLoggedIn ? (
				<div className="logout">
					Hello {username}
					<button onClick={logoutHandler} className="logout-btn">
						Logout
					</button>
				</div>
			) : (
				<form className="login-form" onSubmit={loginHandler}>
					<label className="form-label">
						<span>Username:</span>
						<input
							className="login-username"
							value={username}
							onInput={(e) => setUsername(e.target.value)}
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
