# Mars Rover Path Explorer 🚀

A canvas-based pathfinding visualizer where you can watch **BFS, DFS, Dijkstra's, and A*** compete to find the shortest path around obstacles.

I built this to understand how different search algorithms work - not just reading about them on Wikipedia, but seeing them actually explore a grid in real-time. It's satisfying to watch an algorithm navigate around walls and figure out the best route.

## 🎮 How to Use It

### Getting Started
1. Open `index.html` in your browser
2. You'll see a grid with a purple node (start) on the left and an orange node (end) on the right

### Draw Obstacles
- **Click and drag** anywhere on the white grid to create black walls
- The algorithms will navigate around them
- Click the same cell again to erase a wall

### Move Start & End Points
- **Drag the purple node** to change where the path starts
- **Drag the orange node** to change where it ends
- You can place them anywhere, even on top of each other

### Run an Algorithm
1. Click **ALGORITHMS** in the menu
2. Pick one: BFS, DFS, Dijkstra, or A-Star
3. Watch it explore (light blue), then highlight the shortest path (yellow)
4. Check the metrics: Distance, Time, and how many nodes it searched

### Reset
Click **RESET** to clear everything and start over.

## 🧠 What I Learned About Each Algorithm

### BFS (Breadth-First Search)
- Explores layer by layer, like ripples in water
- Guarantees the shortest path (for unweighted grids)
- Usually searches a lot of nodes
- **Time: O(V + E), Space: O(V)**

**Why it matters:** Simple, guaranteed shortest path, but slow compared to smarter algorithms.

### DFS (Depth-First Search)
- Dives deep in one direction, then backtracks
- Doesn't guarantee shortest path
- Uses less memory than BFS
- **Time: O(V + E), Space: O(V)**

**Why it matters:** Efficient memory-wise, but you might not get the shortest path. Good for exploring mazes.

### Dijkstra's Algorithm
- Explores the closest unexplored node first
- Guarantees shortest path (even with weights)
- More efficient than BFS because it's greedy
- **Time: O(V²), Space: O(V)**

**Why it matters:** Works with weighted graphs, better than BFS when costs vary.

### A* (A-Star)
- Like Dijkstra, but smarter - it guesses which direction to go
- Uses Manhattan Distance to estimate how far each node is from the goal
- Explores way fewer nodes than the others
- **Time: O(E), Space: O(V)** (with good heuristic)

**Why it matters:** This is what GPS and game AI actually use. The heuristic makes it super efficient.

## 🏗️ How I Built It

### The Classes

**Grid** - Manages the 2D array of cells
- Keeps track of all the nodes
- Handles rendering to canvas
- Resets state between algorithm runs

**Node** - Each cell in the grid
- Knows its position (column, row)
- Tracks if it's a wall, start, or finish
- Stores the path back to start (via `previousNode`) so we can reconstruct the solution
- Knows its neighbors (adjacency list for faster algorithm execution)

**Clock** - Measures how fast each algorithm runs
- Captures start time
- Calculates elapsed milliseconds
- Shows "15ms" on the display

### The Algorithm Pattern

Every algorithm follows the same structure:
1. Start with the start node
2. Keep a list of nodes to explore (queue for BFS, stack for DFS, priority queue for Dijkstra/A*)
3. Take nodes off this list one by one
4. For each node, check its neighbors
5. Skip walls and already-visited nodes
6. Mark new nodes as visited and add them to explore
7. When you hit the finish node, you're done
8. Use `previousNode` pointers to trace back the path

The main difference between algorithms is **how you choose which node to explore next**.

## 🎨 The Visual Design

- **Purple** = Start node
- **Orange** = Finish node (where we want to go)
- **Black** = Walls/obstacles
- **Light Blue** = Nodes the algorithm explored
- **Yellow** = The shortest path it found
- **White** = Unvisited cells

The color scheme makes it easy to see what the algorithm is doing.

## 📊 Comparing Algorithms

On the same grid with the same obstacles:

| Algorithm | Explores More? | Speed | Shortest Path? | Best For |
|-----------|---|---|---|---|
| **BFS** | Yes (lots) | Slower | Yes ✅ | Learning / unweighted grids |
| **DFS** | Fewer | Varies | No ❌ | Saving memory |
| **Dijkstra** | Medium | Fast | Yes ✅ | Weighted graphs |
| **A*** | Fewest | Fastest | Yes ✅ | Real-world apps (GPS, games) |

Try them all on the same grid - A* usually wins because it "knows" which direction the goal is.

## 💡 Why I Built This

- I wanted to **see** algorithms work, not just read pseudocode
- Understanding the difference between BFS and A* by watching them - one explores everywhere, one goes straight to the goal
- It's a good portfolio project because it shows I can:
  - Implement multiple graph algorithms correctly
  - Use the canvas API for real-time visualization
  - Write clean, object-oriented JavaScript
  - Build something interactive and fun to use

## 🔧 Customization

Want to change something?

**Make the grid bigger/smaller:**
- Edit `nodeSize` in Script.js (30 = current size)
- Smaller number = more cells, faster algorithms

**Change colors:**
- Edit `getColour()` in Node.js
- Swap any hex color code

**Add diagonal movement:**
- In Node.js, add these four lines to `populateNeighbours()`:
```javascript
// Diagonals (if you want them)
if (this.column > 0 && this.row > 0) {
    this.neighbours.push(this.grid[this.column - 1][this.row - 1]);
}
// ... repeat for other corners
```

## 🚀 What I'd Add Next

- [ ] Speed controls (slow down animation to see step-by-step)
- [ ] Different maze templates (maze generator)
- [ ] Weighted cells (some terrain costs more to cross)
- [ ] Bidirectional search (start from both ends, meet in middle)
- [ ] More heuristics (try different A* strategies)
- [ ] Save/load grids
- [ ] Keyboard shortcuts for algorithms
- [ ] Dark mode

## 📈 Quick Stats

- **Lines of Code**: ~600 (no libraries, just vanilla JS)
- **Algorithms**: 4 (BFS, DFS, Dijkstra, A*)
- **Grid Size**: Up to 70×50 cells
- **Typical Runtime**: 2-15ms per algorithm
- **Browser Support**: Any modern browser (Chrome, Firefox, Safari, Edge)

## 🎓 What This Taught Me

✅ Graph traversal fundamentals  
✅ How heuristics make algorithms smarter  
✅ Canvas API and real-time rendering  
✅ Object-oriented JavaScript design  
✅ Performance analysis (timing algorithms)  
✅ Debugging by watching visual output  

---

**Built by Jayam Pradnesh**

This was a fun learning project. If you're studying algorithms, run the visualizer and try different obstacles - you'll understand these algorithms way better than reading about them.
