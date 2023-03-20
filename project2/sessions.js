const uuid = require('uuid').v4

// sessions[sid] = {username}
const sessions = {};

function setSession(username) {
    const sid = uuid();
    sessions[sid] = {username}
    return sid
}

function getUsername(sid) {
    return sessions[sid]?.username
}

function deleteSession(sid) {
    delete sessions[sid]
}


const sessionModle = {
    setSession,
    getUsername,
    deleteSession,
}

module.exports = sessionModle