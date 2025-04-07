import React, { useState, SyntheticEvent} from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { Outlet } from 'react-router'

function App() {



  return (
    <>
      <Navbar />
      <div className='pt-32'>
        <Outlet />
      </div>
    </>
  )
}

export default App
