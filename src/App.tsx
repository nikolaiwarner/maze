import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import generator, { mazeInterface } from './lib/mazeGenerator'
import Maze from './components/Maze'

import './App.css'

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

const defaultMaze: mazeInterface = {
  width: 0,
  height: 0,
  start: 'top',
  end: 'bottom'
}

function App () {
  let [maze, setMaze] = useState(defaultMaze)
  let [width, setWidth] = useState(20)
  let [height, setHeight] = useState(20)

  useEffect(() => {
    console.log({maze})
  }, [maze])
  
  const onClickNewMaze = () => {
    setMaze(generator({
      width: width || 1,
      height: height || 1,
      start: 'top',
      end: 'bottom'
    }))
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
