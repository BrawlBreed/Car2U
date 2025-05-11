import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import register from '../images/register.png'
import toast from 'react-hot-toast';
import '../styles/hero.css'

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate()

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            toast.error('Невалиден формат на имейл');
            return false;
        }
        if (!name.trim()) {
            toast.error('Името е задължително');
            return false;
        }
        if (!email.trim()) {
            toast.error('Имейлът е задължителен');
            return false;
        }
        if (!password.trim()) {
            toast.error('Паролата е задължителна');
            return false;
        }
        if (!phone.trim()) {
            toast.error('Телефонният номер е задължителен');
            return false;
        }
        if (!address.trim()) {
            toast.error('Адресът е задължителен');
            return false;
        }
        try {
            const res = await axios.post(`${process.env.REACT_APP_URL || process.env.REACT_APP_API_URL}/api/user/register`, {
                name, email, password, phone, address
            });
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/login')
            }
        } catch (err) {
            toast.error('Грешка на сървъра')
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
                            <img src={register} className="img-fluid" width={500} alt="Register" />
                        </div>
                    </div>
                    <div className="col-md-6 right-box">
                        <div className="row align-items-center">
                            <div className="header-text mb-4">
                                <h2>Добре дошли</h2>
                                <p>Вашата мечтана кола Ви очаква!</p>
                            </div>
                            <div className="input-group d-flex align-items-center mb-3">
                                <div className="form-outline flex-fill mb-0">
                                    <input
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        placeholder="Вашето име"
                                        required
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="input-group d-flex align-items-center mb-3">
                                <div className="form-outline flex-fill mb-0">
                                    <input
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="Вашият имейл"
                                        required
                                        type="email"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="input-group d-flex align-items-center mb-3">
                                <div className="form-outline flex-fill mb-0">
                                    <input
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder="Вашата парола"
                                        required
                                        type="password"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="input-group d-flex align-items-center mb-3">
                                <div className="form-outline flex-fill mb-0">
                                    <input
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                        placeholder="Вашият телефон"
                                        required
                                        type="tel"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="input-group d-flex align-items-center mb-3">
                                <div className="form-outline flex-fill mb-0">
                                    <input
                                        value={address}
                                        onChange={e => setAddress(e.target.value)}
                                        placeholder="Вашият адрес"
                                        required
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="d-flex flex-row align-items-center mt-4">
                                <div className="form-outline flex-fill mb-0">
                                    <button
                                        className="btn btn-lg text-white"
                                        type="button"
                                        onClick={handleSubmit}
                                        style={{ backgroundColor: '#CC2B52', width: '100%' }}
                                    >
                                        Регистрация
                                    </button>
                                </div>
                            </div>
                            <div className="d-flex flex-row align-items-center my-3">
                                <div className="form-outline flex-fill mb-0">
                                    <Link
                                        to='/login'
                                        className="btn btn-outline-dark btn-lg btn-block"
                                        style={{ width: '100%' }}
                                        type="button"
                                    >
                                        Вход
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
