const chatWeb = {
	chatPage: function (chat) {
		return `
      <!doctype html>
      <html>
        <head>
          <title>Chat</title>
          <link rel="stylesheet" href="style.css">
        </head>
        <body>
          <div id="chat-app">
            ${chatWeb.getUserList(chat)}
            ${chatWeb.getMessageList(chat)}
            ${chatWeb.getOutgoing(chat)}
          </div>
        </body>
      </html>
  `;
	},

	getMessageList: function (chat) {
		const { messages } = chat;
		return (
			`<ol class="messages">` +
			messages
				.map(
					(message) => `
            <li>
              <div class="message">
                <div class="sender-info">
                    <img class="avatar" alt="avatar of ${message.sender}" src="images/avatar-${message.sender}.jpg"/>
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
	},

	getUserList: function (chat) {
		return (
			`<ul class="users">` +
			Object.values(chat.users)
				.map(
					(user) => `
                <li>
                    <div class="user">
                    <span class="username">${user}</span>
                    </div>
                </li>
                `
				)
				.join("") +
			`</ul>`
		);
	},

	getOutgoing: function () {
		return `
        <div class="outgoing">
            <form action="/chat" method="POST">
                <input class="to-send" name="text" value="" placeholder="Enter message to send"/>
                <input type="hidden" class="to-send" name="username" value="Bao" placeholder="Enter message to send"/>
                <button type="submit">Send</button>
            </form>
        </div>
        `;
	},
};

module.exports = chatWeb;
