/**
 * Grid Class - 2D Grid Manager for Pathfinding Visualizer
 * 
 * Manages:
 * - 2D array of Node objects
 * - Canvas rendering and updates
 * - Grid state (visited, distance, neighbors)
 * - Node positioning (start, finish, walls)
 * 
 * Grid dimensions are dynamic based on canvas size:
 * - Each node is 30px × 30px
 * - Columns = (viewport width - 10%) / 30
 * - Rows = (viewport height - navbar) / 30
 */
class Grid {
  /**
   * Initialize the grid
   * @param {number} columns - Number of columns in grid
   * @param {number} rows - Number of rows in grid
   * @param {number} nodeSize - Pixel size of each node (30px)
   */
  constructor(columns, rows, nodeSize) {
    this.columns = columns;
    this.rows = rows;
    this.nodeSize = nodeSize;
    this.grid = [];
  }

  /**
   * Create the 2D grid of nodes
   * 
   * Process:
   * 1. Initialize 2D array structure
   * 2. Position start node: 10% from left, vertically centered
   * 3. Position finish node: 90% from left, vertically centered
   * 4. Create all nodes with appropriate flags
   * 
   * Proportional positioning ensures start/end nodes scale with viewport
   */
  createGrid() {
    // Initialize 2D array columns
    for (let i = 0; i < this.columns; i++) {
      this.grid[i] = [];
    }

    // Calculate start and finish positions (proportional to grid size)
    let startColumn = round(columns / 10);
    let startRow = round(rows / 2) - 1;
    let finishColumn = round(columns - columns / 10);
    let finishRow = round(rows / 2) + 2;

    // Create all nodes with appropriate type flags
    for (let column = 0; column < this.columns; column++) {
      for (let row = 0; row < this.rows; row++) {
        // Determine if this node is start node
        var isStart = (column == startColumn && row == startRow);
        
        // Determine if this node is finish node
        var isFinish = (column == finishColumn && row == finishRow);
        
        // Create node and add to grid
        this.grid[column][row] = new Node(
          column,
          row,
          this.nodeSize,
          isStart,
          isFinish,
          false, // isWall
          this.grid
        );
      }
    }
  }

  /**
   * Render entire grid to canvas
   * Called after algorithm execution or user interaction
   * Performance: Single pass over all nodes
   */
  drawGrid() {
    // Clear previous canvas state
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw all nodes
    for (let column = 0; column < this.columns; column++) {
      for (let row = 0; row < this.rows; row++) {
        this.grid[column][row].draw();
      }
    }
  }

  /**
   * Update grid based on mouse interaction
   * Handles:
   * - Start/finish node dragging
   * - Wall creation/deletion
   * 
   * Only updates when mouse button is down
   */
  updateGrid() {
    if (mouse.down == true) {
      // Check if dragging start node
      if (this.grid[changeX][changeY].isStart == true) {
        this.grid[changeX][changeY].isStart = false;
        this.grid[mouse.x][mouse.y].isStart = true;
      }
      // Check if dragging finish node
      else if (this.grid[changeX][changeY].isFinish == true) {
        this.grid[changeX][changeY].isFinish = false;
        this.grid[mouse.x][mouse.y].isFinish = true;
      }
      // Otherwise, toggle wall state
      else if (mouse.x !== changeX || mouse.y !== changeY) {
        this.grid[mouse.x][mouse.y].clicked();
      }
      
      // Re-render grid with updates
      this.drawGrid();
    }
  }

  /**
   * Get the start node
   * Searches grid for node with isStart flag
   * @returns {Node} The start node (purple)
   */
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

  /**
   * Get the finish node
   * Searches grid for node with isFinish flag
   * @returns {Node} The finish node (orange)
   */
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

  /**
   * Set start node's initial distance
   * Used in Dijkstra and A* (typically 0)
   * @param {number} distance - Initial distance value
   */
  setStartNodeDistance(distance) {
    this.getStartNode().distance = distance;
  }

  /**
   * Reset grid state for new search
   * 
   * Clears:
   * - Visited flags (isVisited = false)
   * - Distance values (distance = Infinity)
   * - Previous node pointers (previousNode = null)
   * - Neighbor arrays (for recomputation)
   * 
   * Preserves:
   * - Node positions (walls, start, finish)
   * - Wall configuration
   * 
   * Must be called before each algorithm execution
   */
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
