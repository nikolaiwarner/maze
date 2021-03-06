const astar = require('javascript-astar')

export interface mazeInterface {
  width: number,
  height: number,
  start: 'top'|'left'|'bottom'|'right'|'center'|'random', 
  end: 'top'|'left'|'bottom'|'right'|'center'|'random',
  grid?: Array<Array<number>>,
  startPosition?: {
    x: number,
    y: number
  },
  endPosition?: {
    x: number,
    y: number
  },
}

interface mazeStartEndInterface {
}

export const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const createGrid = (maze: mazeInterface) => {
  let grid = []
  for (let indexCol = 0; indexCol < maze.height; indexCol++) {
    let row = []
    for (let indexRow = 0; indexRow < maze.width; indexRow++) {
      row.push(Math.round(Math.random()))
    }
    grid.push(row)
  }
  // Clear path for start and end
  grid[maze.startPosition!.y][maze.startPosition!.x] = 1
  grid[maze.endPosition!.y][maze.endPosition!.x] = 1
  return grid
}

export const findWalls = (room: any, maze: mazeInterface) => {
  const grid = maze.grid || []
  let walls = {
    north: (grid[room.y - 1] && grid[room.y - 1][room.x] === 0),
    south: (grid[room.y + 1] && grid[room.y + 1][room.x] === 0),
    east: (grid[room.y][room.x + 1] === 0),
    west: (grid[room.y][room.x - 1] === 0),
  }
  return walls
}

export const setMazeStartAndEnd = (maze: mazeInterface) => {
  const positions = {
    top: {
      x: randomInt(0, maze.width - 1),
      y: 0
    },
    bottom: {
      x: randomInt(0, maze.width - 1),
      y: maze.height - 1
    },
    left: {
      x: 0,
      y: randomInt(0, maze.height - 1)
    },
    right: {
      x: maze.width - 1,
      y: randomInt(0, maze.width - 1)
    },
    center: {
      x: Math.round(maze.width / 2),
      y: Math.round(maze.height / 2)
    },
    random: {
      x: randomInt(0, maze.width - 1),
      y: randomInt(0, maze.height - 1)
    }
  }
  maze.startPosition = positions[maze.start]
  maze.endPosition = positions[maze.end]
  return maze
}

export const testMaze = (maze: mazeInterface) => {
  const graph = new astar.Graph(maze.grid, { diagonal: false })
  const start = graph.grid[maze.startPosition!.y][maze.startPosition!.x]
  const end = graph.grid[maze.endPosition!.y][maze.endPosition!.x]
  return astar.astar.search(graph, start, end)
}

const generate = (maze: mazeInterface): mazeInterface => {
  let result = []
  let count = 0
  while (!result.length) {
    count++
    maze = setMazeStartAndEnd(maze)
    maze.grid = createGrid(maze)
    result = testMaze(maze)
  }
  console.log(`iterations: ${count}`, result)
  return maze
}

export default generate 
