"use strict";

(function() {
	const rows = 9;
	const cols = 9;
	const board = document.getElementById("sudoku");
	const solveBtn = document.getElementById("solve");
	const solution = document.getElementById("solution");
	const copiedBoard = [];

	const possible = function(y, x, n) {
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

	const copy = () => {
		for (let y = 0; y < rows; y++) {
			for (let x = 0; x < cols; x++) {
				copiedBoard[y][x] = document.getElementById("s" + y + x).value;
			}
		}
	solve();
	};

	const solve = function() {
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
				document.getElementById("a" + y + x).innerHTML = copiedBoard[y][x];
			}
		}
	};
	solveBtn.addEventListener("click", copy);

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
			entry.type = "number";
			entry.maxLength = 1;
		}
	}


})();
