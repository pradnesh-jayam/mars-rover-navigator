/**
 * Node Class - Represents a single grid cell in the pathfinding grid
 * 
 * Each node tracks:
 * - Position (column, row) in the grid
 * - Type (start, end, wall, or empty)
 * - Exploration state (visited)
 * - Distance from start (for weighted algorithms)
 * - Neighbors for adjacency tracking
 * - Previous node for path reconstruction
 * 
 * Uses canvas-based rendering for real-time visualization
 */
class Node {
  /**
   * Initialize a grid node
   * @param {number} column - X coordinate in grid
   * @param {number} row - Y coordinate in grid
   * @param {number} nodeSize - Pixel dimensions of node
   * @param {boolean} isStart - Whether this is the start node (purple)
   * @param {boolean} isFinish - Whether this is the finish node (orange)
   * @param {boolean} isWall - Whether this is a wall/obstacle (black)
   * @param {Array} grid - Reference to parent grid for neighbor lookup
   */
  constructor(column, row, nodeSize, isStart, isFinish, isWall, grid) {
    this.grid = grid;

    // Position properties
    this.column = column;
    this.row = row;
    this.nodeSize = nodeSize;

    // Node type flags
    this.isStart = isStart;
    this.isFinish = isFinish;
    this.isWall = isWall;

    // Pathfinding state
    this.neighbours = [];
    this.previousNode = null;
    this.isVisited = false;
    this.distance = Infinity;
  }

  /**
   * Determine node color based on its state
   * Color priority: Start > Finish > Wall > Visited > Unvisited
   * @returns {string} CSS color value
   */
  getColour() {
    if (this.isStart == true) {
      return "rgb(133, 101, 208)"; // Purple for start
    } else if (this.isFinish == true) {
      return "rgb(255, 69, 0)"; // Orange for finish
    } else if (this.isWall == true) {
      return "#000000"; // Black for obstacles
    } else if (this.isVisited == true) {
      return "#D0F5FC"; // Light blue for explored
    } else {
      return "#ffd31d"; // Yellow for unvisited (grid base)
    }
  }

  /**
   * Render node to canvas
   * Strategy: Fill colored cells; stroke empty cells for grid visibility
   */
  draw() {
    if (this.isStart == true || this.isFinish == true || this.isWall == true) {
      ctx.fillStyle = this.getColour();
      ctx.fillRect(
        this.column * nodeSize,
        this.row * nodeSize,
        nodeSize,
        nodeSize
      );
    } else if (this.isVisited == true) {
      ctx.fillStyle = this.getColour();
      ctx.fillRect(
        this.column * nodeSize,
        this.row * nodeSize,
        nodeSize,
        nodeSize
      );
    } else {
      // Empty cells: draw border for grid lines
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

  /**
   * Get adjacent neighbors, using lazy caching
   * Neighbors are computed once and stored for efficiency
   * @returns {Node[]} Array of valid neighbor nodes
   */
  getNeighbours() {
    if (this.neighbours.length == 0) {
      this.populateNeighbours();
    }
    return this.neighbours;
  }

  /**
   * Populate neighbors array with adjacent cells (4-directional: up, down, left, right)
   * Excludes walls and out-of-bounds cells
   * Called lazily on first neighbor access
   */
  populateNeighbours() {
    // Top neighbor (column - 1)
    if (this.column > 0 && this.grid[this.column - 1][this.row]) {
      this.grid[this.column][this.row].neighbours.push(
        this.grid[this.column - 1][this.row]
      );
    }

    // Bottom neighbor (column + 1)
    if (
      this.column < this.grid.length - 1 &&
      this.grid[this.column + 1][this.row]
    ) {
      this.grid[this.column][this.row].neighbours.push(
        this.grid[this.column + 1][this.row]
      );
    }

    // Left neighbor (row - 1)
    if (this.grid[this.column][this.row - 1]) {
      this.grid[this.column][this.row].neighbours.push(
        this.grid[this.column][this.row - 1]
      );
    }

    // Right neighbor (row + 1)
    if (this.grid[this.column][this.row + 1]) {
      this.grid[this.column][this.row].neighbours.push(
        this.grid[this.column][this.row + 1]
      );
    }
  }

  /**
   * Toggle wall state (click handler)
   * Allows users to create/remove obstacles interactively
   */
  clicked() {
    this.isWall = !this.isWall;
  }
}
