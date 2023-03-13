import { fetchLogin, fetchLogout, fetchPostWord, fetchWord } from "./services";
import render from "./render";
import { login, logout, setError, setWord } from "./state";
import { SERVER, CLIENT } from './constants';

export function addLoginListener({ state, appEl }) {
	appEl.addEventListener("submit", (e) => {
		e.preventDefault();
		if (!e.target.classList.contains("login-form")) {
			return;
		}

		const username = appEl.querySelector(".login-username").value;
		// Service call to login
		fetchLogin(username)
			.then(({username}) => {
				login(username);
				render({ state, appEl });
                return fetchWord();
			})
			.catch((err) => {
				setError(err?.error || "ERROR");
				render({ state, appEl });
			})
            // Get word from fetchWord service and render the page
            .then( response => {
                setWord(response.storedWord);
                render({ state, appEl });
            })
            // Catch fetchWord error
            .catch( err => {
                // Catch no session error
                if ( err?.error == CLIENT.NO_SESSION ) {
                    logout();
                    render({ state, appEl });
                    return
                }
                // Catch unpected error
                setError(err?.error || "ERROR");
                render({ state, appEl });
            })
            
	});
}

export function addLogoutListener({ state, appEl }) {
	appEl.addEventListener("submit", (e) => {
		e.preventDefault();
		if (!e.target.classList.contains("logout-form")) {
			return;
		}

		logout();
		render({ state, appEl });
		fetchLogout().catch((err) => {
			setError(err?.error || "ERROR");
			render({ state, appEl });
		});
	});
}

export function addWordListenser({ state, appEl }) {
    appEl.addEventListener("submit", (e) => {
		e.preventDefault();
		if (!e.target.classList.contains("word-form")) {
			return;
		}
		const word = appEl.querySelector(".word-input").value;
		// Service call to update word
		fetchPostWord(word)
			.then(({storedWord}) => {
				setWord(storedWord);
				render({ state, appEl });
			})
			.catch((err) => {
				setError(err?.error || "ERROR");
				render({ state, appEl });
			});
	});
}
