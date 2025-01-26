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
      this.algorithm = algorithm; // 'bfs' or 'dfs'
    }
  
    /**
     * Solves the maze using the selected algorithm (BFS or DFS).
     * @returns {Array<Array<number>>} - The shortest path from start to end.
     */
    solve() {
      if (this.algorithm === 'bfs') {
        return this.bfs();
      } else if (this.algorithm === 'dfs') {
        return this.dfs();
      } else {
        throw new Error('Unsupported algorithm. Please choose either "bfs" or "dfs".');
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
  
        // Explore neighbors in DFS order (can be changed to stack pop order)
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
  