import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import login from '../images/login.png'
import '../styles/hero.css'
import '../styles/auth.css'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate()
    const location = useLocation();

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim()) {
            toast.error('Имейлът е задължителен');
            return false;
        }
        if (!validateEmail(email)) {
            toast.error('Невалиден формат на имейл');
            return false;
        }
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_URL || process.env.REACT_APP_API_URL}/api/user/login`,
                { email, password }
            );
            if (res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state || '/');
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            toast.error('Грешка на сървъра');
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <div className='marginStyle'>
            <div className="container d-flex justify-content-center align-items-center">
                <div className="row border rounded-5 p-3 bg-white shadow box-area reverseCol">
                    <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
                        <div className="featured-image mb-3 animateImg">
                            <img src={login} className="img-fluid" width={500} alt="Login" />
                        </div>
                    </div>
                    <form className="col-md-6 right-box" onSubmit={handleSubmit}>
                        <div className="row align-items-center">
                            <div className="header-text mb-4">
                                <h2>Добре дошли</h2>
                                <p>Радваме се, че сте отново при нас!</p>
                            </div>
                            <div className="input-group d-flex align-items-center mb-3">
                                <div className="form-outline flex-fill mb-0">
                                    <input
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                        type="email"
                                        placeholder="Вашият имейл"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="input-group d-flex align-items-center mb-1">
                                <div className="form-outline flex-fill mb-0">
                                    <input
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                        type="password"
                                        placeholder="Вашата парола"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="text-end mb-3">
                                <Link to="/forgot-password" className="small text-decoration-none">
                                    Забравена парола?
                                </Link>
                            </div>
                            <div className="d-flex flex-row align-items-center mt-2">
                                <div className="form-outline flex-fill mb-0">
                                    <button
                                        className="btn btn-lg text-white"
                                        type="submit"
                                        style={{ backgroundColor: '#CC2B52', width: '100%' }}
                                    >
                                        Вход
                                    </button>
                                </div>
                            </div>
                            <div className="d-flex flex-row align-items-center my-3">
                                <div className="form-outline flex-fill mb-0">
                                    <Link
                                        to='/register'
                                        className="btn btn-outline-dark btn-lg btn-block"
                                        style={{ width: '100%' }}
                                        type="button"
                                    >
                                        Регистрация
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
