# Mars Rover Path Explorer

An interactive pathfinding visualizer that demonstrates how graph-search algorithms explore a grid to find a route between two points.

**Tech Stack:** HTML5, CSS3, JavaScript, Canvas API

## Features

- Four algorithms: BFS, DFS, Dijkstra, and A*.
- Interactive grid with movable start and destination nodes.
- Add and remove obstacles to experiment with routes.
- Visualize explored cells and the resulting path.
- View the search metrics reported by the application.

## Algorithms

| Algorithm | Approach |
|---|---|
| BFS | Explores neighbours level by level using a queue. |
| DFS | Explores one branch deeply before backtracking. |
| Dijkstra | Prioritizes nodes by their recorded distance from the start. |
| A* | Uses a heuristic to guide exploration toward the destination. |

## How It Works

The grid consists of nodes connected to their neighbours. Each algorithm explores the grid using its own search strategy. Predecessor references are used to reconstruct a path, and the Canvas API visualizes the exploration process.

## Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/pradnesh-jayam/mars-rover-navigator.git
   ```

2. Open the project folder in Visual Studio Code.
3. Open `index.html` using the Live Server extension.
4. Add obstacles, select an algorithm, and observe its exploration.

## Project Structure

| File | Purpose |
|---|---|
| `index.html` | Page structure and script loading |
| `style.css` | Interface styling |
| `Script.js` | Application interactions and visualization |
| `grid.js` | Grid management and rendering |
| `Node.js` | Node state and neighbour management |
| `BFS.js` | Breadth-First Search |
| `DFS.js` | Depth-First Search |
| `Dijkstra.js` | Dijkstra's algorithm |
| `Astar.js` | A* search |
| `Clock.js` | Execution-time measurement |

## Possible Improvements

- Add automated tests for path validity and edge cases.
- Validate algorithm correctness against BFS on equivalent unweighted grids.
- Add weighted terrain and adjustable animation speed.

## Source Code

[GitHub Repository](https://github.com/pradnesh-jayam/mars-rover-navigator)
