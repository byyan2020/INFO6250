const homeWeb = {
	loginPage: function (errorMessage) {
		return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="style.css">
            <title>Word Guessing</title>
        </head>
        <body>
            <div class="container">
                <h1>Guess Game</h1>
                <div class="login">
                ${errorMessage ? `<p class="alert">${errorMessage}</p>` : `<span></span>`} 
                    <form action="/login" method="POST">
                        <lable class="form-lable">
                            <span>Username: </span>
                            <input class="form-input" name="username">
                        </lable>
                        <button type="submit" class="form-btn">Submit</button>
                    </form>
                </div>
            </div>
        </body>
        </html>
        
        `;
	},

	homePage: function (username, gameData) {
		let wordsPoolEl = "";
		gameData.wordsPool.forEach((item) => {
			wordsPoolEl += `<li>${item}</li>`;
		});

        let previousGuessEl = ""
        gameData.previousGuess.forEach(item => {
            previousGuessEl += `
            <li>
            <p>Guess Word: ${item.guess}</p>
            <p>Match Count: ${item.matchCount}</p>
            </li>
            `
        })

        const previousGuessLength = gameData.previousGuess.length 
        const recentGuess = gameData.previousGuess[previousGuessLength - 1]

		return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="style.css">
            <title>Document</title>
        </head>
        <body>
            <div class="container">
                <h1>Guess Game</h1>
                <h2>Username</h2>
                <p>${username}</p>

                <div class="valid-word">
                    <h2>Valid Words</h2>
                    <ul>${wordsPoolEl}</ul>
                </div>

                <div class="previous-guess">
                    <h2>Previous Guess</h2>
                    <ul>${previousGuessEl}</ul>
                </div>

                <div class="guess-info">
                    <h2>Guess Count</h2>
                    <p>${gameData.guessCount}</p>

                    ${recentGuess ? `
                    <h2>Most Recent Guess</h2>
                    <p>Guess Word: ${recentGuess.guess}</p>
                    <p>Match Count: ${recentGuess.matchCount}</p>
                    ` : ""}
                    ${gameData.recentGuessValid ? `` : `<p class="alert">Your input is not a valid guess</p>`}
                </div>

                ${gameData.guessCorrect ? `<p class="alert">You've Won!</p>` : homeWeb.getGuessForm()}

                <div class="button-group">
                    ${homeWeb.getNewGameForm()}
                    ${homeWeb.getLogoutForm()}
                </div>
            </div>
        </body>
        </html>
        `;
	},

    getNewGameForm: function () {
        return `
        <div class="new-game">
            <form action="/new-game" method="POST">
                <button type="submit" class="form-btn">Start a new game</button>
            </form>
        </div>
        `
    },

	getLogoutForm: function () {
		return `
        <div class="logout">
            <form action="/logout" method="POST">
                <button type="submit" class="form-btn">Logout</button>
            </form>
        </div>`;
	},

	getGuessForm: function () {
		return `
        <div class="guess">
            <h2>Make a Guess</h2>
            <form action="/guess" class="guess-form" method="POST">
                <lable class="form-lable">
                <span>Guess Input: </span>
                <input class="form-input" name="guess">
                </lable>
                <button type="submit" class="form-btn">Submit</button>
            </form>
        </div>
        `;
	},
};

module.exports = homeWeb;
