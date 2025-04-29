import React from 'react'
import '../styles/footer.css'
import { BsLinkedin, BsGithub, BsFacebook, BsInstagram, BsTiktok } from 'react-icons/bs'
import logo from '../images/logo.png'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div>
            <section id="contact" className="footer_wrapper">
                <div className="container">
                <div className="row text-center md:text-start">                       
                        <div className="col-lg-5 footer_logo mb-4 mb-lg-0">
                            {/* <img decoding="async" src={logo} width={150} /> */}
                            <h3 style={{ color: '#CC2B52' }}>Car2U</h3>
                            <p className="footer_text" style={{ textAlign: 'justify' }}>
                                В Car2U сме отдадени на това да направим процеса по внос и покупка на автомобил от Южна Корея възможно най-лесен и сигурен. От първоначалната консултация до финалната доставка – ние сме с вас на всяка стъпка. Надеждни партньори, проверени платформи, пълна прозрачност и професионализъм.
                            </p>
                        </div>
                        <div className="col-lg-4 px-lg-5 mb-4 mb-lg-0">
                            <h3 className="footer_title" style={{ color: '#CC2B52' }}>Контакт</h3>
                            <p className="footer_text">
                                <a>+359 899763573</a><br />
                                <a>+359 899944018</a><br />
                                <a href="mailto:info@car2u.bg">info@car2u.bg</a><br />
                                <a className="footer-address">гр. София, България<br />ул. Бигла 30</a>
                            </p>
                        </div>
                        <div className="col-lg-3 mb-4 mb-lg-0">
                            <h3 className="footer_title" style={{ color: '#CC2B52' }}>Социални мрежи</h3>
                            <p>
                                <a href="https://www.facebook.com" className="footer_social_media_icon" style={{ color: 'white' }}><BsFacebook size={25} /></a>
                                <a href="https://www.instagram.com" className="footer_social_media_icon" style={{ color: 'white' }}><BsInstagram size={25} /></a>
                                <a href="https://www.linkedin.com" className="footer_social_media_icon" style={{ color: 'white' }}><BsLinkedin size={25} /></a>
                                <a href="https://www.tiktok.com" className="footer_social_media_icon" style={{ color: 'white' }}><BsTiktok size={25} /></a>
                            </p>
                            <h3 className="footer_title" style={{ color: '#CC2B52' }}>Важни връзки</h3>
                            <div className='row'>
                                <p>
                                    <Link to="/privacyPolicy">Полититка за Поверителност</Link>
                                    <br/>
                                    <Link to="/terms">Общи условия</Link>
                                    <br/>
                                    <Link to="/cookies">Политика за използване на "бисквитки"</Link>
                                </p>

                            </div>
                        </div>
                        <div className="col-12 footer_credits text-center">
                            <span>© 2025 <a> Car2U</a>™. Всички права запазени.</span>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}

export default Footer
