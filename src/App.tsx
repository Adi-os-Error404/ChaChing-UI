import React, { useState, SyntheticEvent} from 'react'
import './App.css'
import "react-toastify/dist/ReactToastify.css";
import Navbar from './Components/Navbar/Navbar'
import { Outlet } from 'react-router'
import { ToastContainer } from "react-toastify"

function App() {



  return (
    <>
      <Navbar />
      <div className='pt-32'>
        <Outlet />
        <ToastContainer />
      </div>
    </>
  )
}

export default App
