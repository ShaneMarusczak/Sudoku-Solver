"use strict";

(function () {
	let endTime;
	const rows = 9;
	const cols = 9;
	const board = document.getElementById("sudoku");
	const solveBtn = document.getElementById("solve");
	const resetBtn = document.getElementById("reset");
	const solution = document.getElementById("solution");
	const copiedBoard = [];
	let timedOut = false;
	let solved = false;

	const mouseOverEntry = (e) => {
		e.currentTarget.classList.add("hovered");
	};

	const mouseLeaveEntry = (e) => {
		e.currentTarget.classList.remove("hovered");
	};

	for (let i = 0; i < rows; i++) {
		copiedBoard.push([]);
		const entryRow = document.createElement("div");
		const solutionRow = document.createElement("div");
		board.appendChild(entryRow);
		solution.appendChild(solutionRow);
		for (let j = 0; j < cols; j++) {
			const entry = document.createElement("input");
			entry.addEventListener("mouseover", mouseOverEntry);
			entry.addEventListener("mouseleave", mouseLeaveEntry);
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
		for (let y = 0; y < rows; y++) {
			for (let x = 0; x < cols; x++) {
				document.getElementById("a" + y + x).value = "";
			}
		}
		if (confirm("No solution was found in time. Clear entries and retry?")) {
			alert("Page will Reload.");
			setInterval(() => location.reload(), 2000);
		} else {
			timedOut = false;
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
							document.getElementById("a" + y + x).style.color = "red";
							solve();
							copiedBoard[y][x] = "";
						}
					}
					return;
				}
			}
		}
		let counter = 0;
		for (let y = 0; y < rows; y++) {
			for (let x = 0; x < cols; x++) {
				document.getElementById("a" + y + x).value = copiedBoard[y][x];
				if (document.getElementById("a" + y + x).value != "") {
					counter++;
				}
				if (counter === 81) {
					solved = true;
				}
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

	const clearAnswers = () => {
		for (let y = 0; y < rows; y++) {
			for (let x = 0; x < cols; x++) {
				document.getElementById("a" + y + x).value = "";
				document.getElementById("a" + y + x).style.color = "black";
			}
		}
	};

	resetBtn.addEventListener("click", () => {
		solved = false;
		clearAnswers();
	});

	solveBtn.addEventListener("click", () => {
		endTime = Date.now() + 6000;
		main();
	});
})();
