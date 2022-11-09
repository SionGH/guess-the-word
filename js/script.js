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
 }else if (!input.match(acceptedLetter)){
    message.innerText = "Wrong,you can only type letters from A to Z";
}else {
    return input;
}
};
const makeGuess = function(guess) {
guess = guess.toUpperCase();
if (guessedLetters.includes(guess)) {
    message.innerText = "You are repiting, try again";
} else {
   guessedLetters.push(guess); 
   console.log(guessedLetters);
   showPlayerGuesses();
   updateWordInProgress(guessedLetters);
}
};
const showPlayerGuesses = function(){
    //clear the list first
    guessedLettersList.innerHTML = "";
    for(const letter of guessedLetters){
        const li = document.createElement ("li");
        li.innerText = letter;
        guessedLettersList.append(li);
    }
};
const updateWordInProgress = function(guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase()); 
        }else{
            revealWord.push("●");
        }
    }
console.log(revealWord);
wordInProgress.innerText=revealWord.join("");
winner();
};

const winner = function () {
    if(word.toUpperCase() === wordInProgress.innerText){
        message.classList.add("win");
        message.innerHTML=`<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
};