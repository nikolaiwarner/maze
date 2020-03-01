import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { mazeInterface, findWalls } from '../lib/mazeGenerator'

const roomSize = 30
const wallWidth = 10

interface MazeContainerInterface {
  width: number,
  height: number
}

interface RoomProps {
  key: string,
  maze: mazeInterface,
  x: number,
  y: number,
  totalColumns: number,
  value: number,
  isStart?: boolean,
  isEnd?: boolean,
  title?: string
}

interface WallProps {
  north?: boolean,
  south?: boolean,
  east?: boolean,
  west?: boolean,
}

const MazeContainer = styled.div<MazeContainerInterface>`
  position: relative;
  margin: auto;
  width: ${props => props.width * roomSize}px;
  height: ${props => props.height * roomSize}px;
  border: 10px solid #282c34;
  background: #fff;
`

const RoomContainer = styled.div<RoomProps>`
  width: ${roomSize}px;
  height: ${roomSize}px;
  position: absolute;
  top: ${props => props.y * roomSize}px;
  left: ${props => props.x * roomSize}px;
  font-size: 8px;
  color: #f00;
`
const RoomStart = styled(RoomContainer)`
  width: 10px;
  height: 10px;
  margin: 12px 12px;
  background-color: red;
  border-radius: ${roomSize/2}px;
`
const RoomEnd = styled(RoomStart)`
  background-color: green;
`

const Wall = styled.div<WallProps>`
  position: absolute;
  background-color: #282c34;
  border-radius: 0px;
  box-shadow: 1px 3px 0px #282c3430;
`
const WallNorth = styled(Wall)`
  top: 0;
  left: 0;  
  width: ${roomSize}px;
  height: ${wallWidth}px;
`
const WallSouth = styled(Wall)`
  top: ${roomSize}px;
  left: 0;
  position: absolute;
  width: ${roomSize}px;
  height: ${wallWidth}px;
`
const WallEast = styled(Wall)`
  top: 0;
  left: ${roomSize}px;
  position: absolute;
  width: ${wallWidth}px;
  height: ${roomSize}px;
`
const WallWest = styled(Wall)`
  top: 0;
  left: 0;
  position: absolute;
  width: ${wallWidth}px;
  height: ${roomSize}px;
`

function Room (props: RoomProps) {
  const walls = findWalls(props, props.maze)
  return (
    <RoomContainer {...props}>
      {!!walls.north && <WallNorth />}
      {!!walls.south && <WallSouth />}
      {!!walls.east && <WallEast />}
      {!!walls.west && <WallWest />}
    </RoomContainer>
  )
}

function Maze (props: { maze: mazeInterface }) {
  let {startPosition, endPosition, grid} = props.maze
  if (!grid) {
    return null
  } else {
    return (
      <MazeContainer width={props.maze.width} height={props.maze.height}>
        {grid.map((row, rowIndex) => {
          return row.map((col, colIndex) => {
            const isStart = (startPosition!.x === colIndex) && (startPosition!.y === rowIndex)
            const isEnd = (endPosition!.x === colIndex) && (endPosition!.y === rowIndex)
            if (isStart) {
              return (
                <RoomStart 
                  maze={props.maze}
                  key={`${rowIndex},${colIndex}`}
                  totalColumns={grid!.length} 
                  x={colIndex} 
                  y={rowIndex} 
                  value={col} 
                  isStart={isStart}
                  isEnd={isEnd}
                />
              )
            }
            if (isEnd) {
              return (
                <RoomEnd
                  maze={props.maze}
                  key={`${rowIndex},${colIndex}`}
                  totalColumns={grid!.length} 
                  x={colIndex} 
                  y={rowIndex} 
                  value={col} 
                  isStart={isStart}
                  isEnd={isEnd}
                />
              )
            }
            if (col === 1) {
              return (
                <Room 
                  maze={props.maze}
                  key={`${rowIndex},${colIndex}`}
                  totalColumns={grid!.length} 
                  x={colIndex} 
                  y={rowIndex} 
                  value={col} 
                  isStart={isStart}
                  isEnd={isEnd}
                />
              )
            } else {
              return null
            }
          })
        })}
      </MazeContainer>
    )
  }
}

export default Maze
