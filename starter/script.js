'use strict';

// selecting elements
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const score0El = document.getElementById(`score--0`);
const score1El = document.getElementById(`score--1`);
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);

const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

let scores, currentScore, activePlayer, playing;

newGame();

////////////////////////
//functions
////////////////////////

//new game function
function newGame() {
  //sets total scores to zero
  scores = [0, 0];
  score0El.textContent = scores[0];
  score1El.textContent = scores[1];
  //calls function that hides dice
  addDiceHidden();
  //sets current scores to zero
  currentScore = 0;
  current0El.textContent = currentScore;
  current1El.textContent = currentScore;
  //clears dark background of winner
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  //adds normal white background of active player
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
  //makes player 1 the first player in new game
  activePlayer = 0;
  //sets game back in motion
  playing = true;
}

//function that switches player
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);

  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
}

//makes dice disappear
function addDiceHidden() {
  diceEl.classList.add(`hidden`);
}

//makes dice appear
function removeDiceHidden() {
  diceEl.classList.remove(`hidden`);
}

////////////////////
//buttons w/ functions
////////////////////

//roll dice click function
btnRoll.addEventListener(`click`, function () {
  if (playing) {
    //1. Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2. diplay the dice
    removeDiceHidden();
    diceEl.src = `dice-${dice}.png`;

    //3. check for a rolled one; if true, switch to next player
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

//Hold button click function
btnHold.addEventListener(`click`, function () {
  if (playing) {
    //1. add current score to active players score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. check if players score is >= 100
    if (scores[activePlayer] >= 100) {
      // 2A. if so, finish game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
      addDiceHidden();
    } else {
      //2B. or switch to next player
      switchPlayer();
      addDiceHidden();
    }
  }
});

//new game click function
btnNew.addEventListener(`click`, function () {
  newGame();
});
