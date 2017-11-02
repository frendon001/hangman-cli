var Letter = require('./letter.js');


function Word() {
	//this.wordList = [];
	this.wordsUsed = [];
	this.currentWord = "";
	this.currentWordState = "";
	this.wordsUsed = [];
	//create array of possible guess options
	this.wordList = ["attention", "puppy",
		"strength", "galaxy", "buffalo"
	];
	this.totalWords = this.wordList.length;
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
		//return this.currentWord;
		console.log(this.currentWordState);

	} else if (this.wordList.length > 1) {
		console.log("You got it right! Next word: ");
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
		//isCapLetterReg.lastIndex = 0;
		//return this.currentWord;
		console.log(this.currentWordState);
	} else if (this.wordList.length == 1) {
		//remove last word from list
		this.wordList.pop();
	}
};


Word.prototype.applyGuess = function(letter) {
	var letterGuess = new Letter(this.currentWord, this.currentWordState, letter.toUpperCase());
	this.currentWordState = letterGuess.guessProgressUpdate();
};



module.exports = Word;