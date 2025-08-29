import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginPopup = ({ setShowLogin, setIsLoggedIn }) => {
  const { setToken, url } = useContext(StoreContext)

  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const onLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${url}/api/user/login`, data)
      if (response.data.success && response.data.role==='admin') {
        setToken(response.data.token)
        localStorage.setItem("token", response.data.token)

        // ✅ Mark user as logged in
        setIsLoggedIn(true)

        setShowLogin(false)
        toast.success("Login successful")
      } else {
        toast.error(response.data.message || "Login failed")
      }
    } catch (err) {
      toast.error("Error logging in")
    }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>Admin Login</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="close" />
        </div>
        <div className="login-popup-inputs">
          <input
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder='Admin Email'
            required
          />
          <input
            name='password'
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder='Password'
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

// ✅ default export
export default LoginPopup
