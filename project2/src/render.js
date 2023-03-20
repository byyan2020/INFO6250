export function renderApp({ state, appEl}) {
	const html = `
    ${getErrorHtml(state)}
    <div class="login-info">
    ${getLoginHtml(state)}
    ${getLogoutHtml(state)}
    </div>
    ${getOutgoingHtml(state)}
    ${getLoadingHtml(state)}
    `;
	appEl.innerHTML = html;
}

export function renderChat({ state, chatEl }) {
	const html = `
    ${getUserList(state)}
    ${getMessageList(state)}
    `;
	chatEl.innerHTML = html;
}

function getErrorHtml( state ) {
  if (!state.error) {
		return "";
	}
  return `
      <div class="error">${state.error}</div>
  `;
}

function getLoadingHtml( state ) {
  if (state.isChatPending) {
    return `
    <div class="waiting">Loading Chat...</div>
  `
  }
  return ``
}

function getLoginHtml(state) {
  if(state.isLoginPending) {
    return `
      <div class="waiting">Loading user...</div>
    `
  }
	if (state.isLoggedIn) {
		return `<div class="login-user">${state.username}</div>`;
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

function getOutgoingHtml(state) {
	if (!state.isLoggedIn) {
		return "";
	}
	return `
    <div class="outgoing">
        <form class="chat-form" action="/chat" method="POST">
            <input class="message" name="message" value="" placeholder="Enter message to send"/>
            <button type="submit">Send</button>
        </form>
    </div>
    `;
}

function getMessageList(state) {
	if (!state.isLoggedIn) {
		return "";
	}
  if (state.isLoginPending) {
    return `
    <div class="waiting">Loading Messages...</div>
  `
  }
	const { messages } = state;
	if (!messages) {
		return "";
	}
	return (
		`<ol class="messages">
    <h1>Messages</h2>
    ` +
		messages
			.map(
				(message) => `
        <li>
          <div class="message">
            <div class="sender-info">
                <img class="avatar" alt="avatar of ${message.sender}" src="http://placekitten.com/150/150"/>
                <span class="username">${message.sender}</span>
            </div>
            <p class="message-text">${message.text}</p>
          </div>
        </li>
      `
			)
			.join("") +
		`</ol>`
	);
}

function getUserList(state) {
	if (!state.isLoggedIn) {
		return "";
	}
	return (
		`
    <ul class="users">
    <h1>Current Login Users</h2>
    ` +
		Object.values(state.users)
			.map(
				(user) => `
            <li>
                <div class="user">
                  <img class="avatar" alt="avatar of ${user}" src="http://placekitten.com/150/150"/>
                  <span class="username">${user}</span>
                </div>
            </li>
            `
			)
			.join("") +
		`</ul>`
	);
}
