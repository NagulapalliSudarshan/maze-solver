class GridSolver {
    constructor(maze, start, end, algorithm = 'bfs') {
      this.maze = maze;
      this.start = start;
      this.end = end;
      this.directions = [
        [-1, 0], // up
        [1, 0],  // down
        [0, -1], // left
        [0, 1],  // right
      ];
      this.algorithm = algorithm; // 'bfs', 'dfs', or 'a-star'
    }
  
    /**
     * Solves the maze using the selected algorithm (BFS, DFS, or A*).
     * @returns {Array<Array<number>>} - The shortest path from start to end.
     */
    solve() {
      if (this.algorithm === 'bfs') {
        return this.bfs();
      } else if (this.algorithm === 'dfs') {
        return this.dfs();
      } else if (this.algorithm === 'a-star') {
        return this.aStar();
      } else {
        throw new Error('Unsupported algorithm. Please choose either "bfs", "dfs", or "a-star".');
      }
    }
  
    /**
     * Breadth-First Search (BFS) algorithm to find the shortest path.
     * @returns {Array<Array<number>>} - The shortest path from start to end.
     */
    bfs() {
      const queue = [];
      const visited = new Set();
      const parent = {}; // To reconstruct the path
  
      queue.push(this.start);
      visited.add(this.start.toString());
  
      while (queue.length > 0) {
        const [x, y] = queue.shift();
  
        // If we've reached the end, reconstruct and return the path
        if (x === this.end[0] && y === this.end[1]) {
          return this.reconstructPath(parent);
        }
  
        // Explore neighbors
        for (const [dx, dy] of this.directions) {
          const nx = x + dx;
          const ny = y + dy;
  
          if (
            nx >= 0 && ny >= 0 && nx < this.maze.length && ny < this.maze[0].length &&
            this.maze[nx][ny] === 0 && !visited.has([nx, ny].toString())
          ) {
            visited.add([nx, ny].toString());
            queue.push([nx, ny]);
            parent[[nx, ny].toString()] = [x, y];
          }
        }
      }
  
      return null; // No path found
    }
  
    /**
     * Depth-First Search (DFS) algorithm to find a path.
     * @returns {Array<Array<number>>} - A path from start to end (not necessarily the shortest).
     */
    dfs() {
      const stack = [];
      const visited = new Set();
      const parent = {}; // To reconstruct the path
  
      stack.push(this.start);
      visited.add(this.start.toString());
  
      while (stack.length > 0) {
        const [x, y] = stack.pop();
  
        // If we've reached the end, reconstruct and return the path
        if (x === this.end[0] && y === this.end[1]) {
          return this.reconstructPath(parent);
        }
  
        // Explore neighbors in DFS order
        for (const [dx, dy] of this.directions) {
          const nx = x + dx;
          const ny = y + dy;
  
          if (
            nx >= 0 && ny >= 0 && nx < this.maze.length && ny < this.maze[0].length &&
            this.maze[nx][ny] === 0 && !visited.has([nx, ny].toString())
          ) {
            visited.add([nx, ny].toString());
            stack.push([nx, ny]);
            parent[[nx, ny].toString()] = [x, y];
          }
        }
      }
  
      return null; // No path found
    }
  
    /**
     * A* algorithm to find the shortest path.
     * @returns {Array<Array<number>>} - The shortest path from start to end.
     */
    aStar() {
      const openSet = [];
      const closedSet = new Set();
      const parent = {}; // To reconstruct the path
      const gScore = {}; // Actual cost from start to current node
      const fScore = {}; // Estimated cost from start to end through current node
  
      openSet.push(this.start);
      gScore[this.start.toString()] = 0;
      fScore[this.start.toString()] = this.heuristic(this.start, this.end);
  
      while (openSet.length > 0) {
        // Get node with the lowest fScore
        let current = openSet.reduce((lowest, node) => {
          return fScore[node.toString()] < fScore[lowest.toString()] ? node : lowest;
        });
  
        // If we've reached the end, reconstruct and return the path
        if (current[0] === this.end[0] && current[1] === this.end[1]) {
          return this.reconstructPath(parent);
        }
  
        // Move current from openSet to closedSet
        openSet.splice(openSet.indexOf(current), 1);
        closedSet.add(current.toString());
  
        // Explore neighbors
        for (const [dx, dy] of this.directions) {
          const nx = current[0] + dx;
          const ny = current[1] + dy;
          const neighbor = [nx, ny];
  
          if (
            nx >= 0 && ny >= 0 && nx < this.maze.length && ny < this.maze[0].length &&
            this.maze[nx][ny] === 0 && !closedSet.has(neighbor.toString())
          ) {
            const tentativeGScore = gScore[current.toString()] + 1;
  
            if (!openSet.includes(neighbor)) {
              openSet.push(neighbor);
            } else if (tentativeGScore >= gScore[neighbor.toString()]) {
              continue;
            }
  
            parent[neighbor.toString()] = current;
            gScore[neighbor.toString()] = tentativeGScore;
            fScore[neighbor.toString()] = gScore[neighbor.toString()] + this.heuristic(neighbor, this.end);
          }
        }
      }
  
      return null; // No path found
    }
  
    /**
     * Heuristic function for A* (Manhattan distance).
     * @param {Array<number>} a - The current node.
     * @param {Array<number>} b - The target node.
     * @returns {number} - The Manhattan distance between a and b.
     */
    heuristic(a, b) {
      return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
    }
  
    /**
     * Reconstruct the path from end to start using the parent object.
     * @param {Object} parent - The parent object to reconstruct the path.
     * @returns {Array<Array<number>>} - The reconstructed path.
     */
    reconstructPath(parent) {
      const path = [];
      let current = this.end;
  
      while (current) {
        path.push(current);
        current = parent[current.toString()];
      }
  
      return path.reverse(); // Return the path from start to end
    }
  }
  
  module.exports = GridSolver;
  