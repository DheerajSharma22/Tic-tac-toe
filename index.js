const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".gameInfo");
const newGameBtn = document.getElementById("newGameBtn");

let currentPlayer;
let gameGrid;
let winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Initialize the game.
function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  gameInfo.textContent = `Current Player - ${currentPlayer}`;
  newGameBtn.classList.remove("active");

  Array.from(boxes).forEach((box, index) => {
    box.classList = `box box${index + 1}`;
    box.textContent = "";
    box.style.pointerEvents = "auto";
  });
}

initGame();

// Swap Turn.
function swapTurn() {
  if (currentPlayer == "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }

  gameInfo.textContent = `Current Player - ${currentPlayer}`;
}

function gameOver() {
  let answer = "";

  winningPositions.forEach((position, index) => {
    if (
      (gameGrid[position[0]] != "" ||
        gameGrid[position[1]] != "" ||
        gameGrid[position[2]] != "") &&
      gameGrid[position[0]] == gameGrid[position[1]] &&
      gameGrid[position[1]] == gameGrid[position[2]]
    ) {
      if (gameGrid[position[0]] == "X") {
        answer = "X";
      } else {
        answer = "O";
      }

      Array.from(boxes).forEach((btn) => {
        btn.style.pointerEvents = "none";
      });

      // set bg green
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  if (answer != "") {
    gameInfo.textContent = `Winner is - ${answer}`;
    newGameBtn.classList.add("active");
    return;
  }

  // Game Tie Condition.
  let countFilled = 0;
  gameGrid.forEach((grid) => {
    if (grid != "") countFilled++;
  });

  if (countFilled == 9) {
    gameInfo.textContent = `Game tied.`;
    newGameBtn.classList.add("active");
    return;
  }
}

function handleClick(index) {
  if (gameGrid[index] == "") {
    boxes[index].textContent = currentPlayer;
    gameGrid[index] = currentPlayer;
    swapTurn();
    gameOver();
  }
}

//
Array.from(boxes).forEach((box, index) => {
  box.addEventListener("click", (e) => {
    handleClick(index);
  });
});

// Handling new game btn event
newGameBtn.addEventListener("click", initGame);
