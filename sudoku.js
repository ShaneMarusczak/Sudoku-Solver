"use strict";

(function () {
	let endTime;
	const rows = 9;
	const cols = 9;
	const board = document.getElementById("sudoku");
	const solveBtn = document.getElementById("solve");
	const solution = document.getElementById("solution");
	const copiedBoard = [];

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
		}
	}

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
		var rv = true;
		const validValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ""];
		for (let y = 0; y < rows; y++) {
			for (let x = 0; x < cols; x++) {
				document.getElementById("s" + y + x).style.backgroundColor = "aliceblue";
				if (!validValues.includes(document.getElementById("s" + y + x).value)) {
					document.getElementById("s" + y + x).style.backgroundColor = "red";
					rv = false;
				}
			}
		}
		return rv;
	};

	const timeOutHandler = () => {
		document.getElementById("timeoutmessage").classList.remove("hide");
		document.getElementById("timeoutmessage").classList.add("show");
		for (let y = 0; y < rows; y++) {
			for (let x = 0; x < cols; x++) {
				document.getElementById("a" + y + x).value = "";
			}
		}
	};

	const solve = () => {
		if (Date.now() > endTime) {
			timeOutHandler();
			return;
		}
		for (let y = 0; y < rows; y++) {
			for (let x = 0; x < cols; x++) {
				if (copiedBoard[y][x] == "") {
					for (let n = 1; n < 10; n++) {
						if (possible(y, x, n)) {
							copiedBoard[y][x] = n;
							document.getElementById("a" + y + x).style.color = "red";
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

	solveBtn.addEventListener("click", () => {
		endTime = Date.now() + 6000;
		document.getElementById("timeoutmessage").classList.remove("show");
		document.getElementById("timeoutmessage").classList.add("hide");
		main();
	});
})();
