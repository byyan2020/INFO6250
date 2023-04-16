import { useEffect, useState } from "react";
import { fetchUpdateWord, fetchWord } from "./services";

function Word({setError, setLoading}) {
	const [word, setWord] = useState("");
	const [tempWord, setTempWord] = useState("");

	const submitHandler = (e) => {
		e.preventDefault();
    setLoading(true)
		fetchUpdateWord(tempWord)
			.then(({ word }) => {
        setWord(word);
        setLoading(false)
        setError('')
      })
			.catch((err) => {
				setError(err?.error || "ERROR");
        setLoading(false)
			});
		setTempWord("");
	};

	useEffect(() => {
    setLoading(false)
		fetchWord().then(({ word }) => {
			setWord(word);
      setLoading(false)
		}).catch(err => {
      setError(err?.error || 'ERROR')
      setLoading(false)
    });
	}, []);

	return (
		<div className="word">
			<h2>Stored word</h2>
			{!!word ? <p>Your stored word is: {word}</p> : <p>You do not have a stored word yet.</p>}
			<form className="word-form" onSubmit={submitHandler}>
				<lable className="form-lable">
					<span>Update stored word: </span>
					<input
						className="form-input"
						value={tempWord}
						onInput={(e) => {
							setTempWord(e.target.value);
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

export default Word;
