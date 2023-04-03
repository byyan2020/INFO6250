import { useState } from "react";
import compare from "./compare";

function Game() {
	const [guess, setGuess] = useState("");
	const [infor, setinfor] = useState("");

	const secret = "RECAT";

	const submitHandler = (e) => {
		e.preventDefault();
    setGuess('')
		if (guess.length !== 5) {
			setinfor(guess + " is not a valid word");
		} else {
			const commonCount = compare(guess, secret);
			if (guess.toLowerCase() !== secret.toLowerCase()) {
				setinfor(guess + " had " + commonCount + " letters in common");
			} else {
				setinfor(guess + " is the secret word!");
			}
		}
	};

  let hasError = false
  if (infor !== "") {
    hasError = true
  }

	return (
		<div className="game">
			<h2>Make a Guess</h2>
			<form className="guess-form" onSubmit={submitHandler}>
				{hasError && <p className="alert">{infor}</p>}
				<lable className="form-lable">
					<span>Please make a guess of a 5 letter word: </span>
					<input
						className="form-input"
						value={guess}
						onInput={(e) => {
							setGuess(e.target.value);
						}}
					/>
				</lable>
				<button type="submit" className="form-btn">
					Submit
				</button>
			</form>
		</div>
	);
}

export default Game;
