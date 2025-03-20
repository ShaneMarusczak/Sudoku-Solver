# Sudoku Solver

Sudoku Solver is a lightweight web-based application built with HTML, CSS, and JavaScript that solves Sudoku puzzles. The app offers an interactive grid where users can input puzzles, generate random boards, solve the puzzle using backtracking algorithms, and clear entries or solutions. Designed for simplicity and ease-of-use, it provides a fun way to engage with Sudoku puzzles directly in your web browser.

---

## Installation

1. Download or clone the repository:
   • Git:  
     git clone https://github.com/ShaneMarusczak/Sudoku-Solver.git

2. Navigate to the `Sudoku-Solver` directory.

3. Open `index.html` in your favorite web browser. No additional dependencies or build steps are required.

---

## Usage Guide

- **Entering Values**:  
  In the “Enter Values Here” grid, input the starting numbers of your Sudoku puzzle. Invalid entries (non-numeric or out-of-range values) will be highlighted in red.

- **Solving the Puzzle**:  
  Click the **Solve Puzzle** button to run the solver. If the puzzle is valid, the solution will appear in the “Solution” grid.

- **Clearing the Board**:  
  • Use **Clear Entries** to reset the input grid.  
  • Use **Clear Solution** to clear the solution grid.

- **Generating a Random Puzzle**:  
  Click the **Generate Random** button to populate a few cells randomly and attempt to solve the puzzle, showcasing how the algorithm works.

---

## File and Structure Overview

- **index.html**  
  The main HTML file that structures the web page, loads external fonts and icons, and references the CSS and JavaScript files.

- **css/**  
  • `style.css`: Primary stylesheet containing layout and design rules.  
  • `style.min.css`: Minified version of the CSS for optimized performance.

- **js/**  
  • `sudoku.js`: Unminified JavaScript implementing the Sudoku solving logic with helper functions, validation, and UI manipulation.  
  • `sudoku.min.js`: Minified version of the solver for production use.

- **LICENSE.md**  
  The licensing file declaring the software is in the public domain via the Unlicense.

- **Images and Manifest Files**  
  Local image assets (like `house-icon.png` and `github-icon.png`), favicon files, and the `site.webmanifest` contribute to the project’s visual and manifest configuration.

---

## Configuration Details

- The app relies on Google Fonts loaded via `<link>` tags in the HTML header (specifically "Roboto Mono" and "Roboto").
- CSS styling is defined in two versions, allowing for both development (`style.css`) and production (`style.min.css`) environments.
- The JavaScript files include two algorithm implementations (minified and unminified) of the Sudoku solver logic.
- Timeout settings for the solver are hardcoded (set to a 3-second limit) to avoid endless computation on unsolvable puzzles.

---

## Contribution Guidelines

Contributions to Sudoku Solver are welcome. If you have suggestions or improvements:
- Fork the repository.
- Create a new branch for your feature or bug fix.
- Submit a pull request with a clear description of your changes.

For more detailed instructions on contributing, please refer to a potential `CONTRIBUTING.md` file if it becomes available.

---

## License

This project is released into the public domain. See [LICENSE.md](./LICENSE.md) for details.

---

Enjoy solving puzzles and happy coding!
