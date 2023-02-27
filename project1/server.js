// Express setting
const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Cookie
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// UUid
const uuidv4 = require("uuid").v4;

// Module imports
const homeWeb = require("./home-web");
const sessionModel = require("./session-model");
const gameModel = require("./game-model");

// Home page
// GET "/"
app.get("/", (req, res) => {
	const sid = req.cookies.sid;
	// No session id
	if (!sid) {
		res.send(homeWeb.loginPage());

	// Session id invalid
	} else if (!sessionModel.isSidValid(sid)) {
		res.clearCookie("sid");
		const errorMessage = "Invalid session id";
		res.sendStatus(401).send(homeWeb.loginPage(errorMessage));

	// Session valid, go to home page
	} else {
		const username = sessionModel.getUsername(sid);
		res.send(homeWeb.homePage(username, guessGame[username]));
	}
});


// POST "/login"
app.post("/login", (req, res) => {
	// Get user name from login form
	const username = req.body.username.trim();

	// Validate username
	const pattern = /^[a-zA-Z0-9]+$/;
	if (!username || username === "dog" || !pattern.test(username)) {
		const errorMessage = "Username is not valid";
		res.status(401).send(homeWeb.loginPage(errorMessage));
		return;
	}

	// Generate session id
	const sid = uuidv4();
	// Store session id and username to sessionModel
	sessionModel.setSession(sid, username);

	if (!gameModel.isPlayer(username)) {
		gameModel.startNewGame(username);
	}

	// Set cookie and redirect
	res.cookie("sid", sid);
	res.redirect("/");
});


// POST "/logout"
app.post("/logout", (req, res) => {
	const sid = req.cookies.sid;
	sessionModel.deleteSession(sid);
	res.clearCookie("sid");
	res.redirect("/");
});


// Starting a New Game
// POST "/new-game"
app.post("/new-game", (req, res) => {
	// Check for valid session
	const sid = req.cookies.sid;
	if (!sid || !sessionModel.isSidValid(sid)) {
		res.clearCookie("sid");
		const errorMessage = "Session id is not valid";
		res.status(401).send(homeWeb.loginPage(errorMessage));
		return;
	}

	// Get username
	const username = sessionModel.getUsername(sid);

	// Update states
	gameModel.startNewGame(username);

	res.redirect("/");
});


// POST "/guess"
// Making a Guess
app.post("/guess", (req, res) => {
	// Check for valid session
	const sid = req.cookies.sid;
	if (!sid || !sessionModel.isSidValid(sid)) {
		res.clearCookie("sid");
		const errorMessage = "Session id is not valid";
		res.status(401).send(homeWeb.loginPage(errorMessage));
		return;
	}

    // Get username
	const username = sessionModel.getUsername(sid);

	// Get guess from request body
	const guess = req.body.guess;

	if (gameModel.isGuessValid(username, guess)) {
		gameModel.makeGuess(username, guess);
	}

	res.redirect("/");
});


app.listen(PORT, () => {
	console.log(`listen on http://localhost:${PORT}`);
});
