import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { mazeInterface } from '../lib/mazeGenerator'

interface RoomProps {
  key: string,
  x: number,
  y: number,
  totalColumns: number,
  value: number,
  isStart?: boolean,
  isEnd?: boolean
}

const MazeContainer = styled.div`
  display: flex;
  /* flex-direction: row;
  flex-wrap: wrap; */
  margin: 2rem;
  border: 10px solid #fff;
`

const roomSize = 20

const Room = styled.div<RoomProps>`
  width: ${roomSize}px;
  height: ${roomSize}px;
  /* border: 1px solid #fff; */
  position: absolute;
  top: ${props => props.y * roomSize}px;
  left: ${props => props.x * roomSize}px;
  font-size: 8px;
  color: #f00;
  display: flex;
  /* flex: 1 0 ${props => 100 / props.totalColumns - 1}%; */
  background-color: ${props => (props.isStart || props.isEnd || props.value) ? 'transparent' : '#fff'};
  outline: 10px solid ${props => (props.isStart || props.isEnd) ? '#f00' : 'transparent'};
`

function Maze (props: { maze: mazeInterface }) {
  let {startPosition, endPosition, grid} = props.maze

  if (!grid) {
    return <div />
  } else {
    return (
      <>
        {/* start: {startPosition!.x}, {startPosition!.y}
        <br />
        end: {endPosition!.x}, {endPosition!.y}
        <br /> */}
        <MazeContainer>
          {grid.map((row, rowIndex) => {
            return row.map((col, colIndex) => {
              return (
                <Room 
                  key={`${rowIndex},${colIndex}`}
                  totalColumns={grid!.length} 
                  x={colIndex} 
                  y={rowIndex} 
                  value={col} 
                  isStart={(startPosition!.x === colIndex) && (startPosition!.y === rowIndex)}
                  isEnd={(endPosition!.x === colIndex) && (endPosition!.y === rowIndex)}
                >
                  {/* {rowIndex}, {colIndex} */}
                </Room>
              )
            })
          })}
        </MazeContainer>
      </>
    )
  }
}

export default Maze
