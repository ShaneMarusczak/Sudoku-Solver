"use strict";

(() => {
  //#region variables
  let endTime;
  const rows = 9;
  const cols = 9;
  const board = document.getElementById("sudoku");
  const solveBtn = document.getElementById("solve");
  const resetSolutionBtn = document.getElementById("resetSolution");
  const resetEntryBtn = document.getElementById("resetEntries");
  const solution = document.getElementById("solution");
  const generate = document.getElementById("generate");
  const copiedBoard = [];
  let timedOut = false;
  let solved = false;
  //#endregion

  //#region functions

  //inclusive
  const randomIntFromInterval = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const main = () => {
    if (validate()) {
      document.getElementById("invalidmessage").classList.add("hide");
      document.getElementById("invalidmessage").classList.remove("show");
    } else {
      document.getElementById("invalidmessage").classList.remove("hide");
      document.getElementById("invalidmessage").classList.add("show");
      return;
    }
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        copiedBoard[y][x] = document.getElementById("s" + y + x).value;
      }
    }
    solve();
  };

  const validate = () => {
    let counter = 0;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (document.getElementById("s" + y + x).value !== "") {
          counter++;
        }
      }
    }
    if (counter === 0) {
      return false;
    }
    var rv = true;
    const validValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ""];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        document.getElementById("s" + y + x).style.backgroundColor =
          "aliceblue";
        if (!validValues.includes(document.getElementById("s" + y + x).value)) {
          document.getElementById("s" + y + x).style.backgroundColor = "red";
          rv = false;
        }
      }
    }
    return rv;
  };

  const timeOutHandler = () => {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        document.getElementById("a" + y + x).value = "";
      }
    }
    if (confirm("No solution was found in time. Clear entries and retry?")) {
      alert("Page will Reload.");
      setInterval(() => location.reload(), 1000);
    } else {
      return;
    }
  };

  const solve = () => {
    if (timedOut || solved) {
      return;
    }
    if (Date.now() > endTime) {
      timedOut = true;
      timeOutHandler();
      return;
    }
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (copiedBoard[y][x] == "") {
          for (let n = 1; n < 10; n++) {
            if (possible(y, x, n)) {
              copiedBoard[y][x] = n;
              solve();
              copiedBoard[y][x] = "";
            }
          }
          return;
        }
      }
    }
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        document.getElementById("a" + y + x).value = copiedBoard[y][x];
      }
    }
    solved = true;
  };

  const possible = (y, x, n) => {
    for (let i = 0; i < 9; i++) {
      if (copiedBoard[y][i] == n) {
        return false;
      }
    }
    for (let i = 0; i < 9; i++) {
      if (copiedBoard[i][x] == n) {
        return false;
      }
    }
    const x0 = Math.floor(x / 3) * 3;
    const y0 = Math.floor(y / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (copiedBoard[y0 + i][x0 + j] == n) {
          return false;
        }
      }
    }
    return true;
  };

  const clearEntries = () => {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        document.getElementById("s" + y + x).value = "";
        copiedBoard[x][y] = "";
      }
    }
  };

  const clearAnswers = () => {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        document.getElementById("a" + y + x).value = "";
        document.getElementById("a" + y + x).style.color = "black";
        copiedBoard[x][y] = "";
      }
    }
  };

  const generateRandomBoard = () => {
    copiedBoard[0][0] = randomIntFromInterval(1, 9);
    copiedBoard[1][7] = randomIntFromInterval(1, 9);
    copiedBoard[2][4] = randomIntFromInterval(1, 9);
    copiedBoard[3][3] = randomIntFromInterval(1, 9);
    copiedBoard[4][1] = randomIntFromInterval(1, 9);
    copiedBoard[5][8] = randomIntFromInterval(1, 9);
    copiedBoard[6][6] = randomIntFromInterval(1, 9);
    copiedBoard[7][2] = randomIntFromInterval(1, 9);
    copiedBoard[8][5] = randomIntFromInterval(1, 9);
    solve();
  };
  //#endregion

  //#region event listeners
  generate.addEventListener("click", () => {
    clearAnswers();
    clearEntries();
    timedOut = false;
    solved = false;
    endTime = Date.now() + 3000;
    generateRandomBoard();
  });

  resetSolutionBtn.addEventListener("click", () => {
    timedOut = false;
    solved = false;
    clearAnswers();
  });

  resetEntryBtn.addEventListener("click", () => {
    timedOut = false;
    solved = false;
    clearEntries();
  });

  solveBtn.addEventListener("click", () => {
    timedOut = false;
    endTime = Date.now() + 3000;
    main();
  });
  //#endregion

  //#region page setup
  for (let i = 0; i < rows; i++) {
    copiedBoard.push([]);
    const entryRow = document.createElement("div");
    const solutionRow = document.createElement("div");
    board.appendChild(entryRow);
    solution.appendChild(solutionRow);
    for (let j = 0; j < cols; j++) {
      const entry = document.createElement("input");
      const ans = document.createElement("input");
      solutionRow.appendChild(ans);
      entryRow.appendChild(entry);
      entry.id = "s" + i + j;
      ans.id = "a" + i + j;
      ans.readOnly = true;
      if (j === 2 || j === 5) {
        entry.classList.add("rightBorder");
        ans.classList.add("rightBorder");
      }
      if (i === 2 || i === 5) {
        entry.classList.add("bottomBorder");
        ans.classList.add("bottomBorder");
      }
    }
  }
  //#endregion
})();
