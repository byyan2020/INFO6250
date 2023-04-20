const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3000;

const sessions = require("./sessions");
const users = require("./users");
const data = require("./data")

app.use(cookieParser());
app.use(express.static("./build"));
app.use(express.json());

// Sessions
app.get("/api/session", (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : "";
	if (!sid || !users.isValid(username)) {
		res.status(401).json({ error: "auth-missing" });
		return;
	}
	res.json({ username });
});

app.post("/api/session", (req, res) => {
	const { username } = req.body;

	if (!users.isValid(username)) {
		res.status(400).json({ error: "required-username" });
		return;
	}

	if (username === "dog") {
		res.status(403).json({ error: "auth-insufficient" });
		return;
	}

	const sid = sessions.addSession(username);

  const existingUserData = users.getUserData(username);

  if(!existingUserData) {
    users.addUserData(username, data.makeData());
  }

	res.cookie("sid", sid);
	res.json({ username });
});

app.delete("/api/session", (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : "";

	if (sid) {
		res.clearCookie("sid");
	}

	if (username) {
		sessions.deleteSession(sid);
	}

	res.json({ username });
});

// Timer
app.get('/api/timer', (req, res) => {
  const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : "";
	if (!sid || !users.isValid(username)) {
		res.status(401).json({ error: "auth-missing" });
		return;
	}

  res.json(users.getUserData(username).getTimer());
});

app.put('/api/timer', (req, res) => {
  const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : "";
	if (!sid || !users.isValid(username)) {
		res.status(401).json({ error: "auth-missing" });
		return;
	}

  users.getUserData(username).setTimer(req.body.timer, req.body.isTimerRunning, req.body.isTimerPaused, req.body.isWorkFinished)
  console.log(users.getUserData(username).getTimer())
  res.json(users.getUserData(username).getTimer())
})

// Alarm
app.get('/api/alarm', (req, res) => {
  const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : "";
	if (!sid || !users.isValid(username)) {
		res.status(401).json({ error: "auth-missing" });
		return;
	}

  res.json(users.getUserData(username).getAlarm());
})

app.put('/api/alarm', (req, res) => {
  const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : "";
	if (!sid || !users.isValid(username)) {
		res.status(401).json({ error: "auth-missing" });
		return;
	}
  users.getUserData(username).setAlarm(req.body.alarm, req.body.isAlarmOn)
  console.log(users.getUserData(username).getAlarm())
  res.json(users.getUserData(username).getAlarm())
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
