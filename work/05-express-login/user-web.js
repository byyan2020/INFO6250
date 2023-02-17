const userWeb = {
	homePage: function(username, storedWord) {
		return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <title>Document</title>
            <link rel="stylesheet" href="style.css">
        </head>
        <body>
            <div id="user-app">
            ${
                username 
                ? userWeb.getDataForm(username, storedWord)
                : userWeb.getLoginForm()
            }
            </div>
        </body>
        </html>
        `;
	},

    errorPage: function () {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <title>Document</title>
                <link rel="stylesheet" href="style.css">
            </head>
            <body>
                <div id="user-app">
                    <p>Invalid Username</p>
                    <a href="/">Go back to login page</a>
                </div>
            </body>
            </html>
        `
    },

	getLoginForm: function () {
		return `
        <div class="login">
            <form action="/login" method="POST">
                <label class="form-label">
                    <span>Username:</span>
                    <input class="form-input" name="username"/>
                </label>
                <button type="submit" class="form-btn">Submit</button>
            </form>
        </div>`;
	},
    

    getDataForm: function (username, storedWord) {
        return `
        <div class="logout">
            <form action="/logout" method="POST">
                <button type="submit" class="logout-btn">Logout</button>
            </form>
        </div>

        ${storedWord 
            ? `<p class="store-info">Stored word of ${username}: ${storedWord}</p>` 
            : `<p class="store-info">You do not have a stored word yet.</p>`}
        
        <div class="store">
        <form action="/store" method="POST">
            <label>
                <span>Update your stored word: </span>
                <input name="storedWord"/>
            </label>
            <button class="form-btn" type="submit">Submit</button>
        </form>
        </div>
        `
    }

    
};


module.exports = userWeb;