function bfs(grid) {
  const visitedNodesInOrder = [];
  const startNode = grid.getStartNode();
  const queue = [startNode];
  startNode.isVisited = true;

  while (queue.length > 0) {
    const currentNode = queue.shift();
    visitedNodesInOrder.push(currentNode);

    if (currentNode.isFinish === true) {
      return visitedNodesInOrder, grid.drawGrid();
    }

    grid.grid[currentNode.column][currentNode.row].getNeighbours();
    const neighbours = currentNode.neighbours;

    for (const neighbour of neighbours) {
      if (neighbour.isWall === true || neighbour.isVisited === true) {
        continue;
      }

      neighbour.isVisited = true;
      neighbour.previousNode = currentNode;
      queue.push(neighbour);
    }
  }

  return visitedNodesInOrder, grid.drawGrid();
}
