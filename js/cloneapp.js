const cardDeck = [
  "fa fa-diamond",
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-cube",
  "fa fa-leaf",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-bicycle",
  "fa fa-bomb",
  "fa fa-bomb"
];

shuffle(cardDeck);

let cardsContainer = document.querySelector(".deck");
let openCards = [];
let sameCards = [];
let time;
let timer;
let seconds;

/* ------- starting the game ------- */

function start() {
  for (let i = 0; i < cardDeck.length; i++) {
    let card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = '<i class="' + cardDeck[i] + '"</i>';
    cardsContainer.appendChild(card);
    time = 0;
    //This will call the the function for clicking  the cards
    addClickListener(card);
  }
}

/* --------showing a click on a card------- */
function addClickListener(card) {
  card.addEventListener("click", function() {
    if (time === 0 && !timer) {
      startTimer();
    }

    const firstCard = card;
    const secondCard = openCards[0];

    if (openCards.length === 1) {
      card.classList.add("open", "show", "remove_click");
      openCards.push(card);

      // This function will compare the two cards
      compare(firstCard, secondCard);
    } else {
      firstCard.classList.add("open", "show", "remove_click");
      openCards.push(card);
    }
  });
}


/* ------ This will start the timer ------ */
function startTimer() {
  let clock = document.querySelector("#clock");
  
  timer = setInterval(function() {
    time += 1000;
    clock.innerText = getFormattedTime(time);
  }, 1000);
}


/* ------ This will reset the timer ------ */
function resetTimer() {
  clearInterval(timer);
  timer = false;
 
  let clock = document.querySelector("#clock");
  clock.innerText = "";
}

/* ------ This is the format for the time ------ */
function getFormattedTime(time){
    let seconds = time / 1000;
    return `${seconds >= 60 ? parseInt(seconds / 60) : ''}:${seconds % 60 < 10 ? '0' : ''}${seconds % 60 === 0 ? '0' : seconds % 60}`;

    }

/* ------ Comparing the Two cards ------ */

function compare(firstCard, secondCard) {
  if (firstCard.innerHTML === secondCard.innerHTML) {
    // cards are being matched
    firstCard.classList.add("match");
    secondCard.classList.add("match");

    sameCards.push(firstCard, secondCard);
    openCards = [];

    //This function will check if the game is over
    gameOver();
  } else {
    // setting a set timeout function to flip the cards over if there is no match
    setTimeout(function() {
      firstCard.classList.remove("open", "show", "remove_click");
      secondCard.classList.remove("open", "show", "remove_click");
    }, 500);
    openCards = [];
  }

  // this will keep track of all the moves you make
  aMove();
}

/* ------ Check to see if the game is over ------ */
function gameOver() {
  if (sameCards.length === cardDeck.length) {
    clearInterval(timer);
    openModal();
  }
}

/* ------ Adds a move to the counter ------ */
const moveCounter = document.querySelector(".moves");
let moves = 0;
moveCounter.innerHTML = 0;
function aMove() {
  moves++;
  moveCounter.innerHTML = moves;

  score();
}

/* ------ Toggle the rating of the stars for the user ------ */
const starClass = document.querySelector(".stars");
starClass.innerHTML =
  '<li><i class = "fa fa-star"></i></li><li><i class = "fa fa-star"></i></li></li><li><i class = "fa fa-star"></i></li>';
function score() {
  if (moves >= 10 && moves <= 18) {
    starClass.innerHTML =
      '<li><i class = "fa fa-star"></i></li><li><i class = "fa fa-star"></i></li>';
  } else if (moves >= 19 && moves <= 25) {
    starClass.innerHTML = '<li><i class = "fa fa-star"></i></li>';
  } else if (moves > 26) {
    starClass.innerHTML = '<li<i class = "fa fa-star"></i></li>';
  } else {
  }
}

/* ------ Starting a New Game ------ */

const newGame = document.querySelector(".restart");

newGame.addEventListener("click", startNewGame);

function startNewGame(){
    //delete all the cards
  cardsContainer.innerHTML = "";

  //call start to reset the board
    shuffle(cardDeck);
    resetTimer();
    start();

  

  //reset any related variables
  sameCards = [];
  openCards = [];
  moves = 0;

  moveCounter.innerHTML = moves;
  starClass.innerHTML =
    '<li><i class = "fa fa-star"></i></li><li><i class = "fa fa-star"></i></li><li><i class = "fa fa-star"></i></li>';
}

/* ------ These are the variables for the modal ------- */
const modal = document.querySelector("#simpleModal");

  /* ------ This is commented out for game reasons. ------ */
/* const modalBtn = document.querySelector("#modalBtn"); */

const closeBtn = document.querySelector(".closeBtn");

const displayModal = document.querySelector(".modalStruct");

const showMove = document.querySelector(".mtracker");

const MinuteClock = document.querySelector(".minuteclock");

const secondClock = document.querySelector(".secondclock");

/* ------ This is commented out for game reasons ------ */
/* modalBtn.addEventListener("click", openModal); */

closeBtn.addEventListener("click", closeModal);

window.addEventListener("click", outsideClick);

/* ------ This is the function to open the modal after all the cards are matched ------ */
function openModal() {
  displayModal.innerHTML =
    'You have completed the game with <li class = "fa fa-star"></li><li class = "fa fa-star"></li><li class = "fa fa-star"></li>';
  if (moves >= 10 && moves <= 18) {
    displayModal.innerHTML =
      'Star rating = <li class = "fa fa-star"></li><li class = "fa fa-star"></li>';
  }
  if (moves >= 19 && moves <= 25) {
    displayModal.innerHTML =
      'Star rating = <li class = "fa fa-star"></li>';
  }
  if (moves > 26) {
    displayModal.innerHTML = 'Star rating = <li class = "fa fa-star"></li>';
  }
  let seconds = time / 1000;
  showMove.innerHTML = "It took you " + moves + " moves to complete the game";
  
  secondClock.innerHTML = "you have completed the game in " + `${seconds >= 60 ? parseInt(seconds / 60) : '0'}` + " minute &amp; " + `${seconds % 60 === 0 ? '0' : seconds % 60}` + " seconds";

  modal.style.display = "block";
  
}
/* ------ This function is used to close the modal ; the button is called new game ------ */
function closeModal() {
  modal.style.display = "none";
}

/* ------ I added this to my code.  In the upper left had conner of the screen you will see a click me button.  I used it to test the modal. ------  */
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}


const reload = document.querySelector(".closeBtn");

/* ------ This click event listener is set up for the new game button in the modal.
It will reset the time, stars, and moves.  Along with that it also shuffles the deck and starts the game. ------ */

reload.addEventListener("click", function() {
    
  moves = 0;
  moveCounter.innerHTML = 0;
  starClass.innerHTML =
    '<li><i class = "fa fa-star"></i></li><li><i class = "fa fa-star"></i></li></li><li><i class = "fa fa-star"></i></li>';
    startNewGame();
});

/* ------ Starting the game ------ */

start();


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

