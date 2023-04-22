const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3000;

const sessions = require("./database/sessions");
const users = require("./database/users");
const timerData = require("./database/timerData")
const alarmData = require("./database/alarmData");

app.use(cookieParser());
app.use(express.static("./build"));
app.use(express.json());

const TIMER_STATUS = {
  PAUSE: 'pause',
  CONTINUE: 'continue',
  WORK: 'work',
  REST: 'rest',
  RESET: 'reset',  
}

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
  const userId = users.createUser(username)

  // Create default timer, alarm, record state
  timerData.resetTimer(userId)
  alarmData.createAlarm(userId)

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

  const userId = users.getUserId(username)
  const timerState = timerData.getTimer(userId)
  res.json({timerState});
});

app.put('/api/timer', (req, res) => {
  const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : "";
	if (!sid || !users.isValid(username)) {
		res.status(401).json({ error: "auth-missing" });
		return;
	}
  const userId = users.getUserId(username)
  const reqtimerStatus = req.body.timerStatus
  
  let timerState;
  if (reqtimerStatus === TIMER_STATUS.RESET) {
    timerState = timerData.resetTimer(userId)
  } else if (reqtimerStatus === TIMER_STATUS.WORK) {
    timerState = timerData.startWork(userId)
  } else if (reqtimerStatus === TIMER_STATUS.REST) {
    timerState = timerData.startRest(userId)
  } else if (reqtimerStatus === TIMER_STATUS.PAUSE) {
    timerState = timerData.pauseTimer(userId)
  } else if (reqtimerStatus === TIMER_STATUS.CONTINUE) {
    timerState = timerData.continueTimer(userId)
  } else {
    res.status(400).json({ error: "unknown-timer-status" });
  }
    
  res.json({timerState})
})

// Alarm
app.get('/api/alarm', (req, res) => {
  const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : "";
	if (!sid || !users.isValid(username)) {
		res.status(401).json({ error: "auth-missing" });
		return;
	}

  const userId = users.getUserId(username)
  const alarmStatus = alarmData.getAlarm(userId)

  res.json({alarmStatus});
})

app.put('/api/alarm', (req, res) => {
  const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : "";
	if (!sid || !users.isValid(username)) {
		res.status(401).json({ error: "auth-missing" });
		return;
	}

  const userId = users.getUserId(username)
  const reqAlarmStatus = req.body.alarm
  const alarmStatus = alarmData.setAlarm(userId, reqAlarmStatus)
  
  res.json({alarmStatus})
  
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
