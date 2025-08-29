import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import FeedbackWidget from './components/FeedbackWidget/FeedbackWidget'
import { Route, Routes } from 'react-router-dom'
import LoginPopup from './components/LoginPopup/LoginPopup'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminPage from './components/AdminPage/AdminPage'
import ProtectedMessage from './components/ProtectedMessage/ProtectedMessage'

const App = () => {

  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // ✅ login state

  return (
    <>
      <ToastContainer />
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} setIsLoggedIn={setIsLoggedIn} /> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} setIsLoggedIn={setIsLoggedIn} />
        <hr />
        <Routes>
          <Route
            path='/'
            element={
              isLoggedIn ? <AdminPage /> : <ProtectedMessage setShowLogin={setShowLogin} />
            }
          />
        </Routes>
      </div>
    </>
  )
}

export default App
