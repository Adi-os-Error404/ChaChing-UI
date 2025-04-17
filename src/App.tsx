import React, { useState, SyntheticEvent} from 'react'
import './App.css'
import "react-toastify/dist/ReactToastify.css";
import Navbar from './Components/Navbar/Navbar'
import { Outlet } from 'react-router'
import { ToastContainer } from "react-toastify"
import { UserProvider } from './Context/useAuth';

function App() {



  return (
    <>
      <UserProvider>
        <Navbar />
        <div className='pt-32'>
          <Outlet />
          <ToastContainer />
        </div>
      </UserProvider>
    </>
  )
}

export default App
