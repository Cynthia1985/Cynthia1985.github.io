
// array of words
var programmingLanguages = [
	"python",
	"javascript",
	"mongodb",
	"json",
	"java",
	"html",
	"css",
	"c",
	"csharp",
	"golang",
	"kotlin",
	"php",
	"sql",
	"ruby"
]

// create variables
let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

// randomly the word to guess will be chosen from the array above
function randomWord() {
    answer = programmingLanguages[Math.floor(Math.random() * programmingLanguages.length)];
}

// create the alphabetic buttons with a method
function generateButtons() {
    let buttonsHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter =>
      `
        <button
          class="btn btn-lg btn-primary m-2"
          id='` + letter + `'
          onClick="handleGuess('` + letter + `')"
        >
          ` + letter + `
        </button>
      `).join('');
  
    document.getElementById('keyboard').innerHTML = buttonsHTML;
}

// check if the the letter provided by the user matches one or more of the letters in the word
function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);
  
    if (answer.indexOf(chosenLetter) >= 0) {
      guessedWord();
      checkIfGameWon();
    } else if (answer.indexOf(chosenLetter) === -1) {
      mistakes++;
      updateMistakes();
      checkIfGameLost();
      updateHangmanPicture();
    }
}

// if you're losing the hangman grows
function updateHangmanPicture() {
    document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpeg';
}

// check if all letters have been found
function checkIfGameWon() {
    if (wordStatus === answer) {
      document.getElementById('keyboard').innerHTML = 'You Won!!!';
    }
}

// once you got six wrong letters, you lose
function checkIfGameLost() {
    if (mistakes === maxWrong) {
      document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
      document.getElementById('keyboard').innerHTML = 'You Lost!!!';
    }
}

// prints the guessfield and check the word status
function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
  
    document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

// if a guessed letter is not in the word, the letter will be put on the "wrong guesses"
function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
}

// starts a new game hitting reset button
function reset() {
    mistakes = 0;
    guessed = [];
    document.getElementById('hangmanPic').src = './images/0.jpeg';
  
    randomWord();
    guessedWord();
    updateMistakes();
    generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();