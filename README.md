# Grid Solver

A class-based maze/grid solver using Breadth-First Search (BFS) and Depth-First Search (DFS) algorithms. This package allows you to solve mazes and find paths using either BFS or DFS based on your requirements.

## Installation

To install the `grid-solver` package, you can use npm:

```bash
npm install grid-solver
```

## Usage
You can use this package to solve a maze by selecting either BFS or DFS for pathfinding.

## Parameters
- maze/grid : A 2D array representing the maze/grid. Each cell can be 0 (open path) or 1 (wall).
- start: An array representing the starting point in the format [row, col].
- end: An array representing the ending point in the format [row, col].
- algorithm (optional): The algorithm to use for pathfinding. Can be either 'bfs' (default) or 'dfs'.

## Algorithms
- BFS (Breadth-First Search): Finds the shortest path from the start to the end. It explores the maze/grid level by level.
- DFS (D- epth-First Search): Finds a valid path from the start to the end (not necessarily the shortest). It explores as deep as possible before backtracking.

## Methods
- solve(): Solves the maze/grid using the selected algorithm ('bfs' or 'dfs'). Returns the path from the start to the end.
- reconstructPath(parent): Reconstructs the path from the end to the start using the parent mapping.

## Example
```bash
const GridSolver = require('grid-solver');

const grid = [
  [0, 0, 1, 1, 0, 0],
  [1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 1],
  [0, 1, 1, 1, 0, 0],
  [1, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0]
];
const start = [0, 0];
const end = [5, 5];

const gridSolverBFS = new GridSolver(grid, start, end, 'bfs');
const pathBFS = gridSolverBFS.solve();
console.log('BFS Path:', pathBFS); 

const gridSolverDFS = new GridSolver(grid, start, end, 'dfs');
const pathDFS = gridSolverDFS.solve();
console.log('DFS Path:', pathDFS); 

```

## Contributing
Feel free to fork the repository, make changes, and submit pull requests. Contributions are always welcome ❤️!  
Stay permissionless!!! 👨‍💻

## License
ISC License