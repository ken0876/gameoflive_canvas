let grid = [];
let cells;
let rows;
let canvasContext;
let input;
let random;

let fps = 30;
let size = 15;

window.onload = init;

function init() {
  document.body.style.margin = "0";
  document.documentElement.style.overflow = "hidden";

  let canvas = document.createElement("canvas");
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  canvas.style.margin = "auto";
  canvas.style.display = "block";
  document.body.append(canvas);
  canvasContext = canvas.getContext("2d");
  cells = Math.floor(window.innerWidth / size);
  rows = Math.floor(window.innerHeight / size);

  for (let i = 0; i < cells; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      random = Math.floor(Math.random() * 10) > 8 ? 1 : 0;
      grid[i][j] = random;
    }
  }
  setInterval(drawCanvas, 1000 / fps);
}

function drawCanvas() {
  canvasContext.clearRect(
    0,
    0,
    canvasContext.canvas.width,
    canvasContext.canvas.height
  );

  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j] == 1) {
        canvasContext.fillRect(i * size, j * size, size, size);
      }
    }
  }
  addRules();
}

function addRules() {
  let nextGrid = [];
  for (let i = 0; i < cells; i++) {
    nextGrid[i] = [];
  }

  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      const neighbors = countNeighbors(i, j);

      if (state == 0 && neighbors == 3) {
        nextGrid[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        nextGrid[i][j] = 0;
      } else {
        nextGrid[i][j] = state;
      }
    }
  }
  grid = nextGrid;
}

function countNeighbors(x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let cell = (x + i + cells) % cells;
      let row = (y + j + rows) % rows;
      sum += grid[cell][row];
    }
  }
  sum -= grid[x][y];

  return sum;
}
