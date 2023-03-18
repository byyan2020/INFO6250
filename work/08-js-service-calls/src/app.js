import state, {
    login,
    logout,
    setWord,
    setError
} from './state'
import { fetchSession, fetchLogin, fetchWord } from "./services";
import { SERVER, CLIENT } from './constants';
import render from "./render";
import { addLoginListener, addLogoutListener, addWordListenser } from './listener';

const appEl = document.querySelector('#app');
render({ state, appEl });
addLoginListener({ state, appEl });
addLogoutListener({ state, appEl });
addWordListenser({ state, appEl });
checkForSession();


function checkForSession() {
    fetchSession()
    // Session exists
    .then( session => {
        login(session.username);
        render({ state, appEl });
        return fetchWord();
    })
    // Catch fetchSession error
    .catch( err => {
        // Catch no session error
        if (err?.error === SERVICE.AUTH_MISSING ) {
            return Promise.reject({ error: CLIENT.NO_SESSION })
        }
        // Catch other session
        return Promise.reject(err);
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

}