const guessedLettersList  = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputText = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span")
const message = document.querySelector(".message");
const hiddenButton = document.querySelector(".play-again hide");

const word ="magnolia";
const guessedLetters = [];

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};
placeholder(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const guess = inputText.value;
    console.log(guess);
    inputText.value = "";
    const goodGuess = validation(guess);
    if (goodGuess) {
        makeGuess(guess);
    }
    inputText.value = "";
    });

const validation = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0 ){
        message.innerText = "Enter a letter,please.";
    }
 else if (input.length > 1) {
    message.innerText = "Only one letter,please!"
}
else if (!input.match(acceptedLetter)){
    message.innerText = "Wrong,you can only type letters from A to Z";
}
else {
    return input;
}
};
const makeGuess = function(guess) {
guess = guess.toUpperCase();
if (guess.includes(guess)) {
    message.innerText = "You are repiting, try again";
} else {
   guess.push(guess); 
   console.log=(guess);
}
};