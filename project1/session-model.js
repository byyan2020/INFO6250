// sessions[sid] = {username}
const sessions = {};

function setSession(sid, username) {
    sessions[sid] = {username}
}

function isSidValid(sid) {
    if (sid in sessions) {
        return true
    }
    return false
}

function getUsername(sid) {
    const {username} = sessions[sid]
    return username
}

function deleteSession(sid) {
    delete sessions[sid]
}


const sessionModle = {
    sessions,
    setSession,
    isSidValid,
    getUsername,
    deleteSession,
}

module.exports = sessionModle

