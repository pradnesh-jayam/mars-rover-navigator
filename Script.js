/**
 * Mars Rover Path Explorer - Pathfinding Visualizer v2.0
 * Canvas-based interactive visualizer for BFS, DFS, Dijkstra's, and A* algorithms
 * 
 * Features:
 * - Real-time algorithm execution with visual feedback
 * - Mouse-driven wall creation and node repositioning
 * - Performance metrics (distance, time, nodes searched)
 * - Zero external dependencies; pure vanilla JavaScript
 * 
 * Author: Jayam Pradnesh
 * Updated: July 2026
 */

// Math function aliases for cleaner code
const floor = Math.floor;
const abs = Math.abs;
const round = Math.round;

// Canvas setup - automatically scales to viewport
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const nodeSize = 30;
const columns = round((window.innerWidth - window.innerWidth / 10) / nodeSize);
const rows = round((window.innerHeight - window.innerHeight / 6) / nodeSize);

canvas.width = columns * nodeSize;
canvas.height = rows * nodeSize;

/**
 * Mouse state tracker
 * - (x, y): Current mouse position in grid coordinates
 * - (dx, dy): Previous position for drag detection
 * - down: Mouse button pressed state
 */
const mouse = {
  x: undefined,
  y: undefined,
  dx: undefined,
  dy: undefined,
  down: false,
};

/**
 * Manhattan distance heuristic for A* algorithm
 * Used to estimate remaining distance from nodeA to nodeB
 * @param {Node} nodeA - Starting node
 * @param {Node} nodeB - Target node
 * @returns {number} Manhattan distance = |x1-x2| + |y1-y2|
 */
function getDistance(nodeA, nodeB) {
  return abs(nodeA.column - nodeB.column) + abs(nodeA.row - nodeB.row);
}

/**
 * Algorithm Execution Functions
 * Each function follows the pattern:
 * 1. Start performance clock
 * 2. Reset grid state (clear previous search)
 * 3. Execute algorithm
 * 4. Measure execution time
 * 5. Visualize shortest path and metrics
 */

/**
 * Execute BFS (Breadth-First Search)
 * Queue-based exploration; guarantees shortest path on unweighted grids
 * Time: O(V + E), Space: O(V)
 * @param {Grid} grid - The pathfinding grid
 */
function drawbfs(grid) {
  var startTime = startClock();
  grid.resetGrid();
  grid.drawGrid();
  bfs(grid);
  var finishTime = stopClock(startTime);
  drawShortestPath(grid, finishTime);
}

/**
 * Execute DFS (Depth-First Search)
 * Stack-based exploration; memory-efficient, doesn't guarantee shortest path
 * Time: O(V + E), Space: O(V)
 * @param {Grid} grid - The pathfinding grid
 */
function drawdfs(grid) {
  var startTime = startClock();
  grid.resetGrid();
  grid.drawGrid();
  dfs(grid);
  var finishTime = stopClock(startTime);
  drawShortestPath(grid, finishTime);
}

/**
 * Execute Dijkstra's Algorithm
 * Weighted pathfinding; optimal for non-negative edge weights
 * Time: O(V²), Space: O(V)
 * @param {Grid} grid - The pathfinding grid
 */
function drawDijkstra(grid) {
  var startTime = startClock();
  grid.resetGrid();
  grid.drawGrid();
  dijkstra(grid);
  finishTime = stopClock(startTime);
  drawShortestPath(grid, finishTime);
}

/**
 * Execute A* Search
 * Heuristic-guided pathfinding using Manhattan distance
 * Time: O(E), Space: O(V) with admissible heuristic
 * @param {Grid} grid - The pathfinding grid
 */
function drawAStar(grid) {
  var startTime = startClock();
  grid.resetGrid();
  grid.drawGrid();
  aStar(grid);
  var finishTime = stopClock(startTime);
  drawShortestPath(grid, finishTime);
}

/**
 * Utility Functions for Path Reconstruction
 */

/**
 * Sort unvisited nodes by distance (used in Dijkstra's algorithm)
 * @param {Node[]} unvisitedNodes - Array of nodes to sort
 */
function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

/**
 * Reconstruct shortest path from start to finish node
 * Follows previousNode pointers (backtracking) from finish to start
 * @param {Node} finishNode - The end node of the path
 * @returns {Node[]} Array of nodes representing the shortest path
 */
function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}

/**
 * Visualize the shortest path and display performance metrics
 * 
 * Process:
 * 1. Reconstruct path using previousNode pointers
 * 2. Draw path in yellow on canvas
 * 3. Count total nodes searched (efficiency metric)
 * 4. Display distance, time, and nodes searched
 * 
 * @param {Grid} grid - The pathfinding grid with results
 * @param {number} finishTime - Algorithm execution time in milliseconds
 */
function drawShortestPath(grid, finishTime) {
  // Reconstruct path by backtracking from finish to start
  const nodesInShortestPathOrder = getNodesInShortestPathOrder(
    grid.getFinishNode()
  );
  
  // Draw shortest path in yellow (skip start and finish nodes)
  for (let i = 1; i < nodesInShortestPathOrder.length - 1; i++) {
    node = nodesInShortestPathOrder[i];

    ctx.fillStyle = "#f9d56e"; // Yellow color for path
    ctx.fillRect(
      node.column * nodeSize,
      node.row * nodeSize,
      nodeSize,
      nodeSize
    );
  }

  // Display shortest path distance (number of steps)
  document.getElementById("distance").innerHTML =
    nodesInShortestPathOrder.length - 1;
  
  // Display execution time
  document.getElementById("time").innerHTML = finishTime;

  // Count nodes explored during algorithm execution
  nodesSearched = 0;
  for (let column = 0; column < grid.columns; column++) {
    for (let row = 0; row < grid.rows; row++) {
      if (grid.grid[column][row].isVisited == true) {
        nodesSearched += 1;
      }
    }
  }

  // Display node count for algorithm efficiency analysis
  document.getElementById("searched").innerHTML = nodesSearched;
}

function setMouse(e) {
  let rect = canvas.getBoundingClientRect();
  changeX = mouse.x;
  changeY = mouse.y;
  mouse.x = floor((e.clientX - rect.left) / nodeSize);
  mouse.y = floor((e.clientY - rect.top) / nodeSize);
  if (changeX !== mouse.x) {
    mouse.dx = changeX;
  } else if (changeY !== mouse.Y) {
    mouse.dy = changeY;
  }
  grid.updateGrid();
}

canvas.onmousedown = (e) => {
  mouse.button = e.which;
  mouse.down = true;
  setMouse(e);
};

canvas.onmousemove = setMouse;

canvas.onmouseup = () => (mouse.down = false);

canvas.oncontextmenu = (e) => e.preventDefault();

let grid = new Grid(columns, rows, nodeSize);
grid.createGrid();
grid.drawGrid();
