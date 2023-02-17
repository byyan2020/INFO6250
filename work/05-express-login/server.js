const express = require("express");
const app = express();
const PORT = 3000;

const userWeb = require("./user-web");
const user = require("./user.js");

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const uuidv4 = require("uuid").v4;

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get("/", (req, res) => {
	const sid = req.cookies.sid;
	const username = user.getUserName(sid);
	const storedWord = user.getStoredword(username);

    res.send(userWeb.homePage(username, storedWord));
});


app.post("/login", (req, res) => {
	const username = req.body.username.trim();

	const pattern = /^[a-zA-Z0-9]+$/;
	if (username === "dog" || !username || !pattern.test(username)) {
		res.status(401).send(userWeb.errorPage());
		return;
	}

	const sid = uuidv4();
	user.setSession(sid, username);

	res.cookie("sid", sid);
	res.redirect("/");
});


app.post("/store", (req, res) => {
	const sid = req.cookies.sid;
	if ((!sid) || (!user.isSidValid(sid))) {
		res.clearCookie("sid");
		res.sendStatus(401);
		return;
	}

	const storedWord = req.body.storedWord.trim();
	const username = user.getUserName(sid)

    user.setStoredWord(username, storedWord)

    res.redirect("/");
});


app.post("/logout", (req, res) => {
	const sid = req.cookies.sid;
	if (sid) {
		user.deleteSession(sid)
	}
	res.redirect("/");
});

app.listen(PORT, () => {
	console.log(`listening on http://localhost:${PORT}`);
});
