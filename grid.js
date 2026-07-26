// Grid class - manages the 2D array of nodes
// Handles creating, drawing, resetting, and updating the grid

class Grid {
  constructor(columns, rows, nodeSize) {
    this.columns = columns;
    this.rows = rows;
    this.nodeSize = nodeSize;
    this.grid = [];
  }

  // Create all the nodes in the grid
  // Positions start and end nodes to be proportional to grid size
  createGrid() {
    for (let i = 0; i < this.columns; i++) {
      this.grid[i] = [];
    }

    let startColumn = round(columns / 10);
    let startRow = round(rows / 2) - 1;
    let finishColumn = round(columns - columns / 10);
    let finishRow = round(rows / 2) + 2;

    for (let column = 0; column < this.columns; column++) {
      for (let row = 0; row < this.rows; row++) {
        var isStart = (column == startColumn && row == startRow);
        var isFinish = (column == finishColumn && row == finishRow);
        
        this.grid[column][row] = new Node(
          column,
          row,
          this.nodeSize,
          isStart,
          isFinish,
          false,
          this.grid
        );
      }
    }
  }

  // Draw all nodes to canvas
  drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let column = 0; column < this.columns; column++) {
      for (let row = 0; row < this.rows; row++) {
        this.grid[column][row].draw();
      }
    }
  }

  // Handle mouse dragging to move nodes or create walls
  updateGrid() {
    if (mouse.down == true) {
      if (this.grid[changeX][changeY].isStart == true) {
        this.grid[changeX][changeY].isStart = false;
        this.grid[mouse.x][mouse.y].isStart = true;
      } else if (this.grid[changeX][changeY].isFinish == true) {
        this.grid[changeX][changeY].isFinish = false;
        this.grid[mouse.x][mouse.y].isFinish = true;
      } else if (mouse.x !== changeX || mouse.y !== changeY) {
        this.grid[mouse.x][mouse.y].clicked();
      }
      this.drawGrid();
    }
  }

  // Find the start node (purple)
  getStartNode() {
    for (let i = 0; i < this.grid.length - 1; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        let node = this.grid[i][j];
        if (node.isStart == true) {
          return node;
        }
      }
    }
  }

  // Find the finish node (orange)
  getFinishNode() {
    for (let i = 0; i < this.grid.length - 1; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        let node = this.grid[i][j];
        if (node.isFinish == true) {
          return node;
        }
      }
    }
  }

  // Set the start node's initial distance
  setStartNodeDistance(distance) {
    this.getStartNode().distance = distance;
  }

  // Clear all visited/distance state so we can run a new algorithm
  // This keeps the walls and start/end positions but resets the search state
  resetGrid() {
    for (let column = 0; column < this.columns; column++) {
      for (let row = 0; row < this.rows; row++) {
        this.grid[column][row].neighbours = [];
        this.grid[column][row].previousNode = null;
        this.grid[column][row].isVisited = false;
        this.grid[column][row].distance = Infinity;
      }
    }
  }
}
