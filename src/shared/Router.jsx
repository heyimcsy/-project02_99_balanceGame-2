import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '../components/Header'
import CardList from '../pages/CardList'
import Detail from '../pages/Detail'
import Error from '../pages/Error'
import Main from '../pages/Home'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Edit from '../pages/Edit'

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/games" element={<CardList />} />
        <Route path="/game/:id" element={<Edit />} />
        <Route path="/games/:gameId" element={<Detail />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
