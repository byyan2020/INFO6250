"use strict";

const { clearScreenDown } = require("readline");

/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare(word, guess) {
	// DO NOT MODIFY

	/* YOU MAY MODIFY THE LINES BELOW */
	let count1 = Array(26).fill(0);
	let count2 = Array(26).fill(0);
	let res = 0;

	for (let char of word.toLowerCase()) {
		count1[char.charCodeAt(0) - "a".charCodeAt(0)] += 1;
	}

	for (let char of guess.toLowerCase()) {
		count2[char.charCodeAt(0) - "a".charCodeAt(0)] += 1;
	}

	for (let i = 0; i < 26; i++) {
		if (count1[i] && count2[i]) {
			res += Math.min(count1[i], count2[i]);
		}
	}

	return res;
}
