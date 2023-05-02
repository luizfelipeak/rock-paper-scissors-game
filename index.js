const score = document.getElementById("score-point");
const localScore = localStorage.getItem("score");

// ----- Verifying player's score -----
if(localScore != undefined) {
  score.innerHTML = localScore;
}

const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");

// ----- Open rules modal -----
rulesBtn.addEventListener("click", () => {
  rulesBtn.setAttribute("disabled", "true");
  rulesBtn.classList.add("disabled");
  rulesBtn.setAttribute("aria-expanded", "true");
  rules.setAttribute("data-state", "opening");
  
  setTimeout(() => {
    rules.setAttribute("data-state", "opened");
    closeBtn.focus();
  }, 360);
});

// ----- Close rules modal -----
closeBtn.addEventListener("click", () => {
  rulesBtn.removeAttribute("disabled");
  rulesBtn.classList.remove("disabled");
  rulesBtn.setAttribute("aria-expanded", "false");
  rules.setAttribute("data-state", "closing");
  
  setTimeout(() => {
    rules.setAttribute("data-state", "closed");
    rulesBtn.focus();
  }, 360);
});

const scorePoint = document.getElementById("score-point");
const triangle = document.getElementById("triangle");
const paperBtn = document.getElementById("paper-btn");
const paperContainer = document.getElementsByClassName("container__main__game__paper")[0];
const scissorsBtn = document.getElementById("scissors-btn");
const scissorsContainer = document.getElementsByClassName("container__main__game__scissors")[0];
const rockBtn = document.getElementById("rock-btn");
const rockContainer = document.getElementsByClassName("container__main__game__rock")[0];
const picked = document.getElementById("picked");
const house = document.getElementById("house");
const won = document.getElementById("won");
const lost = document.getElementById("lost");
const playAgain = document.getElementById("play-btn");

const choices = ['paper', 'scissors', 'rock'];
let houseChoice, playerChoice;

// ----- Player picked paper -----
paperBtn.addEventListener("click", () => {
  playerChoice = choices[0];
  paperBtn.setAttribute("disabled", "true");
  paperBtn.style.cursor = "revert";
  result(paperContainer, 'left', playerChoice, choices[1], choices[2]);
});

// ----- Player picked scissors -----
scissorsBtn.addEventListener("click", () => {
  playerChoice = choices[1];
  scissorsBtn.setAttribute("disabled", "true");
  scissorsBtn.style.cursor = "revert";
  result(scissorsContainer, 'right', playerChoice, choices[0], choices[2]);
});

// ----- Player picked rock -----
rockBtn.addEventListener("click", () => {
  playerChoice = choices[2];
  rockBtn.setAttribute("disabled", "true");
  rockBtn.style.cursor = "revert";
  result(rockContainer, 'bottom', playerChoice, choices[0], choices[1]);
});

// ----- Event to play again -----
playAgain.addEventListener("click", () => {
  resetGame(houseChoice);
});

// ----- Animation of elements -----
function result(container, position, playerChoice, choice1, choice2) {
  container.classList.add("animate");
  
  hideContainer(paperContainer);
  hideContainer(scissorsContainer);
  hideContainer(rockContainer);
  
  triangle.classList.add("hiding");
  
  container.classList.remove("animate");
  showContainer(picked);

  setTimeout(() => {
    container.classList.remove(position);
    container.classList.add("score__left");
    container.classList.add("result");
    
    setTimeout(() => {
      showContainer(container);
      
      setTimeout(() => {
        showContainer(house);

        setTimeout(() => {
          houseChoose(playerChoice, choice1, choice2);
        }, 500);
      }, 350);
    }, 500);
  }, 350);
}

// ----- Generate result of the game -----
function houseChoose(playerChoice, choice1, choice2) {
  houseChoice = [choice1, choice2][Math.round(Math.random())];

  switch(playerChoice) {
    case 'paper':
      if(houseChoice === 'scissors') {
        scissorsContainer.classList.remove("right");
        scissorsContainer.classList.add("score__right");
        scissorsContainer.classList.add("result");

        scissorsBtn.setAttribute("disabled", "true");
        scissorsBtn.style.cursor = "revert";
        showContainer(scissorsContainer);

        setTimeout(() => {
          showContainer(lost);
          house.classList.add("won");
          showContainer(playAgain);
          setTimeout(() => {
            playAgain.focus();
          }, 500);
        }, 750);
      }
      else if(houseChoice === 'rock') {
        rockContainer.classList.remove("bottom");
        rockContainer.classList.add("score__right");
        rockContainer.classList.add("result");

        rockBtn.setAttribute("disabled", "true");
        rockBtn.style.cursor = "revert";
        showContainer(rockContainer);

        setTimeout(() => {
          showContainer(won);
          picked.classList.add("won");

          score.innerHTML = parseInt(score.innerHTML) + 1;
          localStorage.setItem("score", score.innerHTML);
          showContainer(playAgain);
          setTimeout(() => {
            playAgain.focus();
          }, 500);
        },750);
      }
      break;
    case 'scissors':
      if(houseChoice === 'paper') {
        paperContainer.classList.remove("left");
        paperContainer.classList.add("score__right");
        paperContainer.classList.add("result");

        paperBtn.setAttribute("disabled", "true");
        paperBtn.style.cursor = "revert";
        showContainer(paperContainer);

        setTimeout(() => {
          showContainer(won);
          picked.classList.add("won");

          score.innerHTML = parseInt(score.innerHTML) + 1;
          localStorage.setItem("score", score.innerHTML);
          showContainer(playAgain);
          setTimeout(() => {
            playAgain.focus();
          }, 500);
        }, 750);
      }
      else if(houseChoice === 'rock') {
        rockContainer.classList.remove("bottom");
        rockContainer.classList.add("score__right");
        rockContainer.classList.add("result");

        rockBtn.setAttribute("disabled", "true");
        rockBtn.style.cursor = "revert";
        showContainer(rockContainer);

        setTimeout(() => {
          showContainer(lost);
          house.classList.add("won");
          showContainer(playAgain);
          setTimeout(() => {
            playAgain.focus();
          }, 500);
        },750);
      }
      break;
    case 'rock':
      if(houseChoice === 'paper') {
        paperContainer.classList.remove("left");
        paperContainer.classList.add("score__right");
        paperContainer.classList.add("result");

        paperBtn.setAttribute("disabled", "true");
        paperBtn.style.cursor = "revert";
        showContainer(paperContainer);

        setTimeout(() => {
          showContainer(lost);
          house.classList.add("won");
          showContainer(playAgain);
          setTimeout(() => {
            playAgain.focus();
          }, 500);
        }, 750);
      }
      else if(houseChoice === 'scissors') {
        scissorsContainer.classList.add("score__right");
        scissorsContainer.classList.add("result");

        scissorsBtn.setAttribute("disabled", "true");
        scissorsBtn.style.cursor = "revert";
        showContainer(scissorsContainer);

        setTimeout(() => {
          showContainer(won);
          picked.classList.add("won");

          score.innerHTML = parseInt(score.innerHTML) + 1;
          localStorage.setItem("score", score.innerHTML);
          showContainer(playAgain);
          setTimeout(() => {
            playAgain.focus();
          }, 500);
        }, 750);
      }
      break;
  }
}

// ----- Reset elements to play again -----
function resetGame(housechoice) {
  hideContainer(picked);
  hideContainer(house);
  hideContainer(lost);
  hideContainer(won);
  hideContainer(playAgain);
  hideContainer(paperContainer);
  hideContainer(scissorsContainer);
  hideContainer(rockContainer);

  picked.classList.remove("won");
  house.classList.remove("won");

  if(playerChoice === 'paper' || houseChoice === 'paper') {
    paperBtn.style.cursor = "pointer";
    paperBtn.removeAttribute("disabled");
    paperContainer.classList.remove("result");
    paperContainer.classList.remove("score__left");
    paperContainer.classList.remove("score__right");
    paperContainer.classList.remove("right");
    paperContainer.classList.add("left");
  }
  if(playerChoice === 'scissors' || houseChoice === 'scissors') {
    scissorsBtn.style.cursor = "pointer";
    scissorsBtn.removeAttribute("disabled");
    scissorsContainer.classList.remove("result");
    scissorsContainer.classList.remove("score__left");
    scissorsContainer.classList.remove("score__right");
    scissorsContainer.classList.remove("right");
    scissorsContainer.classList.remove("left");
    scissorsContainer.classList.add("right");
  }
  if(playerChoice === 'rock' || houseChoice === 'rock') {
    rockBtn.style.cursor = "pointer";
    rockBtn.removeAttribute("disabled");
    rockContainer.classList.remove("result");
    rockContainer.classList.remove("score__left");
    rockContainer.classList.remove("score__right");
    rockContainer.classList.remove("left");
    rockContainer.classList.remove("right");
    rockContainer.classList.add("bottom");
  }
  
  showContainer(triangle);
  showContainer(paperContainer);
  showContainer(scissorsContainer);
  showContainer(rockContainer);
  setTimeout(() => {
    paperBtn.focus();
  }, 500);
}

// ----- Animation to hide element -----
function hideContainer(container) {
  container.classList.remove("showing");
  container.classList.add("hiding");

  setTimeout(() => {
    container.classList.remove("hiding");
    container.classList.add("hide");
  },500);
}

// ----- Animation to show element -----
function showContainer(container) {
  setTimeout(() => {
    container.classList.remove("hiding");
    container.classList.remove("hide");
    container.classList.add("showing");
  },500);
}