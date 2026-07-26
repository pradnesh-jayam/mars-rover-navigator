/**
 * Mars Rover Path Explorer - Pathfinding Visualizer
 * Let's you visualize BFS, DFS, Dijkstra's, and A* on a grid
 * 
 * You click to draw walls, drag the start/end nodes around,
 * then pick an algorithm and watch it find the path
 */

// Math shortcuts
const floor = Math.floor;
const abs = Math.abs;
const round = Math.round;

// Canvas setup
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Grid dimensions - scales based on screen size
const nodeSize = 30;
const columns = round((window.innerWidth - window.innerWidth / 10) / nodeSize);
const rows = round((window.innerHeight - window.innerHeight / 6) / nodeSize);

canvas.width = columns * nodeSize;
canvas.height = rows * nodeSize;

// Track mouse position and drag state
const mouse = {
  x: undefined,
  y: undefined,
  dx: undefined,
  dy: undefined,
  down: false,
};

// Manhattan distance - used by A* to guess how far a node is from the goal
function getDistance(nodeA, nodeB) {
  return abs(nodeA.column - nodeB.column) + abs(nodeA.row - nodeB.row);
}

// Run each algorithm
// We time it, reset the grid, run the algorithm, then show the results

function drawbfs(grid) {
  var startTime = startClock();
  grid.resetGrid();
  grid.drawGrid();
  bfs(grid);
  var finishTime = stopClock(startTime);
  drawShortestPath(grid, finishTime);
}

function drawdfs(grid) {
  var startTime = startClock();
  grid.resetGrid();
  grid.drawGrid();
  dfs(grid);
  var finishTime = stopClock(startTime);
  drawShortestPath(grid, finishTime);
}

function drawDijkstra(grid) {
  var startTime = startClock();
  grid.resetGrid();
  grid.drawGrid();
  dijkstra(grid);
  finishTime = stopClock(startTime);
  drawShortestPath(grid, finishTime);
}

function drawAStar(grid) {
  var startTime = startClock();
  grid.resetGrid();
  grid.drawGrid();
  aStar(grid);
  var finishTime = stopClock(startTime);
  drawShortestPath(grid, finishTime);
}

// Sort nodes by distance (for Dijkstra's)
function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

// Trace back the path from finish to start using previousNode pointers
// This reconstructs the shortest path the algorithm found
function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}

// Draw the shortest path and update the metrics panel
function drawShortestPath(grid, finishTime) {
  // Get the shortest path
  const nodesInShortestPathOrder = getNodesInShortestPathOrder(
    grid.getFinishNode()
  );
  
  // Draw it in yellow (skip the start and end nodes)
  for (let i = 1; i < nodesInShortestPathOrder.length - 1; i++) {
    node = nodesInShortestPathOrder[i];
    ctx.fillStyle = "#f9d56e";
    ctx.fillRect(
      node.column * nodeSize,
      node.row * nodeSize,
      nodeSize,
      nodeSize
    );
  }

  // Show the distance (number of steps)
  document.getElementById("distance").innerHTML =
    nodesInShortestPathOrder.length - 1;
  
  // Show how fast it ran
  document.getElementById("time").innerHTML = finishTime;

  // Count how many nodes the algorithm explored
  nodesSearched = 0;
  for (let column = 0; column < grid.columns; column++) {
    for (let row = 0; row < grid.rows; row++) {
      if (grid.grid[column][row].isVisited == true) {
        nodesSearched += 1;
      }
    }
  }
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
