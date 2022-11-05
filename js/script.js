const guessedLettersList  = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputText = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span")
const message = document.querySelector(".message");
const hiddenButton = document.querySelector(".play-again hide");

const word =("magnolia");


const placeholder = function (word) {
    const placeholderLetters = [];
    for(const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("")
};
placeholder(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guessedLetter = inputText.value;
    console.log(guessedLetter);
    inputText.value = "";
});
