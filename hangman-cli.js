var inquirer = require('inquirer');
var Word = require('./word.js');

var maxGuesses = 10;

function HangmanCLI() {
	this.wins = 0;
	this.loses = 0;
	this.remainingGuesses = maxGuesses;
	this.gameOver = false;
	this.newGame = true;
	this.hangmanWord = null;
	this.wordsUsed = [];
	//create array of possible guess options
	this.wordList = ["absurd", "abyss", "avenue", "awkward", "bandwagon",
		"banjo", "blizzard", "bookworm", "buffalo", "buffoon", "buzzwords",
		"cobweb", "cycle", "espionage", "fishhook", "fixable", "flapjack",
		"funny", "galaxy", "glowworm", "glyph", "ivory", "jackpot", "jelly",
		"jigsaw", "jogging", "lucky", "luxury", "microwave", "pixel", "puppy",
		"staff", "strength", "transcript", "vortex", "wizard", "woozy", "wristwatch"
	];
};

HangmanCLI.prototype.continue = function() {
	// ask player to enter a guess
	inquirer.prompt([{
		type: "confirm"
		name: "continue",
		message: "Would you like to continue playing? (y/n) ",
		default: true

	}]).then(function(answers) {
		// give the player 12 more guesses
		if (answers.continue === true) {
			this.remainingGuesses = maxGuesses;
			this.play();
		} else {
			console.log("Thank you for playing!\nBetter luck next time.")
		}


	});
};

HangmanCLI.prototype.newWord = function() {

	if (this.wordList.length === this.wordsUsed.length) {
		this.gameOver = true;
	} else {
		//add create a new word
		this.hangmanWord = new Word(this.wordList, this.wordsUsed);
		this.remainingGuesses = maxGuesses;
		var word = this.hangmanWord.newWord();
		if (word) {
			this.wordsUsed.push(word);
		}
	}
};

HangmanCLI.prototype.checkGuess = function(playerGuess) {
		
		//Compare the playerGuess against current word and determine if guess is correct
		if (currentWordArr.indexOf(playerGuess) > -1) {

			//Guess is correct, update game
			this.hangmanWord.applyGuess();


		} else {

			//Incorrect Guess - Decrease number of guesses
			this.remainingGuesses -= 1;
			console.log(this.hangmanWord.currentWordState);

		}

		//Check if word guess is complete
		if (this.hangmanWord.currentWord === this.hangmanWord.currentWordState) {
			//Increment win count and use new word
			this.wins++;
			this.newWord();
		}
};

HangmanCLI.prototype.play = function() {

	if (this.newGame) {
		this.newGame = false;
		this.newWord();

	}

	// check game parameters to continue prompting guesses
	if (this.remainingGuesses > 0 && gameOver === false) {
		var promptMessage = "Guess a letter:\n" + "";
		// ask player to enter a guess
		inquirer.prompt([{
			type: "input"
			name: "letterGuess",
			message: promptMessage

		}]).then(function(answers) {
			
			this.checkGuess();

			// run the askquestion function again so as to either end the loop or ask the questions again
			play();
		});
		// else to ask user to start over
	}
	// ran out of guesses, ask to continue
	if (this.remainingGuesses === 0 && gameOver === false) {
		this.continue();
	}

};



var myHangmanGame = new HangmanCLI();

myHangmanGame.play();