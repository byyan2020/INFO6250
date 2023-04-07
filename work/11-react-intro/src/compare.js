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

export default compare