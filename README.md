# Mars Rover Path Explorer 🚀

A high-performance, interactive canvas-based pathfinding visualizer implementing **BFS, DFS, Dijkstra's Algorithm, and A* Search** with real-time algorithm execution visualization and comprehensive performance metrics.

## 🎯 Features

### Core Algorithms
- **BFS (Breadth-First Search)** - Queue-based exploration; guarantees shortest path on unweighted grids
- **DFS (Depth-First Search)** - Stack-based exploration; memory-efficient with depth-first traversal
- **Dijkstra's Algorithm** - Weighted pathfinding; optimal for non-negative edge weights
- **A* Search** - Heuristic-guided pathfinding using Manhattan distance; optimal and efficient for weighted grids

### Interactive Visualization
- **Canvas-based real-time rendering** - Dynamic grid visualization with instant algorithm execution
- **Mouse-driven obstacle creation** - Click and drag across the grid to draw walls
- **Draggable start/end nodes** - Reposition purple (start) and orange (end) nodes on-the-fly
- **Live algorithm execution** - Watch nodes get explored and backtracked in real-time

### Performance Metrics
- **Distance tracking** - Displays shortest path length (Manhattan distance)
- **Execution time** - Millisecond-precision performance clock measuring algorithm runtime
- **Nodes searched** - Real-time counter showing explored nodes vs total grid size

### Technical Implementation
- **Custom Grid/Node classes** - Object-oriented architecture for state management and neighbor tracking
- **Distance & visited-state tracking** - Efficient node metadata for algorithm correctness
- **Path reconstruction via backtracking** - Previous-node pointers enable shortest path recovery
- **Zero external dependencies** - Pure vanilla JavaScript; no jQuery, lodash, or external libraries
- **Responsive canvas layout** - Automatically scales grid to viewport dimensions

## 🎮 How to Use

### Getting Started
1. Open `index.html` in a modern web browser (Chrome, Firefox, Safari, Edge)
2. The grid will load with a purple node (start) on the left and orange node (end) on the right

### Drawing Obstacles
- **Click and drag** anywhere on the white grid area to create black walls
- **Walls block pathfinding** - algorithms will navigate around them
- **Toggle walls** - click the same cell again to remove a wall

### Positioning Start/End Points
- **Click and drag the purple node** to set a new start position
- **Click and drag the orange node** to set a new end position
- Both nodes can be placed anywhere on the grid, including in the same cell

### Running Algorithms
1. Click the **ALGORITHMS** dropdown in the navbar
2. Select your algorithm: BFS, DFS, Dijkstra, or A-Star
3. The grid will:
   - Reset previous visualization
   - Explore nodes (light blue highlights)
   - Draw the shortest path (yellow highlights)
   - Display metrics: Distance, Time, Nodes Searched

### Reset Grid
- Click **RESET** button to clear all walls and return to default start/end positions
- This clears all visualization but retains the grid structure

## 📊 Algorithm Comparison

| Algorithm | Time Complexity | Space Complexity | Optimal? | Finds Shortest? | Notes |
|-----------|-----------------|------------------|----------|-----------------|-------|
| **BFS** | O(V + E) | O(V) | ❌ | ✅ (unweighted) | Explores level by level |
| **DFS** | O(V + E) | O(V) | ❌ | ❌ | Memory-efficient, depth-first |
| **Dijkstra** | O(V²) | O(V) | ✅ | ✅ (non-negative) | Weighted graphs |
| **A*** | O(E) | O(V) | ✅ | ✅ (admissible heuristic) | Best for heuristic-guided search |

**Heuristic Used**: Manhattan Distance = `|x1 - x2| + |y1 - y2|`

## 🏗️ Architecture

### File Structure
```
mars-rover-navigator/
├── index.html          # UI layout with navbar and canvas
├── Script.js           # Main event handlers and algorithm orchestration
├── grid.js             # Grid class: 2D node array management
├── Node.js             # Node class: individual cell state and rendering
├── BFS.js              # Breadth-First Search implementation
├── DFS.js              # Depth-First Search implementation
├── Dijkstra.js         # Dijkstra's Algorithm implementation
├── Astar.js            # A* Search implementation
├── Clock.js            # Performance timing utilities
└── style.css           # Responsive styling and theming

```

### Core Classes

#### `Grid`
- Manages 2D array of `Node` objects
- Dimensions: Dynamic based on viewport (30px cells)
- Methods:
  - `createGrid()` - Initialize all nodes with start/end positions
  - `drawGrid()` - Render all nodes to canvas
  - `updateGrid()` - Handle mouse interactions and node updates
  - `resetGrid()` - Clear visited/distance state for new search
  - `getStartNode()`, `getFinishNode()` - Accessor methods

#### `Node`
- Represents a single grid cell
- Properties:
  - `column`, `row` - Grid coordinates
  - `isStart`, `isFinish`, `isWall` - Node type flags
  - `isVisited` - Exploration state
  - `distance` - Distance from start (Dijkstra/A*)
  - `previousNode` - Backpointer for path reconstruction
  - `neighbours[]` - Adjacent unblocked cells
- Methods:
  - `draw()` - Render to canvas with color coding
  - `getNeighbours()` - Return adjacent valid cells
  - `populateNeighbours()` - Compute adjacency on first access
  - `clicked()` - Toggle wall state

### Algorithm Pattern
Each algorithm follows this pattern:
1. **Initialize**: Start node marked as visited, added to queue/stack
2. **Loop**: Process frontier nodes until finish found or frontier empty
3. **Neighbor Check**: Skip walls and already-visited nodes
4. **Mark & Backtrack**: Set `isVisited=true` and `previousNode` pointer
5. **Return**: Visited nodes list (enables visualization) and shortest path

### Performance Clock
- `startClock()` - Captures `Date.now()` at algorithm start
- `stopClock(startTime)` - Calculates elapsed milliseconds; formats as "Xms"
- Precision: Millisecond-level; typical execution 1-50ms on modern browsers

## 🎨 UI/UX Highlights

### Navbar
- **Instructions Modal** - Click to review controls (keyboard hints, color legend)
- **Algorithm Dropdown** - Select from BFS, DFS, Dijkstra, A*
- **Explanation Links** - Wikipedia articles for each algorithm
- **Reset Button** - One-click grid reset

### Color Scheme
- **Purple** - Start node
- **Orange** - End node (destination)
- **Black** - Walls/obstacles
- **Light Blue** - Explored nodes
- **Yellow** - Shortest path
- **White** - Unvisited cells with grid lines

### Performance Metrics Panel (Top-Right)
- **Distance** - Number of steps in shortest path
- **Time** - Algorithm execution time in milliseconds
- **NodeSearched** - Count of visited nodes (exploration efficiency)

## 🚀 Performance Optimizations

1. **Lazy neighbor computation** - `getNeighbours()` caches adjacency list on first call
2. **Early termination** - Algorithm stops as soon as finish node is found
3. **Canvas batching** - All node rendering done in single `drawGrid()` pass
4. **Efficient grid indexing** - O(1) node access via 2D array
5. **Mouse event debouncing** - Canvas coordinate calculation only on mouse events

## 🔧 Browser Compatibility

- **Chrome 90+** - Full support; excellent performance
- **Firefox 88+** - Full support
- **Safari 14+** - Full support
- **Edge 90+** - Full support
- **Mobile** - Touch-dragging supported on tablets (limited wall creation)

## 📱 Responsive Design

- Grid auto-scales to viewport dimensions
- Canvas width = viewport width - 10% margin
- Canvas height = viewport height - navbar height (20%)
- Node size fixed at 30px for consistent interaction

## 🎓 Learning Outcomes

By studying and using this project, you'll understand:
- ✅ Graph traversal algorithms (BFS, DFS)
- ✅ Shortest path algorithms (Dijkstra, A*)
- ✅ Data structure choices (queues, stacks, priority queues)
- ✅ Heuristic design and admissibility
- ✅ Canvas API for real-time visualization
- ✅ Object-oriented JavaScript design patterns
- ✅ Event-driven interactive applications
- ✅ Performance profiling and metrics

## 🛠️ Customization

### Change Grid Size
Modify `nodeSize` in `Script.js`:
```javascript
const nodeSize = 30; // Increase for larger cells, decrease for finer grid
```

### Change Node Colors
Edit `getColour()` in `Node.js`:
```javascript
getColour() {
    if (this.isStart) return "rgb(133, 101, 208)"; // Custom purple
    // ... etc
}
```

### Add Diagonal Movement
Modify `populateNeighbours()` in `Node.js` to include diagonals:
```javascript
// Add diagonal neighbors
if (this.column > 0 && this.row > 0) {
    this.neighbours.push(this.grid[this.column - 1][this.row - 1]);
}
```

## 📈 Project Metrics

- **Algorithms Implemented**: 4 (BFS, DFS, Dijkstra, A*)
- **Lines of Code**: ~600 (pure vanilla JavaScript)
- **External Dependencies**: 0
- **Canvas Cells**: Up to 70×50 nodes (3,500 cells)
- **Average Algorithm Runtime**: 2-15ms
- **Browser Support**: All modern browsers (ES6+)

## 🤝 Contributing

To improve this project:
1. Clone the repository
2. Create a feature branch
3. Add enhancements (new algorithms, UI improvements, performance optimizations)
4. Test thoroughly on multiple browsers
5. Submit a pull request with clear documentation

## 📝 License

This project is open source and available for educational purposes.

## 🚀 Future Enhancements

- [ ] Weighted grid cells (terrain cost)
- [ ] Bidirectional search algorithms
- [ ] JPS (Jump Point Search) for grids
- [ ] Animation speed controls
- [ ] Preset maze templates
- [ ] Algorithm statistics dashboard
- [ ] Keyboard shortcuts for algorithm selection
- [ ] Export/import grid layouts
- [ ] Dark mode theme toggle

---

**Built with ❤️ by Jayam Pradnesh | Mars Rover Path Explorer v2.0**
