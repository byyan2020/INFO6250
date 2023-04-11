const users = {}

function isValid(username) {
  let isValid = true
  isValid = !!username && username.trim()
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/)
  return isValid
}

function getWord(username) {
  return users[username]
}

function addWord(username, word) {
  users[username] = word
}

module.exports = {
  isValid,
  getWord,
  addWord,
}
