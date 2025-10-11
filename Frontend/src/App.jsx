import React from 'react'
import {Route, Routes } from "react-router-dom"
import ErrorPage from './pages/ErrorPage'
import Login from './pages/Login'
import Home from './pages/Home'
import ProtectedRoute from './ProtectedRoute'
import Dashboard from './components/Home/Dashboard'
import Assets from './components/Home/Assets'
import { Toaster } from 'react-hot-toast'



function App() {
  return (
    <>

      {/* <Navbar/> 
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes> */}


      <Routes>
          <Route path='/login' element={<Login/>}></Route>
        <Route path='/' element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        }>

          <Route index element={<Dashboard/>}></Route>
          <Route path='assets' element={<Assets/>}></Route>
          <Route path='employees' element={<h1>Employees</h1>}></Route>
          <Route path='assigned-assets' element={<h1>Assigned assets</h1>}></Route>
        </Route>
        <Route path='*' element={<ErrorPage/>} />
      </Routes>

      <Toaster position='top-right'></Toaster>

    </>
  )
}

export default App