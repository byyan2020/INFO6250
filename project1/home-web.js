const homeWeb = {
	loginPage: function (errorMessage) {
		return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Word Guessing</title>
        </head>
        <body>
            <div class="login">
            ${errorMessage ? `<p class="error">${errorMessage}</p>` : `<span></span>`} 
                <form action="/login" method="POST">
                    <lable class="form-lable">
                        <span>Username: </span>
                        <input class="form-input" name="username">
                    </lable>
                    <button type="submit" class="form-btn">Submit</button>
                </form>
            </div>
        </body>
        </html>
        
        `;
	},

	homePage: function (username) {
		return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
        </head>
        <body>
            <p>${username}</p>
            ${homeWeb.getLogoutForm()}
        </body>
        </html>
        `;
	},

    getLogoutForm: function () {
        return `
        <div class="logout">
            <form action="/logout" method="POST">
                <button type="submit" class="logout-btn">Logout</button>
            </form>
        </div>`
    }
};

module.exports = homeWeb;
