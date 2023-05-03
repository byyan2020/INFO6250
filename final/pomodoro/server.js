const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3000;

const sessions = require("./database/sessions");
const users = require("./database/users");
const timerData = require("./database/timerData");
const alarmData = require("./database/alarmData");
const recordData = require("./database/recordData")

app.use(cookieParser());
app.use(express.static("./build"));
app.use(express.json());

const TIMER_STATUS = {
	PAUSE: "pause",
	CONTINUE: "continue",
	WORK: "work",
	REST: "rest",
	RESET: "reset",
};

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
	const userId = users.getUserId(username) ? users.getUserId(username) : users.createUser(username);

	// Create default timer, alarm, record state
	if (!timerData.getTimer(userId)) {
		timerData.createTimer(userId);
	}
  if (!alarmData.getAlarm(userId)) {
    alarmData.resetAlarm(userId);
  }
  if (!recordData.getRecord(userId)) {
    recordData.createRecord(userId);
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
app.get("/api/timer", (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : "";
	if (!sid || !users.isValid(username)) {
		res.status(401).json({ error: "auth-missing" });
		return;
	}

	const userId = users.getUserId(username);
	const timerState = timerData.getTimer(userId);
	res.json({ timerState });
});

app.put("/api/timer/duration", (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : "";
	if (!sid || !users.isValid(username)) {
		res.status(401).json({ error: "auth-missing" });
		return;
	}
	const userId = users.getUserId(username);

	const reqWorkDuration = req.body.workDuration;
	const reqRestDuration = req.body.restDuration;
	const durations = timerData.setDuration(userId, reqWorkDuration, reqRestDuration);
  timerData.resetTimer(userId)

	res.json(durations);
});

app.put("/api/timer", (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : "";
	if (!sid || !users.isValid(username)) {
		res.status(401).json({ error: "auth-missing" });
		return;
	}
	const userId = users.getUserId(username);
	const reqTimerStatus = req.body.timerStatus;

	let timerState;
	if (reqTimerStatus === TIMER_STATUS.RESET) {
		timerState = timerData.resetTimer(userId);
	} else if (reqTimerStatus === TIMER_STATUS.WORK) {
		timerState = timerData.startWork(userId);
	} else if (reqTimerStatus === TIMER_STATUS.REST) {
		timerState = timerData.startRest(userId);
	} else if (reqTimerStatus === TIMER_STATUS.PAUSE) {
		timerState = timerData.pauseTimer(userId);
	} else if (reqTimerStatus === TIMER_STATUS.CONTINUE) {
		timerState = timerData.continueTimer(userId);
	} else {
		res.status(400).json({ error: "unknown-timer-status" });
	}

	res.json({ timerState });
});

// Alarm
app.get("/api/alarm", (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : "";
	if (!sid || !users.isValid(username)) {
		res.status(401).json({ error: "auth-missing" });
		return;
	}

	const userId = users.getUserId(username);
	const alarmState = alarmData.getAlarm(userId);

	res.json({ alarmState });
});

app.put("/api/alarm", (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : "";
	if (!sid || !users.isValid(username)) {
		res.status(401).json({ error: "auth-missing" });
		return;
	}

	const userId = users.getUserId(username);
	const reqAlarmTime = req.body.alarmTime;
	const alarmState = alarmData.setAlarm(userId, reqAlarmTime);

	res.json({ alarmState });
});

app.delete('/api/alarm', (req, res) => {
  const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : "";
	if (!sid || !users.isValid(username)) {
		res.status(401).json({ error: "auth-missing" });
		return;
	}

	const userId = users.getUserId(username);
	const alarmState = alarmData.resetAlarm(userId);

	res.json({ alarmState });
})

// Record
app.get('/api/record', (req, res) => {
  const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : "";
	if (!sid || !users.isValid(username)) {
		res.status(401).json({ error: "auth-missing" });
		return;
	}
  const userId = users.getUserId(username);
	const recordState = recordData.getRecord(userId);
  
	res.json({ recordState });
})

app.put('/api/record', (req, res) => {
  const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : "";
	if (!sid || !users.isValid(username)) {
		res.status(401).json({ error: "auth-missing" });
		return;
	}
  const userId = users.getUserId(username);
  const reqCount = req.body.count
	const recordState = recordData.setRecord(userId, reqCount);

	res.json({ recordState });
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
