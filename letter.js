function Letter(word, guessProgress, letterGuess) {
	this.word = word;
	this.guessProgress = guessProgress;
	this.letterGuess = letterGuess;

};


Letter.prototype.guessProgressUpdate() = function() {
	var newGuessProgress = this.guessProgress.split("");
	var wordArr = this.word.split("");
	for (var i = guessProgress.length - 1; i >= 0; i--) {
		if (wordArr[i] === this.letterGuess) {
			//populate the guessed character in the proper place for display
			newGuessProgress[i] = wordArr[i];
		}
	}

	return newGuessProgress.join("");
};

module.exports = Letter;