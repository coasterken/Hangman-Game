//  JS for Hangman Game
//
// **********  VARIABLES  **********
var ahsArray = ["sarah paulson"
                ,"evan peters"
                ,"ryan murphy"
                ,"lily rabe"
                ,"jessica lange"
                ,"kathy bates"
                ,"murder house"
                ,"asylum"
                ,"coven"
                ,"freak show"
                ,"hotel"
                ,"roanoke"
                ,"cult"
                ,"ghosts"
                ,"witches"
                ,"carnival"
                ,"vampire"
                ,"clown"
                ,"balenciaga"
]

var totalGuesses = 0;
var guessesRemaining = 0;
var totalWins = 0;
var randomAHS;
var randomUnderscore;
var inputKeys = "";
var goodKeys = "";

//********** CODE  **********

// Set things up
function loadFunction() {
  totalGuesses = 12;
  inputKeys = "";
  goodKeys = "";
  guessesRemaining = totalGuesses;
  //get a value from the AHS array
  randomAHS = ahsArray[(Math.floor(Math.random() * ahsArray.length))];
  //store the value as underlines with spaces between each character
  randomUnderscore = (randomAHS.replace(/[a-zA-Z]/g, "_")).split('').join(' ');
  console.log(randomAHS);
  document.getElementById("currentWord").innerHTML = randomUnderscore; 
  document.getElementById("guesses").innerHTML = totalGuesses;
  document.getElementById("lettersSelected").innerHTML = ""; 
  document.getElementById("lettersSelected").focus();
}

// The  magic happens here
document.onkeyup = function(event) {
  
  //console.log("this is the key " + event.key + " length " + event.key.length);
  // ^ inside brackets means match all letters except those shown
  // in this case, if match occurs, it means it is a letter other than
  // a-z - think - is key NOT in the group?
  if (event.key.match(/[^a-zA-Z]+$/) || event.key.length > 1) {
    //console.log("not a good key")
    return;
  }
  var lcKey = event.key.toLowerCase();
  // is the pressed key in the selected AHS value?  Then we have a match
  // if key was already selected (in randomUnderscore), ignore
  if (randomAHS.match(lcKey)) {

    // has the pressed key already been selected?  If so, get out
    if (goodKeys.match(lcKey)) {
        return;
    } else {
        goodKeys = goodKeys + lcKey;
    }
   
    // set up a new regexp with all selected input keys
    // will be used to replace all except matching values with underscores for display
    var reg = new RegExp("[^\\s" + goodKeys + "]", "g");
    randomUnderscore = (randomAHS.replace(reg, "_")).split('').join(' ');
    //console.log(randomUnderscore)
    document.getElementById("currentWord").innerHTML = randomUnderscore; 
  } else {

    // has the pressed key already been selected?  if not, add new key to field
    if (inputKeys.match(lcKey)) {
       return;
    } else {
       inputKeys = inputKeys + lcKey;
       guessesRemaining = guessesRemaining - 1;
       document.getElementById("lettersSelected").innerHTML = inputKeys.split('').join(' '); 
       document.getElementById("guesses").innerHTML = guessesRemaining; 
    }
  }

  //console.log( randomAHS.replace(/\s/g, '') + " " + randomUnderscore.replace(/\s/g, '') )
  // are we done?  0 guesses remain or we have a match
  //could use indexof here - try this later
  if (guessesRemaining === 0) { 
      loadFunction();
  } else if (randomAHS.replace(/\s/g, '') === randomUnderscore.replace(/\s/g, ''))  {
      totalWins = totalWins + 1;
      document.getElementById("gamesWon").innerHTML = totalWins; 
      loadFunction();
  }

}


