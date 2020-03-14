import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import generator, { makeRandomPositions, MazeInterface, randomInt } from './lib/mazeGenerator'
import Maze from './components/Maze'

import './App.css'

interface MazeSegment {
  coords: number[],
  maze: MazeInterface
}

const AppStyled = styled.div`
  /* background-color: #282c34; */
`

const Menu = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
  z-index: 1;
`

const Input = styled.input`
  width: 20px;
`

const defaultMaze: MazeInterface = {
  width: 0,
  height: 0,
  start: 'top',
  end: 'bottom'
}

function App () {
  const [maze, setMaze] = useState(defaultMaze)
  const [mazeSegments, setMazeSegments] = useState<Array<Array<MazeSegment>>>([[]])
  const [width, setWidth] = useState(10)
  const [height, setHeight] = useState(10)
  const [segmentsWidth, setSegmentsWidth] = useState(6)
  const [segmentsHeight, setSegmentsHeight] = useState(6)

  useEffect(() => {
    console.log({maze})
  }, [maze])

  useEffect(() => {
    console.log({mazeSegments})
  }, [mazeSegments])

  const findNextSegmentCoords = (coords: number[]): number[] => {
    let nextCoords: number[] = []
    const pickRandomDirection = () => {
      let minX = coords[0] - 1
      let maxX = coords[0] + 1
      let minY = coords[1] - 1
      let maxY = coords[1] + 1
      if (coords[0] === 0) {
        minX = 0
      }
      if (coords[0] === segmentsWidth) {
        maxX = coords[0]
      }
      if (coords[1] === 0) {
        minY = 0
      }
      if (coords[1] === segmentsHeight) {
        maxY = coords[1]
      }
      return [randomInt(minX, maxX), randomInt(minY, maxY)]
    }
    nextCoords = pickRandomDirection()
    if (coords === nextCoords) {
      nextCoords = findNextSegmentCoords(coords)
    }
    // TODO: check if already used... nextCoords = findNextSegmentCoords(segment)
    return nextCoords
  }
  
  const onClickNewMaze = () => {
    // setMaze(generator({
    //   width: width || 1,
    //   height: height || 1,
    //   start: 'top',
    //   end: 'bottom'
    // }))

    const startSegmentCoords = [randomInt(0, segmentsWidth), randomInt(0, segmentsHeight)]
    const endSegmentCoords = [randomInt(0, segmentsWidth), randomInt(0, segmentsHeight)]
    let currentSegment: MazeSegment

    let path: MazeSegment[] = [{
      coords: startSegmentCoords,
      maze: {
        width,
        height,
        startPosition: makeRandomPositions({ width, height }).random,
        endPosition: makeRandomPositions({ width, height }).random
      }
    }]

    currentSegment = path[0]
    let reachedEnd = false
    while (reachedEnd === false) {
      let nextSegment: MazeSegment = {
        coords: findNextSegmentCoords(currentSegment.coords),
        maze: {
          width,
          height,
          startPosition: currentSegment.maze.endPosition,
          endPosition: makeRandomPositions({ width, height }).random
        }
      }
      // TODO: pick the endposition for the next segment... maybe

      path.push(nextSegment)
      if (nextSegment.coords === endSegmentCoords) {
        reachedEnd = true
      } else {
        currentSegment = nextSegment
      }
    }

    console.log(path)

    // generate mazes for each segment
    let segments: Array<Array<MazeSegment>> = []
    for (let indexWidth = 0; indexWidth < segmentsWidth; indexWidth++) {
      segments.push([])
      for (let indexHeight = 0; indexHeight < segmentsHeight; indexHeight++) {
        let segment = path.find((s) => s.coords[0] === indexWidth && s.coords[1] === indexHeight)
        if (!segment) {
          segment = {
            coords: [indexWidth, indexHeight],
            maze: { width, height }
          }
        }
        segment.maze = generator(segment.maze)
        segments[indexWidth].push(segment)
      }
    }
    setMazeSegments(segments)
  }

  return (
    <AppStyled>
      <Menu className='menu'>
        <h1>maze</h1>
        <button onClick={onClickNewMaze}>new maze</button>
        <Input type='text' defaultValue={height} onChange={(e) => setHeight(parseInt(e.target.value))} placeholder='height' />
        <Input type='text' defaultValue={width} onChange={(e) => setWidth(parseInt(e.target.value))} placeholder='width' />
      </Menu>
      <Maze maze={maze} />
    </AppStyled>
  )
}

export default App
