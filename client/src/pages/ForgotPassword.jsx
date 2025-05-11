import React, { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import forgot from '../images/forgot.png'
import '../styles/hero.css'
import '../styles/auth.css'

export default function ForgotPassword() {
  const [email, setEmail]       = useState("")
  const [status, setStatus]     = useState("form")  // <-- no generics here
  const [message, setMessage]   = useState("")
  const navigate                 = useNavigate()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    if (!email.trim()) {
      toast.error('Имейлът е задължителен')
      return
    }
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL || process.env.REACT_APP_API_URL}/api/user/forgot-password`,
        { email }
      )
      setMessage(data.message)
      setStatus(data.success ? "sent" : "error")
    } catch {
      setMessage('Грешка на сървъра')
      setStatus("error")
    }
  }

  const renderContent = () => {
    if (status === "form") {
      return (
        <form className="col-md-6 right-box" onSubmit={handleSubmit}>
          <div className="header-text mb-4">
            <h2>Забравена парола</h2>
            <p>Въведете вашия имейл за нулиране на паролата</p>
          </div>
          <div className="input-group mb-3">
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              placeholder="Вашият имейл"
              required
              className="form-control"
            />
          </div>
          <button
            type="submit"
            className="btn btn-lg text-white mb-3"
            style={{ backgroundColor: '#CC2B52', width: '100%' }}
          >
            Изпрати линк
          </button>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => navigate('/login')}
          >
            ← Назад към вход
          </button>
        </form>
      )
    }

    const title = status === "sent" ? "Успешно изпратено!" : "Грешка"
    const icon = status === "sent"
      ? <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '3rem' }} />
      : <i className="bi bi-x-circle-fill text-danger" style={{ fontSize: '3rem' }} />

    return (
      <div className="col-md-6 right-box text-center p-4">
        {icon}
        <h2 className="mt-3">{title}</h2>
        <p>{message}</p>
        {status === "error" ? (
          <button
            className="btn btn-outline-dark mt-3"
            onClick={() => setStatus("form")}
          >
            Опитай пак
          </button>
        ) : (
          <button
            className="btn btn-outline-dark mt-3"
            onClick={() => navigate('/login')}
          >
            Вход
          </button>
        )}
      </div>
    )
  }

  return (
    <div className='marginStyle'>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="row border rounded-5 p-3 bg-white shadow box-area reverseCol">
          <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
            <img src={forgot} className="img-fluid animateImg" width={400} alt="Forgot Password" />
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
