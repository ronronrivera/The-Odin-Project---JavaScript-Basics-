const container = document.getElementById("container");
const CONTAINER_SIZE = 512; // matches the width/height set in CSS

// Build a square grid of size x size cells inside the container.
function createGrid(size) {
  container.innerHTML = ""; // clear any existing grid

  const cellSize = CONTAINER_SIZE / size;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.style.width = `${cellSize}px`;
    cell.style.height = `${cellSize}px`;

    // Color the cell when the mouse passes over it.
    cell.addEventListener("mouseover", () => {
      cell.classList.add("filled");
    });

    container.appendChild(cell);
  }
}

// Ask the user for a new grid size, then rebuild the grid.
function promptNewGrid() {
  let size = prompt("Enter the number of squares per side (max 100):", "16");

  if (size === null) return; // user cancelled

  size = Number(size);

  if (!Number.isInteger(size) || size < 1 || size > 100) {
    alert("Please enter a whole number between 1 and 100.");
    return;
  }

  createGrid(size);
}

// Remove the color from every cell without rebuilding the grid.
function clearGrid() {
  const cells = container.querySelectorAll(".cell");
  cells.forEach((cell) => cell.classList.remove("filled"));
}

document.getElementById("newGrid").addEventListener("click", promptNewGrid);
document.getElementById("clearGrid").addEventListener("click", clearGrid);

// Start with a default 16 x 16 grid.
createGrid(16);
