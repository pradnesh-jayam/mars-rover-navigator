/**
 * BFS (Breadth-First Search) Algorithm Implementation
 * 
 * Characteristics:
 * - Queue-based exploration (FIFO)
 * - Explores nodes level-by-level from start
 * - Guarantees shortest path on unweighted graphs
 * 
 * Time Complexity: O(V + E) where V = vertices, E = edges
 * Space Complexity: O(V) for queue storage
 * 
 * Use case: Finding shortest path in unweighted grids
 */

/**
 * Execute Breadth-First Search algorithm
 * 
 * Algorithm:
 * 1. Initialize queue with start node
 * 2. Mark start as visited
 * 3. While queue not empty:
 *    a. Dequeue first node
 *    b. If it's finish node, return
 *    c. For each unvisited neighbor:
 *       - Mark as visited
 *       - Set previousNode for path reconstruction
 *       - Add to queue
 * 
 * @param {Grid} grid - The pathfinding grid
 * @returns {Array} Array of visited nodes in BFS order
 */
function bfs(grid) {
  const visitedNodesInOrder = [];
  const startNode = grid.getStartNode();
  const queue = [startNode];
  startNode.isVisited = true;

  while (queue.length > 0) {
    // Dequeue the first node (FIFO - breadth-first)
    const currentNode = queue.shift();
    visitedNodesInOrder.push(currentNode);

    // Early termination if finish node reached
    if (currentNode.isFinish === true) {
      return visitedNodesInOrder, grid.drawGrid();
    }

    // Get unvisited neighbors
    grid.grid[currentNode.column][currentNode.row].getNeighbours();
    const neighbours = currentNode.neighbours;

    // Enqueue all unvisited neighbors
    for (const neighbour of neighbours) {
      // Skip walls and already-visited nodes
      if (neighbour.isWall === true || neighbour.isVisited === true) {
        continue;
      }

      // Mark as visited and set backpointer for path reconstruction
      neighbour.isVisited = true;
      neighbour.previousNode = currentNode;
      queue.push(neighbour);
    }
  }

  return visitedNodesInOrder, grid.drawGrid();
}
