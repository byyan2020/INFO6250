import "./App.css";
import Game from "./Game";
import Login from "./Login";
import { useState } from "react";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	return (
		<div className="app">
      <header><h1>Guess Game</h1></header>
      <main>
			<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
			{isLoggedIn && <Game />}
      </main>
      <footer>some privacy code</footer>
		</div>
	);
}

export default App;
