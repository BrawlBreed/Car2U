import React from 'react'
import '../styles/about.css'
import about from '../images/aboutUs1.png'
import about2 from '../images/aboutUs2.png'
import about3 from '../images/aboutUs3.png'

const About = () => {
    return (
        <div>
            <section id="about" className="about_wrapper">
                <div className="container">
                    <div className="row align-items-center" >
                        <div className="col-sm-12 col-lg-5 text-center text-lg-start">
                            <p className="about_number">1</p>
                            <h2 className="about_title">Свържете се с нас и започнете процеса</h2>
                            <p className="about_text" style={{ textAlign: 'justify' }}>
                                Всичко започва с първата стъпка – консултация с нашия екип. Споделете какъв автомобил търсите, какви са предпочитанията ви и бюджета. 
                                Ние ще ви предоставим професионален съвет, ще ви предложим възможни модели и ще ви насочим към най-доброто решение според вашите нужди.
                                Работим само с проверени дилъри в Южна Корея, където селектираме автомобили в отлично техническо състояние и с прозрачна история.
                            </p>
                            <div className="my-5">
                                <a className="learn-more-btn" href="#cars">Започнете консултация</a>
                            </div>
                        </div>
                        <div className="col-sm-12 col-lg-7 text-center text-md-start">
                            <img decoding="async" src={about} className="img-fluid" alt="Консултация с клиента" />
                        </div>
                    </div>
                </div>

                <div className="innovate mt-5">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-sm-12 col-lg-6 px-5 text-center text-md-start">
                                <img decoding="async" src={about2} className="img-fluid" alt="Процес по доставка" />
                            </div>
                            <div className="col-sm-12 col-lg-6 text-center text-lg-start">
                                <p className="about_number">2</p>
                                <h2 className="about_title">Организираме всичко – от дилъра до документите</h2>
                                <p className="about_text" style={{ textAlign: 'justify' }}>
                                    След като изберете автомобил, ние поемаме всичко останало – осъществяваме контакт с корейския дилър, организираме покупката,
                                    подготвяме необходимите документи за вноса (транспортна фактура, Bill of Lading, експортен сертификат) и уговаряме логистиката.
                                    Съдействаме при митническото оформяне и заплащането на мито и ДДС, а автомобилът пристига в контейнер или чрез Ro-Ro транспорт.
                                </p>
                                <div className="mt-5">
                                    <a className="learn-more-btn btn-header" href="#brands">Научете повече</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row align-items-center" >
                        <div className="col-sm-12 col-lg-5 text-center text-lg-start">
                            <p className="about_number">3</p>
                            <h2 className="about_title">Получете автомобила си и се насладете</h2>
                            <p className="about_text" style={{ textAlign: 'justify' }}>
                                Пристигаме до финалната стъпка – доставката на автомобила. Когато колата пристигне в България, ние ви я предаваме с пълния пакет документи, 
                                готови за регистрация. Включваме съдействие при оформяне на документите в КАТ и гарантираме, че получавате изрядно подготвен автомобил.
                                Така вие само се качвате и потегляте – без усложнения, с пълно спокойствие.
                            </p>
                            <div className="my-5">
                                <a className="learn-more-btn" href="#cars">Разгледайте наличните автомобили</a>
                            </div>
                        </div>
                        <div className="col-sm-12 col-lg-7 text-center text-md-start">
                            <img decoding="async" src={about3} className="img-fluid" alt="Получаване на автомобила" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About
