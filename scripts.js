// GLOBAL FUNCTIONS

function isPartOf(ref, arg) {
  return arg.every(function (element) {
    return ref.includes(element);
  });
}


// This function checks one array against another array
const checkArray = (arr, arr2) => {
  let result = [];
  for (let o = 0; o < arr.length; o++) {
    for (let i = 0; i < arr[o].length; i++) {
      // inner for loop checks score array
      // if wincodes(arr) array has value that is found in inner loop (arr2), grab it
      for (let s = 0; s < arr2.length; s++) {
        if (arr[o][i] === arr2[s]) {
          result.push(arr2[s]);
          if (isPartOf(result, arr[o])) {
            return true;
          }
        }
      }
    }
  }
};

// possible winning positions for game
const winCodes = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

// --- DOM ---

// Body
const body = document.querySelector("body");

// Title
const gameTitleH1 = document.createElement("h1");
gameTitleH1.className = "game-title";
gameTitleH1.textContent = "Tic Tac Toe";
body.append(gameTitleH1);

// Game Options Container
const gameOptionsDiv = document.createElement("div");
gameOptionsDiv.className = "game-options";

// Score Section
let xScore = [];
let oScore = [];

// VS Player Button
const tickToggle = () => {
  let tick = "O";
  return () => {
    if (tick == "O") {
      tick = "X";
    } else {
      tick = "O";
    }
    return tick;
  };
};
const toggle = tickToggle();

const selectedBox = (player1, player2) => {
  let selectedBoxes = Array.from(document.querySelectorAll(".game-board-box"));
  selectedBoxes.forEach((e) => {
    e.addEventListener("click", () => {
      // check to see if value is already there
      if (e.textContent == "X" || e.textContent == "O") {
        return;
      }
      if (gameOptionsDiv.textContent == `${player1} wins!` || gameOptionsDiv.textContent == `${player2} wins!`){
        return;
      } else {
        let letterSwap = toggle();
        let res = e.getAttribute("data-index-number");
        e.textContent = letterSwap;
        // push player response into an array
        if (e.textContent == "X") {
          // 'res' had to be converted from a string to a number for checkArray() to work
          xScore.push(parseInt(res));
          checkArray(winCodes, xScore);
          if (checkArray(winCodes, xScore) === true) {
            gameOptionsDiv.textContent = `${player1} wins!`;
            letterSwap = toggle();
          }
        } else {
          oScore.push(parseInt(res));
          checkArray(winCodes, oScore);
          if (checkArray(winCodes, oScore) === true) {
            gameOptionsDiv.textContent = `${player2} wins!`;
          }
        }
        if (
          oScore.length === 4 &&
          xScore.length === 5 &&
          !checkArray(winCodes, xScore)
        ) {
          gameOptionsDiv.textContent = `Draw!`;
        }
      }
    });
  });
};

let players = () => {
  let player1 = prompt("Enter Player X's name (X Goes First).");
  if (player1 === null) {
    return;
  }
  let player2 = prompt("Enter Player O's name.");
  if (player2 === null) {
    return;
  }
  return {player1, player2};
};

let playersObj = {};

const vsPlayerBtn = document.createElement("button");
vsPlayerBtn.type = "button";
vsPlayerBtn.className = "option-button";
vsPlayerBtn.textContent = "Versus Human";
vsPlayerBtn.addEventListener("click", () => {
  playersObj = players();
  if (playersObj === undefined) {
    return;
  }
  gameOptionsDiv.className = "game-status";
  gameOptionsDiv.textContent = `${playersObj.player1} vs. ${playersObj.player2}`;
  selectedBox(playersObj.player1, playersObj.player2);
  return playersObj;
});
gameOptionsDiv.append(vsPlayerBtn);

// VS Computer Button
const vsCpuBtn = document.createElement("button");
vsCpuBtn.className = "option-button";
vsCpuBtn.textContent = "Versus Computer";
gameOptionsDiv.append(vsCpuBtn);
body.append(gameOptionsDiv);

// Game Board Container
const gameBoardDiv = document.createElement("div");
gameBoardDiv.className = "game-board";
body.append(gameBoardDiv);

// Game Board Boxes
const GameBoardBox = (parent, i) => {
  const box = document.createElement("div");
  box.className = "game-board-box";
  box.dataset.indexNumber = i;
  return parent.append(box);
};

const gameBoard = () => {
  for (let j = 0; j < 9; j++) {
    GameBoardBox(gameBoardDiv, j);
  }
};
gameBoard();

// Restart Game Section
const restartGame = () => {
  xScore = [];
  oScore = [];
  checkArray(winCodes, xScore);
  checkArray(winCodes, oScore);
  let selectedBoxes = Array.from(document.querySelectorAll(".game-board-box"));
  selectedBoxes.forEach((e) => {
    e.textContent = "";
  });
  gameOptionsDiv.textContent = `${playersObj.player1} vs. ${playersObj.player2}`;
};

const restartBtn = document.createElement("button");
restartBtn.type = "button";
restartBtn.className = "option-button";
restartBtn.textContent = "Restart";
restartBtn.addEventListener("click", restartGame);
body.append(restartBtn);

// New Game Section
const newGame = () => {
  xScore = [];
  oScore = [];
  checkArray(winCodes, xScore);
  checkArray(winCodes, oScore);
  let selectedBoxes = Array.from(document.querySelectorAll(".game-board-box"));
  selectedBoxes.forEach((e) => {
    e.textContent = "";
  });
  gameOptionsDiv.textContent = "";
  gameOptionsDiv.className = "game-options";
  gameOptionsDiv.append(vsPlayerBtn);
  gameOptionsDiv.append(vsCpuBtn);
};

const newGameBtn = document.createElement("button");
newGameBtn.type = "button";
newGameBtn.className = "option-button";
newGameBtn.textContent = "New Game";
newGameBtn.addEventListener("click", newGame);
body.append(newGameBtn);





