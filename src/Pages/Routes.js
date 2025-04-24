import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Frontend from './Frontend'
import { useAuthContext } from 'Context/AuthContext'
import Footer from 'Components/Footer'
export default function Index() {
  const isAuth = useAuthContext()
  return (
    <>
      <Routes>
        <Route path='/*' element={<Frontend />} />
      </Routes>
      <Footer />
    </>
  )
}
