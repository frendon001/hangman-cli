var inquirer = require('inquirer');
var Word = require('./word.js');

var maxGuesses = 10;

function HangmanCLI() {
	this.wins = 0;
	this.remainingGuesses = maxGuesses;
	this.gameOver = false;
	this.newGame = true;
	this.hangmanWord = null;
	this.checkGuess = function(playerGuess) {
		var wordArr = this.hangmanWord.currentWord.split("");
		//Compare the playerGuess against current word and determine if guess is correct
		if (wordArr.indexOf(playerGuess.toUpperCase()) > -1) {
			//Guess is correct, update game
			this.hangmanWord.applyGuess(playerGuess);
			console.log(this.hangmanWord.currentWordState);
			console.log("correct");
		} else {
			//Incorrect Guess - Decrease number of guesses
			this.remainingGuesses -= 1;
			console.log(this.hangmanWord.currentWordState);
			console.log("Incorrect");
			console.log(this.remainingGuesses + " guesses remaining.");
		}
		//Check if word guess is complete
		if (this.hangmanWord.currentWord === this.hangmanWord.currentWordState) {
			//Increment win count and use new word
			
			this.wins++;
			//this.hangmanWord.newWord();
			this.newWord();
		}
	};
};

HangmanCLI.prototype.newWord = function() {
	//reset guess count and find new word
	if (this.hangmanWord) {
		this.remainingGuesses = maxGuesses;
		this.hangmanWord.newWord();
		//console.log(this.hangmanWord.currentWordState);
	//create new word object for game
	} else {
		//add create a new word
		this.hangmanWord = new Word();
		this.remainingGuesses = maxGuesses;
		this.hangmanWord.newWord();
		//console.log(this.hangmanWord.currentWordState);
	}
};

HangmanCLI.prototype.isGameOver = function() {
	//check if game is over
	//console.log(this.hangmanWord.totalWords);
	if (this.hangmanWord.wordList.length <= 0) {
		this.gameOver = true;
	}
};

var continueGame = function(hangman) {
	// ask player to enter a guess
	inquirer.prompt([{
		type: "confirm",
		name: "continue",
		message: "Would you like to continue playing? (y/n) ",
		default: true

	}]).then(function(answers) {
		// give the player 12 more guesses
		if (answers.continue === true) {
			hangman.remainingGuesses = maxGuesses;
			play(hangman);
		} else {
			console.log("Thank you for playing!\nBetter luck next time.")
		}


	});
};

var play = function(hangman) {

	if (hangman.newGame) {
		hangman.newGame = false;
		console.log("Enter a letter to guess the following word:");
		hangman.newWord();
		

	}

	hangman.isGameOver();

	// check game parameters to continue prompting guesses
	if (hangman.remainingGuesses > 0 && hangman.gameOver === false) {
		var promptMessage = "Guess a letter: ";
		var letter = "";
		// ask player to enter a guess
		inquirer.prompt([{
			type: "input",
			name: "letterGuess",
			message: promptMessage

		}]).then(function(answers) {
			//check letter guess
			hangman.checkGuess(answers.letterGuess);

			// run play function to keep playing.
			play(hangman);
		}).catch(function() {
			console.log("Promise Rejected");
		});

	}
	// ran out of guesses, ask to continue
	if (hangman.remainingGuesses === 0 && hangman.gameOver === false) {
		continueGame(hangman);
	}
	// all words have been guessed game is over
	if (hangman.gameOver === true) {
		console.log("Congratulations you have guessed all the words.")
	}

};

var myHangmanGame = new HangmanCLI();

play(myHangmanGame);