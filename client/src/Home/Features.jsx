import React from 'react'
import '../styles/features.css'
import secure from '../images/secure.gif'
import rotate from '../images/views.gif'
import fast from '../images/money.gif'

const Features = () => {
    return (
        <div>
            <section id="features" className="features_wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center mb-5">
                        <h3 className="features_subtitle">Сигурност от начало - до край</h3>
                        <h2 className="features_title">Гарантирана защита на всяка стъпка от процеса на внос</h2>                        
                    </div>
                    </div>
                    <div className="row">
                        {/* Feature 1 */}
                        <div className="col-lg-4 col-sm-6 mb-5">
                            <div className="ft-1 text-center header-img-section">
                                <img src={secure} width={195} />
                                <h3 className='mt-2' style={{ color: 'white' }}>Утвърден търговски внос</h3>
                                <p className="features_text" style={{ color: 'white' }}>
                                    Ние работим само с утвърдени и доверени търговци на автомобили от Южна Корея чрез платформи като <strong>Encar.com</strong>. Осигуряваме сигурен процес на покупка директно от източника - без излишни посредници.
                                </p>
                            </div>
                        </div>
                        {/* Feature 2 */}
                        <div className="col-lg-4 col-sm-6 mb-5">
                            <div className="ft-2 text-center header-img-section">
                                <img src={rotate} width={195} />
                                <h3 className='mt-2' style={{ color: 'white' }}>VisualTrust™ Проверка</h3>
                                <p className="features_text" style={{ color: 'white' }}>
                                    Получавате реални и детайлни снимки на автомобилите, директно от дилъра. Нашата система за визуална верификация <strong>VisualTrust™</strong> гарантира, че виждате точно това, което ще получите в края на покупко-продажбения процес.
                                </p>
                            </div>
                        </div>
                        {/* Feature 3 */}
                        <div className="col-lg-4 col-sm-6 mb-5">
                            <div className="ft-3 text-center header-img-section">
                                <img src={fast} width={195} />
                                <h3 className='mt-2' style={{ color: 'white' }}>Бърза и проследима доставка</h3>
                                <p className="features_text" style={{ color: 'white' }}>
                                    Нашият логистичен процес е оптимизиран за <strong>ефективност и прозрачност</strong> – контейнеризация, транспортни документи, митническо оформяне и ДДС – всичко се обработва за възможно най-бърза доставка.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Features
