import { useState } from 'react'
import Dashboard from './pages/dashboard';
import { Routes, Route } from "react-router";

import './App.css'

function App() {

  return (
    <>
      
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    
    </>
  )
}

export default App
