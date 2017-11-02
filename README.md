# hangman-cli
Hangman command-line game

Play a nice game of hangman on the comand line with this application. 

## Description on how to use the app

1. Run the hangman-cli application

```
node hangman-cli.js 
```

2. Start entering guesses

```
Enter a letter to guess the following word:
_ _ _ _ _
? Guess a letter:  a
```

3. Keep playing by choosing to continue or end the game if you ran out of guesses

```
? Guess a letter:  q
_ _ _ _ _
Incorrect
0 guesses remaining.
? Would you like to continue playing? (y/n)  Yes
? Guess a letter: 
```

## Editing Guess Options

The guess option can be edited by adding or removing items to the wordsList property in the Word.js constructor.

```
this.wordList = ["attention", "puppy",
		"strength", "galaxy", "buffalo"
		];
```

## Technologies Used

- Node
- JavaScript

## Authors

* **Fausto Rendon** 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
