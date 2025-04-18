import React, { useState, useEffect } from 'react';
import '../styles/contactform.css';
import { useAuth } from '../context/auth';
import { useCart } from '../context/cart';
import axios from 'axios';

const ContactForm = () => {
    const [cart, setcart] = useCart();
  const [auth] = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (auth?.user || cart.length > 0) {
      const { name = '', email = '', phone = '' } = auth?.user || {};
      const message = `Здравейте, интересуват ме моделите ${cart.map(p => `${p.brand.name} - ${p.name}`).join(", ")}`;
  
      setForm(prev => ({
        ...prev,
        name,
        email,
        phone,
        message
      }));
    }
  
    window.scrollTo(0, 0);
  }, [auth?.user, cart]);

  const validate = () => {
    const newErrors = {};

    if (form.name.trim().length < 3) newErrors.name = "Минимум 3 символа";
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Невалиден имейл";
    if (!/^[0-9+\s()-]{6,15}$/.test(form.phone)) newErrors.phone = "Невалиден телефон";
    if (form.message.trim().length < 8) newErrors.message = "Минимум 8 символа";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const res = await axios.post(`${process.env.REACT_APP_URL ?  process.env.REACT_APP_URL : process.env.REACT_APP_API_URL}/api/order/sendMessage`, {
      form
    });

    console.log(res)
  };

  return (
    <section className="contact_wrapper">
      <div className="container">
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-8">
            <h2 className="contact-title">Запитване</h2>
            <p className="contact-subtitle">Имаме отговор на всички ваши въпроси</p>
          </div>
        </div>

        <form className="row justify-content-center" onSubmit={handleSubmit}>
          <div className="col-md-10 col-lg-8">
            <div className="mb-4">
              <input
                type="text"
                className={`form-control custom-input ${errors.name ? 'is-invalid' : ''}`}
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Име"
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
            <div className="mb-4">
              <input
                type="email"
                className={`form-control custom-input ${errors.email ? 'is-invalid' : ''}`}
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Имейл"
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="mb-4">
              <input
                type="text"
                className={`form-control custom-input ${errors.phone ? 'is-invalid' : ''}`}
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Телефон"
              />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>
            <div className="mb-4">
              <textarea
                className={`form-control custom-textarea ${errors.message ? 'is-invalid' : ''}`}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Съобщение"
                rows="6"
              />
              {errors.message && <div className="invalid-feedback">{errors.message}</div>}
            </div>
            <div className="text-center">
              <button className="learn-more-btn" type="submit">
                Изпрати съобщение
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
