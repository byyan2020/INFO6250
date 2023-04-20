import { useState } from "react";
import "./App.css";
import Timer from "./Timer";
import Alarm from "./Alarm";
import Record from './Record';
import Error from './Error'
import Login from "./Login";
import { TIMER_TIME } from "./constants";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('')

  const [time, setTime] = useState(TIMER_TIME.WORK)
  const [isRunning, setIsRunning] = useState(false)
  const [count, setCount] = useState(0)

	return (
		<div className="App">
			<header>
				<h1>Pomodoro timer</h1>
			</header>
			<main>
        <Error error={error}/>
        <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setError={setError} />
        <Record count={count}/>
				<Timer time={time} setTime={setTime} isRunning={isRunning} setIsRunning={setIsRunning} count={count} setCount={setCount}/>
        <Alarm setTime={setTime} setIsRunning={setIsRunning}/>
			</main>
		</div>
	);
}

export default App;
