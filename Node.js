// Node class - represents one cell in the grid
// Each node tracks its position, type (start/end/wall), and state (visited/distance)

class Node {
  constructor(column, row, nodeSize, isStart, isFinish, isWall, grid) {
    this.grid = grid;
    this.column = column;
    this.row = row;
    this.nodeSize = nodeSize;

    this.isStart = isStart;
    this.isFinish = isFinish;
    this.isWall = isWall;

    this.neighbours = [];
    this.previousNode = null; // Used to reconstruct the path
    this.isVisited = false;
    this.distance = Infinity; // Used in Dijkstra and A*
  }

  // Return the color based on node type
  getColour() {
    if (this.isStart) return "rgb(133, 101, 208)"; // Purple
    if (this.isFinish) return "rgb(255, 69, 0)"; // Orange
    if (this.isWall) return "#000000"; // Black
    if (this.isVisited) return "#D0F5FC"; // Light blue
    return "#ffd31d"; // Yellow for empty cells
  }

  // Draw this node on the canvas
  draw() {
    if (this.isStart || this.isFinish || this.isWall) {
      ctx.fillStyle = this.getColour();
      ctx.fillRect(
        this.column * nodeSize,
        this.row * nodeSize,
        nodeSize,
        nodeSize
      );
    } else if (this.isVisited) {
      ctx.fillStyle = this.getColour();
      ctx.fillRect(
        this.column * nodeSize,
        this.row * nodeSize,
        nodeSize,
        nodeSize
      );
    } else {
      // Draw grid lines for empty cells
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#000000";
      ctx.strokeRect(
        this.column * nodeSize,
        this.row * nodeSize,
        nodeSize,
        nodeSize
      );
    }
  }

  // Get the neighbors (cached on first call)
  getNeighbours() {
    if (this.neighbours.length == 0) {
      this.populateNeighbours();
    }
    return this.neighbours;
  }

  // Find all adjacent cells (up, down, left, right)
  populateNeighbours() {
    // Top
    if (this.column > 0 && this.grid[this.column - 1][this.row]) {
      this.neighbours.push(this.grid[this.column - 1][this.row]);
    }
    // Bottom
    if (this.column < this.grid.length - 1 && this.grid[this.column + 1][this.row]) {
      this.neighbours.push(this.grid[this.column + 1][this.row]);
    }
    // Left
    if (this.grid[this.column][this.row - 1]) {
      this.neighbours.push(this.grid[this.column][this.row - 1]);
    }
    // Right
    if (this.grid[this.column][this.row + 1]) {
      this.neighbours.push(this.grid[this.column][this.row + 1]);
    }
  }

  // Toggle wall on/off (called when user clicks)
  clicked() {
    this.isWall = !this.isWall;
  }
}
