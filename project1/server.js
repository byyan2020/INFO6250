// Express setting
const express = require("express")
const app = express()
const PORT = 3000
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))

// Cookie
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// UUid
const uuidv4 = require("uuid").v4;

// Module imports
const homeWeb = require("./home-web")
const sessionModel = require("./session-model")

// Define variables


// GET "/"
app.get("/", (req, res) => {
    const sid = req.cookies.sid 
    if (!sid){
        res.send(homeWeb.loginPage())
    } else if (!sessionModel.isSidValid(sid)) {
        res.clearCookie("sid")
        const errorMessage = "Invalid session id"
        res.sendStatus(401).send(homeWeb.loginPage(errorMessage))
    } else {
        const username = sessionModel.getUsername(sid)
        res.send(homeWeb.homePage(username))
    }
})

// POST "/login"
app.post("/login", (req, res) => {
    // Get user name from login form
    const username = req.body.username.trim()

    // Validate username
    const pattern = /^[a-zA-Z0-9]+$/
    if (!username || username === "dog" || !pattern.test(username)) {
        const errorMessage = "Username is not valid"
        res.status(401).send(homeWeb.loginPage(errorMessage))
        return
    }

    // Generate session id
    const sid = uuidv4()
    // Store session id and username to sessionModel
    sessionModel.setSession(sid, username)

    // Set cookie and redirect
    res.cookie("sid", sid);
    res.redirect('/') 
})

app.post("/logout", (req, res) => {
    const sid = req.cookies.sid 
    sessionModel.deleteSession(sid)
    res.clearCookie("sid")
    res.redirect("/")
})


app.listen(PORT, () => {
    console.log(`listen on http://localhost:${PORT}`)
})