import React from 'react'
import hero from '../images/hero.png'
import '../styles/hero.css'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div>
            <section className='banner_wrapper'>
                <div className='container'>
                    <div className='row align-items-center'>
                        <div className='col-md-6 header-img-section'>
                            <img src={hero} alt='Здравей Car2U' className='img-fluid' />
                        </div>
                        <div className="col-md-6 my-5 my-md-0 text-center text-md-start">
                            <p className="banner-subtitle">Твоят път към перфектната кола</p>
                            <h1 className="banner-title">Превърни мечтите си в <span>реалност</span> с нас</h1>
                            <p className="banner-title-text " style={{ textAlign: 'justify' }}>Изживей покупката на автомобил по нов начин. Car2U предлага богат избор, изгодни оферти, експертни съвети и безпроблемно извървяване на пътя към мечтаната ти кола. Открий, сравни и карай с увереност.</p>
                            <div className="learn-more-btn-section">
                                <Link to='/cars' className="nav-link learn-more-btn btn-header" href="#car">Разгледай сега</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="custom-shape-divider-bottom-1695048439">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>
        </div>
    )
}

export default Hero
