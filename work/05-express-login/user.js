const sessions = {};
const store = {};

function getUserName(sid){
    return sessions[sid]?.username
}

function isSidValid (sid) {
    if (sid in sessions) {
        return true
    }
    return false;
}

function setSession (sid, username) {
    sessions[sid] = { username }
}

function deleteSession (sid) {
    delete sessions[sid];
}


function getStoredword(username) {
    return store[username]
}

function setStoredWord(username, storedWord) {
    store[username] = storedWord;
}

const user = {
    sessions,
    store,
    getUserName,
    getStoredword,
    isSidValid,
    setSession,
    setStoredWord,
    deleteSession,
}

module.exports = user;