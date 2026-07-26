function dfs(grid) {
  const visitedNodesInOrder = [];
  const startNode = grid.getStartNode();
  const stack = [startNode];
  startNode.isVisited = true;

  while (stack.length > 0) {
    const currentNode = stack.pop();
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
      stack.push(neighbour);
    }
  }

  return visitedNodesInOrder, grid.drawGrid();
}
