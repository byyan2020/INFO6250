import React, { useReducer, useState } from "react";
import "./App.css";
import Timer from "./Timer";
import Alarm from "./Alarm";
import Record from "./Record";
import Error from "./Error";
import Login from "./Login";
import reducer, { initialState } from "./reducer";
import AppContext from "./AppContext";
import TimerDuration from "./TimerDuration";

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<div className="App">
			<header>
				<h1>Pomodoro timer</h1>
			</header>
			<main>
				<AppContext.Provider value={{ state, dispatch }}>
					{state.error && <Error/>}
					<Login />
					{state.isLoggedIn && <Record />}
					{state.isLoggedIn && <Timer />}
					{state.isLoggedIn && <TimerDuration />}
					{state.isLoggedIn && <Alarm />}
				</AppContext.Provider>
			</main>
		</div>
	);
}

export default App;
