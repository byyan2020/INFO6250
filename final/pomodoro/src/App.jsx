import React, { useReducer, useState } from "react";
import "./App.css";
import Timer from "./Timer";
import Alarm from "./Alarm";
import Record from "./Record";
import Error from "./Error";
import Login from "./Login";
import { ACTIONS, TIMER_TIME, CLIENT } from "./constants";
import reducer, { initialState } from "./reducer";
import { fetchSession, fetchLogin, fetchLogout } from "./services";
import AppContext from "./AppContext";

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	const [error, setError] = useState("");
	const [time, setTime] = useState(TIMER_TIME.WORK);
	const [isRunning, setIsRunning] = useState(false);
	const [count, setCount] = useState(0);

	return (
		<div className="App">
			<header>
				<h1>Pomodoro timer</h1>
			</header>
			<main>
				<AppContext.Provider value={{ state, dispatch }}>
					<Error />
					<Login/>
					{state.isLoggedIn && <Record/>}
					{state.isLoggedIn && <Timer/>}
					{state.isLoggedIn && <Alarm/>}
				</AppContext.Provider>
			</main>
		</div>
	);
}

export default App;
