var inquirer = require('inquirer');
var Word = require('./word.js');

var maxGuesses = 10;

function HangmanCLI() {
	this.wins = 0;
	this.remainingGuesses = maxGuesses;
	this.gameOver = false;
	this.newGame = true;
	this.hangmanWord = null;
	//create array of possible guess options
	// this.wordList = ["absurd", "abyss", "avenue", "awkward", "bandwagon",
	// 	"banjo", "blizzard", "bookworm", "buffalo", "buffoon", "buzzwords",
	// 	"cobweb", "cycle", "espionage", "fishhook", "fixable", "flapjack",
	// 	"funny", "galaxy", "glowworm", "glyph", "ivory", "jackpot", "jelly",
	// 	"jigsaw", "jogging", "lucky", "luxury", "microwave", "pixel", "puppy",
	// 	"staff", "strength", "transcript", "vortex", "wizard", "woozy", "wristwatch"
	// ];
	this.checkGuess = function(playerGuess) {
		console.log("CHECKGUESS");
		console.log(this.hangmanWord.currentWord);
		var wordArr = this.hangmanWord.currentWord.split("");
		console.log(wordArr);
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
			console.log("You got it right! Next word.")
			this.wins++;
			//this.hangmanWord.newWord();
			this.newWord();
			
		}
	};
};

HangmanCLI.prototype.newWord = function() {
	if (this.hangmanWord) {


		//add create a new word
		//this.hangmanWord = new Word();
		this.remainingGuesses = maxGuesses;
		console.log(this.hangmanWord);
		this.hangmanWord.newWord();
		console.log("new word complete")
		console.log(this.hangmanWord.currentWordState);
	} else {
		//add create a new word
		this.hangmanWord = new Word();
		this.remainingGuesses = maxGuesses;
		console.log(this.hangmanWord);
		this.hangmanWord.newWord();
		console.log("new word complete")
		console.log(this.hangmanWord.currentWordState);
		//var word = this.hangmanWord.newWord();
		// if (word) {
		// 	this.wordsUsed.push(word);
		// }
	}

};

HangmanCLI.prototype.isGameOver = function() {
	console.log(this.hangmanWord.wordList);
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
		hangman.newWord();
		console.log("Guess a letter\n" + hangman.hangmanWord.currentWordState);

	}

	hangman.isGameOver();

	// check game parameters to continue prompting guesses
	if (hangman.remainingGuesses > 0 && hangman.gameOver === false) {
		var promptMessage = "Guess a letter: ";
		var letter = "??";
		// ask player to enter a guess
		inquirer.prompt([{
			type: "input",
			name: "letterGuess",
			message: promptMessage

		}]).then(function(answers) {
			console.log(answers.letterGuess);
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

	if (hangman.gameOver === true) {
		console.log("Congratulations you have guessed all the words.")
	}

};



var myHangmanGame = new HangmanCLI();

play(myHangmanGame);