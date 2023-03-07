const words = require("./words");

guessGame = {};

function startNewGame (username) {
    const wordsSet = new Set(words)
    guessGame[username] = {
        wordsPool: wordsSet,
        secretWord: words[Math.floor(Math.random() * words.length)],
        previousGuess: [],
        recentGuessValid: true,
        guessCount: 0,
        guessCorrect: false,
    }
    console.log("Username: ", username)
    console.log("Secret Word: ", guessGame[username].secretWord)
}

function isPlayer (username) {
    if (username in guessGame){
        return true
    } 
    return false
}

function isGuessValid (username, guess) {
    if (guessGame[username].wordsPool.has(guess.toLowerCase())) {
        guessGame[username].recentGuessValid = true
        return true
    } 
    guessGame[username].recentGuessValid = false
    return false
}

function makeGuess(username, guess) {
    guess = guess.toLowerCase()
    gameData = guessGame[username]

    // Get match result
    matchCount = compare(gameData.secretWord, guess)

    // Delete guess from words pool
    gameData.wordsPool.delete(guess)

    // Update previous guessed words
    gameData.previousGuess.push({
        guess: guess,
        matchCount: matchCount
    })

    // Update guess count
    gameData.guessCount += 1

    // Update if guess correct
    guess === gameData.secretWord ? gameData.guessCorrect = true : gameData.guessCorrect = false
}

// Conpare secret word and guess, return how many letters are matched
function compare(secret, guess) {
	let secretCount = Array(26).fill(0);
	let guessCount = Array(26).fill(0);
	let res = 0;

	for (let char of secret.toLowerCase()) {
		secretCount[char.charCodeAt(0) - "a".charCodeAt(0)] += 1;
	}

	for (let char of guess.toLowerCase()) {
		guessCount[char.charCodeAt(0) - "a".charCodeAt(0)] += 1;
	}

	for (let i = 0; i < 26; i++) {
		if (secretCount[i] && guessCount[i]) {
			res += Math.min(secretCount[i], guessCount[i]);
		}
	}

	return res;
}

const gameModel = {
    guessGame,
    startNewGame,
    isPlayer,
    isGuessValid,
    makeGuess,
}

module.exports = gameModel;