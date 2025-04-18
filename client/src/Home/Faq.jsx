import React from 'react'
import '../styles/faq.css'
import faq from '../images/search.png'

const Faq = () => {
    return (
        <div>
            <section id="faqs" className="faq_wrapper mb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center mb-5">
                            <p className="faq_subtitle">Ние сме тук, за да съдействаме</p>
                            <h2 className="faq_title">Често задавани въпроси</h2>                        
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-sm-12 col-lg-7 mb-5 mb-lg-0">
                            <div className="accordion accordion-flush" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                        1. Как протича процесът на внос на автомобил от Южна Корея?
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        Процесът включва консултация с нашия екип, подбор на автомобил от доверени платформи (като Encar, Autowini и др.), проверка на състоянието му, осигуряване на пълната документация за износ, организиране на транспорт, митническо оформяне в България, и доставка до клиента. Ние следим целия процес, за да осигурим прозрачност, бързина и пълна легалност.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        2. Внасяте само от Южна Корея или и от други страни?
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        Специализирани сме във внос от Южна Корея, но можем да организираме внос и от други азиатски държави, които разполагат с утвърдени търговски платформи. Процесът може да включва различни изисквания спрямо конкретната държава, но ние сме запознати с всички необходими регулации и изисквания за съответствие.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        3. Може ли да ми помогнете при избора на автомобил?
                                    </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        Разбира се! Ние ще ви предложим проверени оферти с детайлни снимки, технически описания и история на автомобилите. Работим само с доверени дилъри и извършваме допълнителна проверка, за да гарантираме, че всичко отговаря на реалността.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingFour">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                        4. Как става плащането и сигурно ли е?
                                    </button>
                                </h2>
                                <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        Плащането се извършва по банков път или чрез ескроу услуга. Средствата се задържат до потвърждение за изпращане на автомобила. Осигуряваме пълна прозрачност – фактури, договори и документи за всяка транзакция.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingFive">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                        5. Мога ли да финансирам вноса или трябва да платя всичко предварително?
                                    </button>
                                </h2>
                                <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        Възможно е да се използва финансиране чрез банки или кредитни институции, като ние съдействаме с нужните документи. Повечето клиенти предоставят първоначална вноска, а остатъкът се плаща преди изпращането или при получаване на автомобила.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingSix">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                        6. Как се извършва транспортирането на автомобила?
                                    </button>
                                </h2>
                                <div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        Използваме два основни метода – Ro-Ro (рол-он/рол-оф) и контейнерен транспорт. Изборът зависи от стойността на автомобила и желаната защита. Осигуряваме проследяване по време на транспорта.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingSeven">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                                        7. Колко време отнема доставката на автомобила?
                                    </button>
                                </h2>
                                <div id="collapseSeven" className="accordion-collapse collapse" aria-labelledby="headingSeven" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        Средно между 6 и 8 седмици от момента на поръчката до доставката във вашия град. Времето включва подготовка на документите, транспорт по море и митническо освобождаване.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingEight">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                                        8. Какви документи са необходими за вноса и регистрацията?
                                    </button>
                                </h2>
                                <div id="collapseEight" className="accordion-collapse collapse" aria-labelledby="headingEight" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        Осигуряваме фактури, сертификат за произход, декларации за митницата, оригинален талон, доклад за съответствие и преводи. Всички документи се комплектоват и предоставят за регистрация в съответните държавни органи.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingNine">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
                                        9. Какви са митата и данъците при внос?
                                    </button>
                                </h2>
                                <div id="collapseNine" className="accordion-collapse collapse" aria-labelledby="headingNine" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        За България митото е 10% върху стойността на автомобила, а ДДС е 20%. При внос от Южна Корея често може да се променят транспортните тарифи. Също така се начислява еко такса според възрастта на автомобила. Всички плащания се извършват с наша помощ и пълна отчетност.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTen">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
                                        10. Как гарантирате надеждността на чуждестранните дилъри?
                                    </button>
                                </h2>
                                <div id="collapseTen" className="accordion-collapse collapse" aria-labelledby="headingTen" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        Работим само с утвърдени платформи като Encar, Autowini, KB Chachacha и извършваме собствена проверка на всеки търговец. Анализираме история на превозните средства, документи, рейтинги и при нужда организираме независим оглед на място с присъствие на доверено лице от трета страна.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingEleven">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEleven" aria-expanded="false" aria-controls="collapseEleven">
                                        11. Ще видя ли снимки и състояние на автомобила преди покупка?
                                    </button>
                                </h2>
                                <div id="collapseEleven" className="accordion-collapse collapse" aria-labelledby="headingEleven" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        Да – изпращаме снимки отвън, отвътре, двигател, шаси и всички релевантни документи. Извършваме проверка на пробег, катастрофи и сервизна история, където е налична.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwelve">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwelve" aria-expanded="false" aria-controls="collapseTwelve">
                                        12. Извършвате ли техническа проверка и гарантирате ли състоянието?
                                    </button>
                                </h2>
                                <div id="collapseTwelve" className="accordion-collapse collapse" aria-labelledby="headingTwelve" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        Да. Преди изпращане правим технически преглед чрез проверени партньори. Изготвяме доклад със снимки и описания. Ако състоянието не отговаря на уговореното – реагираме незабавно.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThirteen">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThirteen" aria-expanded="false" aria-controls="collapseThirteen">
                                        13. Помагате ли при регистрацията на автомобила в България?
                                    </button>
                                </h2>
                                <div id="collapseThirteen" className="accordion-collapse collapse" aria-labelledby="headingThirteen" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        Да. Събираме и комплектоваме всички документи, нужни за легализацията на автомобила в съответните институции. Въпреки това отговорността по администрация и регистрация на автомобила фигурира отговорност за лицето, бъдещ собственик на автомобила.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingFourteen">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFourteen" aria-expanded="false" aria-controls="collapseFourteen">
                                        14. Има ли гаранция след получаването на автомобила?
                                    </button>
                                </h2>
                                <div id="collapseFourteen" className="accordion-collapse collapse" aria-labelledby="headingFourteen" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        Обикновено употребяваните автомобили не винаги идват с фабрична гаранция, но ние предлагаме гаранционен период за проверка и съдействие при проблеми. При желание можем да организираме и разширена гаранция чрез партньори.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingFifteen">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFifteen" aria-expanded="false" aria-controls="collapseFifteen">
                                        15. Какво става ако има проблем или съм недоволен от колата?
                                    </button>
                                </h2>
                                <div id="collapseFifteen" className="accordion-collapse collapse" aria-labelledby="headingFifteen" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        Ако се открие несъответствие – ние водим преговори с продавача или организираме ремонт. При транспортна повреда подаваме застрахователна щета. Имаме договори с продавачите и възможност за компенсация или връщане при сериозен проблем.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingSixteen">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSixteen" aria-expanded="false" aria-controls="collapseSixteen">
                                        16. Мога ли да поръчам модификации или допълнителни аксесоари?
                                    </button>
                                </h2>
                                <div id="collapseSixteen" className="accordion-collapse collapse" aria-labelledby="headingSixteen" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        Да. Има възможност да инсталираме навигации, камери, сензори, нови гуми, аудио системи и др. преди изпращане, при успешна консултация с търговеца. Предлагаме също козметични подобрения или технически модификации за съответствие с българските изисквания.
                                    </div>
                                </div>
                            </div>

                            </div>
                        </div>
                        <div className="col-sm-12 col-lg-4">
                            <img decoding="async" src={faq} className="img-fluid hideOnMob" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Faq
