const guessedLettersList  = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputText = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesMain = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span")
const message = document.querySelector(".message");
const hiddenButton = document.querySelector(".play-again hide");

let word ="magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function(){
    const res = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
  };

getWord ();


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
   estimate(guess);
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
const estimate = function(guess) {
    const wordUpper = word.toUpperCase();
    if (!wordUpper.includes(guess)){
        //Sorry,you have lost a chance.
        message.innerText = `Next time,the word has no ${guess}`;
        remainingGuesses -= 1;
     } else {
        message.innerText = `You have a match! the word has ${guess}`  
    }
    if(remainingGuesses === 0){
        message.innerHTML = `Game over! the word is <span class = "highlight"> ${word}</span>`;
}else if (remainingGuesses === 1) {
    remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
}
};
const winner = function () {
    if(word.toUpperCase() === wordInProgress.innerText){
        message.classList.add("win");
        message.innerHTML=`<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
};
