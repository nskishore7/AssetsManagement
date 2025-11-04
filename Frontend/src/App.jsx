import React from 'react'
import {Route, Routes } from "react-router-dom"
import ErrorPage from './pages/ErrorPage'
import Login from './pages/Login'
import Home from './pages/Home'
import ProtectedRoute from './ProtectedRoute'
import Dashboard from './components/Home/Dashboard'
import Assets from './components/Home/Assets'
import { Toaster } from 'react-hot-toast'
import Employees from './components/Home/Employees'
import Admins from './components/Home/Admins'



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
          <Route path='admins' element={<Admins/>}></Route>
          <Route path='myAssets' element={<h1>myAssets</h1>}></Route>
          <Route path='requests' element={<h1>Requests</h1>}></Route>
          <Route path='profile' element={<h1>profile</h1>}></Route>
          <Route path='employees' element={<Employees/>}></Route>
          <Route path='assigned-assets' element={<h1>Assigned assets</h1>}></Route>
        </Route>
        <Route path='*' element={<ErrorPage/>} />
      </Routes>

      <Toaster position='top-right'></Toaster>

    </>
  )
}

export default App