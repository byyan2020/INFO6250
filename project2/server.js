const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.static("./public"));
app.use(express.json());

const users = require("./users");
const sessions = require("./sessions");
const loginUsers = require("./login-users")
const chat = require("./chat")

// Check for current login status
app.get("/api/v1/session", (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getUsername(sid) : "";
	if (!sid || !users.isValid(username)) {
		res.status(401).json({ error: "auth-missing" });
		return;
	}
	res.json({ username });
});

// Login
app.post("/api/v1/session", (req, res) => {
	const username = req.body.username.trim();

	if (!users.isValid(username)) {
		res.status(400).json({ error: "required-username" });
		return;
	}

	if (username === "dog") {
		res.status(403).json({ error: "auth-insufficient" });
		return;
	}

	const sid = sessions.setSession(username);
  users.registerUser(username)
  loginUsers.addLoginUsers(username)

	res.cookie("sid", sid);
	res.json(loginUsers.getLoginUsers());
});

// Logout
app.delete("/api/v1/session", (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getUsername(sid) : "";

	if (sid) {
		res.clearCookie("sid");
	}

	if (username) {
		sessions.deleteSession(sid);
    loginUsers.deleteLoginUsers(username);
	}

	res.json({ username });
});

// Get login users
app.get("/api/v1/users", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getUsername(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  res.json(loginUsers.getLoginUsers());
})

// Get messages
app.get("/api/v1/messages", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getUsername(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  res.json(chat.getMessages())
})

// Post a new message
app.post("/api/v1/messages", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getUsername(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const message = req.body.message.trim();
  if (!message) {
    res.status(400).json({ error: "required-message" })
    return
  }
  const record = {
    sender: username,
    text: message
  }

  chat.addMessage(record);

  res.json(chat.getMessages())
}) 


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
