document.querySelector('.js-reset-score').addEventListener('click', () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
})



let score = JSON.parse(localStorage.getItem("score")) || {
        wins: 0,
        losses: 0,
        ties: 0,
      };

      updateScoreElement();


      let isAutoPlaying = false;
      let intervalId;


document.querySelector('.auto-play-button').addEventListener('click', () => {
  autoPlay();
})


      function autoPlay(){
        if (!isAutoPlaying){

          intervalId = setInterval(() =>{
          playGame(pickComputerMove());

        }, 1500);
      isAutoPlaying = true;
      }
      else{
        clearInterval(intervalId);
        isAutoPlaying = false;
      }
      }



document.querySelector('.js-rock-button').addEventListener('click' , () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('scissors');
  });

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('rock');
  }
  else if(event.key === 'p'){
    playGame('paper');
  }
  else if(event.key === 's'){
    playGame('scissors');
  }
  });





      function playGame(playerMove) {
        const computerMove = pickComputerMove();

        let result = "";

        if (playerMove === "scissors") {
          if (computerMove === "rock") {
            result = "You Lose.";
          } else if (computerMove === "paper") {
            result = "You Win.";
          } else if (computerMove === "scissors") {
            result = "Tie.";
          }
        } else if (playerMove === "paper") {
          if (computerMove === "rock") {
            result = "You Win.";
          } else if (computerMove === "paper") {
            result = "Tie.";
          } else if (computerMove === "scissors") {
            result = "You Lose.";
          }
        } else if (playerMove === "rock") {
          if (computerMove === "rock") {
            result = "Tie.";
          } else if (computerMove === "paper") {
            result = "You Lose.";
          } else if (computerMove === "scissors") {
            result = "You Win.";
          }
        }
        document.querySelector(".result").innerHTML = `${result}`;
        document.querySelector(".moves").innerHTML = `  You
      <img src="images/${playerMove}.png" class="move-icon">
      <img src="images/${computerMove}.png" class="move-icon">
      Computer`;

        if (result === "You Win.") {
          score.wins += 1;
        } else if (result === "You Lose.") {
          score.losses += 1;
        } else if (result === "Tie.") {
          score.ties += 1;
        }
        console.log(score);

        localStorage.setItem("score", JSON.stringify(score));
        updateScoreElement();
      }

      function updateScoreElement() {
        document.querySelector(
          ".game-score"
        ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
      }

      function pickComputerMove() {
        const randomNumber = Math.random();
        let computerMove = "";

        if (randomNumber >= 0 && randomNumber < 1 / 3) {
          computerMove = "rock";
        } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
          computerMove = "paper";
        } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
          computerMove = "scissors";
        }

        return computerMove;
      }