// src/components/ResetPassword.jsx
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import resetImg from '../images/reset.png'      // add an appropriate image
import '../styles/hero.css'
import '../styles/auth.css'

export default function ResetPassword() {
  const { token } = useParams()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    if (!password.trim()) {
      toast.error('Паролата е задължителна')
      return
    }
    if (password !== confirm) {
      toast.error('Паролите не съвпадат')
      return
    }
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL||process.env.REACT_APP_API_URL}/api/user/reset-password`,
        { token, password }
      )
      if (data.success) {
        toast.success(data.message)
        setTimeout(() => navigate('/login'), 1500)
      } else {
        toast.error(data.message)
      }
    } catch {
      toast.error('Грешка на сървъра')
    }
  }

  return (
    <div className="marginStyle">
      <div className="container d-flex justify-content-center align-items-center">
        <div className="row border rounded-5 p-3 bg-white shadow box-area reverseCol">
          {/* Left image */}
          <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
            <img src={resetImg} className="img-fluid animateImg" width={400} alt="Reset Password" />
          </div>
          {/* Right form */}
          <form className="col-md-6 right-box p-4" onSubmit={handleSubmit}>
            <div className="header-text mb-4">
              <h2>Смяна на парола</h2>
              <p>Въведете новата си парола по-долу</p>
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                placeholder="Нова парола"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="input-group mb-4">
              <input
                type="password"
                placeholder="Повтори паролата"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-lg text-white w-100"
              style={{ backgroundColor: '#CC2B52' }}
            >
              Задай парола
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
