function render({ state, appEl }) {
	const html = `
    ${getErrorHtml(state)}
    ${getLoginHtml(state)}
    ${getLogoutHtml(state)}
    ${getWordHtml(state)}
    `;
	appEl.innerHTML = html;
}

function getLoginHtml(state) {
	if (state.isLoggedIn) {
		return "";
	}
	return `
    <div class="login">
        <form class="login-form" action="#/login">
            <label class="form-label">
                <span>Username:</span>
                <input class="login-username" name="username"/>
            </label>
            <button type="submit" class="form-btn">Submit</button>
        </form>
    </div>
    `;
}

function getLogoutHtml(state) {
	if (!state.isLoggedIn) {
		return "";
	}
	return `
    <div class="logout">
        <form class="logout-form" action="#/logout">
            <button type="submit" class="logout-btn">Logout</button>
        </form>
    </div>
    `;
}

function getWordHtml(state) {
    if (!state.isLoggedIn) {
		return "";
	}
	return `
    <div class="word">
        <p>Username: ${state.username}</p>
        <p>Stored Word: ${state.word}</p>
        <form class="word-form" action="#/store">
            <label>
                <span>Update your stored word: </span>
                <input class="word-input" name="storedWord"/>
            </label>
            <button class="form-btn" type="submit">Submit</button>
        </form>
    </div>
    `
}

function getErrorHtml(state) {
    return `
    <div class="error">${state.error}</div>
`;
}

export default render;
