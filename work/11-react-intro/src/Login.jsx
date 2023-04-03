import { useState } from "react";

function Login({ isLoggedIn, setIsLoggedIn }) {
	const [username, setUsername] = useState("");
	const [isNameValid, setIsNameValid] = useState(true);
	const [isAuthSuccess, setIsAuthSuccess] = useState(true);

	const loginHandler = (e) => {
		e.preventDefault();
		const isNameValid = getIsValid(username);
		const isAuthSuccess = getIsAuthSuccess(username);
		const isLoggedIn = isNameValid && isAuthSuccess;
		setIsNameValid(isNameValid);
		setIsAuthSuccess(isAuthSuccess);
		setIsLoggedIn(isLoggedIn);
	};

	const getIsValid = (username) => {
		if (!username || !username.match(/^[A-Za-z0-9_]+$/)) {
			return false;
		}
		return true;
	};

	const getIsAuthSuccess = (username) => {
		if (username === "dog") {
			return false;
		}
		return true;
	};

	const logoutHandler = () => {
		setIsLoggedIn(false);
		setUsername("");
	};

	return (
		<div className="login">
			<h2>User</h2>
			{isLoggedIn ? (
				<div className="logout">
					Hello {username}
					<button onClick={logoutHandler} className="logout-btn">Logout</button>
				</div>
			) : (
				<form className="login-form" onSubmit={loginHandler}>
					{!isNameValid && (
						<p className="alert">Username can only contain letter, number and "_"</p>
					)}
					{!isAuthSuccess && <p className="alert">Not a valid user</p>}
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
