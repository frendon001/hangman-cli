var Letter = require('./letter.js');


function Word(wordList, wordsUsed) {
	this.wordList = wordList;
	this.wordsUsed = wordsUsed;
	this.currentWord = "";
	this.currentWordState = "";
};

Word.prototype.newWord = function() {
	//regex for ensurre only capitalized characters
	var isCapLetterReg = /[A-Z]/g;
	//randomly select a word to guess from wordList
	if (this.wordsUsed.length === 0) {

		//select any word since the game was restarted
		this.currentWord = this.wordList[Math.floor(Math.random() * this.wordList.length)].toUpperCase();
		//add the randomly selected word to the wordsUsed list
		this.wordsUsed.push(this.currentWord);
		//set place holders for currentWordState variable
		//used to hide word at the start of new word
		this.currentWordState = this.currentWord.replace(isCapLetterReg, "_");
		isCapLetterReg.lastIndex = 0;
		return this.currentWord;



	} else if (this.wordList.length > 1) {

		//createvraible to hold current word for filtering
		var removeWord = this.currentWord;
		//remove the used word from wordList
		this.wordList = this.wordList.filter(function(word) {
			return word.toUpperCase() !== removeWord;
		});
		//Select a new word from filtered word List
		this.currentWord = this.wordList[Math.floor(Math.random() * this.wordList.length)].toUpperCase();
		//add the randomly selected word to the wordsUsed list
		this.wordsUsed.push(this.currentWord);
		//set place holders for currentWordState variable
		//used to hide word at the start of new word
		this.currentWordState = this.currentWord.replace(isCapLetterReg, "_");
		isCapLetterReg.lastIndex = 0;
		return this.currentWord;
	}
};


Word.prototype.applyGuess = function(letter) {
	var letterGuess = new Letter(this.currentWord, this.currentWordState, letter.toUpperCase());
	this.currentWordState = letterGuess.guessProgressUpdate();
	console.log(this.currentWordState);

};



module.exports = Word;