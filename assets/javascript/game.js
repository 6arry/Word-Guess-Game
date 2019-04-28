// GLOBAL VARIABLES
// =======================================================================
var artists = [
    "ginuwine", "tupac", "notorious", "nas", "blackstreet", "warren g", "snoop doggy dog", "bone thugz n harmony", "dr dre", "montell jordan", "ice cube", "tlc", "aaliyah"
];

var chosenArtist = "";
var correctLetters = [];
var numBlanks = 0;
var correctAndBlanks = []; // example: _ _ _ _ _ _ _
var wrongLetters = [];

// Game Score Board:
var wins = 0;
var losses = 0;
var guessesLeft = 9;



//  FUNCTIONS (Re-usable blocks of code that I will call upon when needed)
// =======================================================================

function startGame () {
    chosenArtist = artists[Math.floor(Math.random() * artists.length)];
    correctLetters = chosenArtist.split("");
    numBlanks = correctLetters.length;

    // Reset
    guessesLeft = 9;
    wrongLetters = [];
    correctAndBlanks = [];

    // Populate blanks and correct letters with right number of blanks
    for (var i = 0; i < numBlanks; i++){
        correctAndBlanks.push("_");
    }

    // Change HTML to reflect round conditions
    document.getElementById('chosen-artist').innerHTML = correctAndBlanks.join(" ");
    document.getElementById('guesses-left').innerHTML = guessesLeft;
    document.getElementById('win-counter').innerHTML = wins;
    document.getElementById('loss-counter').innerHTML = losses;

    // Testing / Debugging
    console.log(chosenArtist);
    console.log(correctLetters);
    console.log(numBlanks);
    console.log(correctAndBlanks);

}

function checkLetters(letter) {
    // check if letter exists in code at all
    // alert(letter);

    var isLetterInWord = false;

    for (var i=0; i<numBlanks; i++){
        if(chosenArtist[i] == letter) {
            isLetterInWord = true;
            // alert("Letter found");
        }
    }

    // Check where in the word the letter exists, then populate our correctAndBlanks array
    if(isLetterInWord) {
        for (var i=0; i<numBlanks; i++) {
            if(chosenArtist[i] == letter) {
                correctAndBlanks[i] = letter;
            }
        }
    }

    // Letter wasn't found
    else {
        wrongLetters.push(letter);
        guessesLeft--
    }
    // Testing and Debugging
    // console.log(correctAndBlanks);

}


function roundComplete() {
    console.log("Wins: " + wins + " | Losses: " + losses + " | Guesses Remaining: " + guessesLeft);

    // Update the HTML to show the most recent count stats
    document.getElementById('guesses-left').innerHTML = guessesLeft;
    document.getElementById('chosen-artist').innerHTML = correctAndBlanks.join(" ");
    document.getElementById('wrong-letters').innerHTML = wrongLetters.join(" ");

    // Check if user won
    if (correctLetters.toString() == correctAndBlanks.toString()) {
        wins++;
        alert("WINNER WINNER CHICKEN DINNER!");

        // Update the win coutner in the HTML
        document.getElementById("win-counter").innerHTML = wins;

        startGame();
    }

    // Check if user lossed
    else if (guessesLeft == 0) {
        losses++;
        alert("Too bad, so sad... v_v, you lose.")

        // Update the HTML
        document.getElementById('loss-counter').innerHTML = losses;

        startGame();
    }

}

// MAIN PROCESS
// =======================================================================
// Inititiates the code the first time
startGame();

// Registering keyclocks
document.onkeyup = function() {
    var myGuess = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(myGuess);
    roundComplete();
    // Testing / Debugging
    // console.log("Your letter was --> " + myGuess)



}