import "./App.css";
import Login from "./Login";
import Word from "./Word"
import Error  from "./Error";
import React, { useState } from "react";
import Loading from "./Loading";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

	return (
		<div className="app">
      <header><h1>Stored Word</h1></header>
      <main>
      <Error error={error}/>
      <Loading loading={loading}/>
			<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setError={setError} setLoading={setLoading}/>
      {isLoggedIn && <Word setError={setError} setLoading={setLoading}/>}
      </main>
      <footer>some privacy code</footer>
		</div>
	);
}

export default App;
