import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import AIAgent from './Agent'
export default function Frontend() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/agent' element={<AIAgent />} />
      </Routes>
    </>
  )
}
