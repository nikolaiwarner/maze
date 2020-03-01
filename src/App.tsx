import React, { useState, useEffect } from 'react'

import generator, { mazeInterface } from './lib/mazeGenerator'
import Maze from './components/Maze'

import './App.css'

const defaultMaze: mazeInterface = {
  width: 0,
  height: 0,
  start: 'top',
  end: 'bottom'
}

function App () {
  let [maze, setMaze] = useState(defaultMaze)

  useEffect(() => {
    console.log({maze})
  }, [maze])
  
  const onClickNewMaze = () => {
    setMaze(generator({
      width: 40,
      height: 40,
      start: 'top',
      end: 'bottom'
    }))
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>maze</h1>
        <button onClick={onClickNewMaze}>new maze</button>
        <Maze maze={maze} />
      </header>
    </div>
  )
}

export default App
