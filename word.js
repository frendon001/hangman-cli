var Letter = require('./letter.js');


function Word() {
	//this.wordList = [];
	this.wordsUsed = [];
	this.currentWord = "";
	this.currentWordState = "";
	this.wordsUsed = [];
	this.wordList = ["abyss", "avenue"];
	this.totalWords = this.wordList.length;
};

Word.prototype.newWord = function() {
	console.log("newWord", this.wordList.length === 1);
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
		//return this.currentWord;

	} else if (this.wordList.length > 1) {

		//createvraible to hold current word for filtering
		var removeWord = this.currentWord;
		//remove the used word from wordList
		this.wordList = this.wordList.filter(function(word) {
			return word.toUpperCase() !== removeWord;
		});
		console.log("has atleast 1 word");
		//Select a new word from filtered word List
		this.currentWord = this.wordList[Math.floor(Math.random() * this.wordList.length)].toUpperCase();
		console.log(this.currentWord);
		//add the randomly selected word to the wordsUsed list
		this.wordsUsed.push(this.currentWord);
		console.log(this.wordsUsed);
		//set place holders for currentWordState variable
		//used to hide word at the start of new word
		this.currentWordState = this.currentWord.replace(isCapLetterReg, "_");
		console.log(this.currentWordState);
		//isCapLetterReg.lastIndex = 0;
		//return this.currentWord;
	} else if (this.wordlist.length == 1) {
		console.log("test here");
		this.wordList.pop();
	}
};


Word.prototype.applyGuess = function(letter) {
	var letterGuess = new Letter(this.currentWord, this.currentWordState, letter.toUpperCase());
	this.currentWordState = letterGuess.guessProgressUpdate();
};



module.exports = Word;