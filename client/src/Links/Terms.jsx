import React from 'react';

const TermsConditions = () => (
    <div className='container marginStyle'>
        <div className="container-fluid">
            <div className="p-6 space-y-8" style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>
                <h1 className="text-4xl font-bold text-center">ОБЩИ УСЛОВИЯ</h1>
                <p className="text-lg">На електронен магазин <strong>Car2U</strong></p>

                <section>
                <h2 className="text-2xl font-semibold mt-6">I. ПРЕДМЕТ</h2>
                <p>
                    Чл. 1. Настоящите общи условия („Общи условия“) регулират отношенията между
                    „<strong>Car2U</strong>“, {"  "}
                    {/* ЕИК <strong>[Вашият ЕИК]</strong>, със седалище: */}
                    <strong>ул.Бигла 30</strong> („Доставчик“) и клиентите („Ползватели") на
                    електронен магазин <strong>www.car2u.bg</strong> („Електронен магазин"), собственост
                    на Доставчика.
                </p>
                </section>

                <section>
                <h2 className="text-2xl font-semibold">II. ДАННИ ЗА ДОСТАВЧИКА</h2>
                <p>Чл. 2. (1) Данни съгласно Закона за електронната търговия и Закона за защита на потребителите:</p>
                <ol className="list-decimal pl-6">
                    <li>Наименование: <strong>Car2U</strong></li>
                    <li>Седалище: <strong>ул. Бигла 30, София, България</strong></li>
                    {/* <li>Адрес за дейност: <strong></strong></li> */}
                    <li>Контакти: тел. <strong>+359 899763573</strong>, имейл:<strong> info@car2u.bg</strong>, www.car2u.bg</li>
                    {/* <li>Търговски регистър: ЕИК <strong>[ЕИК]</strong></li>
                    <li>ДДС регистрация: BG<strong>[ДДС номер]</strong></li>
                    <li>Жалби: адрес <strong>[Адрес]</strong>, тел. <strong>[Телефон]</strong>, имейл:<strong> support@car2u.bg</strong></li> */}
                </ol>
                <p>(2) Надзорни органи:</p>
                <ul className="list-disc pl-6">
                    <li><strong>КЗЛД</strong>: ул. „Проф. Цветан Лазаров“ 2, София, 1592; тел. (02) 915 3519; kzld@cpdp.bg</li>
                    <li><strong>КЗП</strong>: пл. „Славейков“ 4А, София, 1000; тел. (02) 933 0565; info@kzp.bg</li>
                </ul>
                </section>

                <section>
                <h2 className="text-2xl font-semibold">III. ХАРАКТЕРИСТИКИ НА МАГАЗИНА</h2>
                <p>Чл. 3. Електронният магазин на Car2U позволява:</p>
                <ul className="list-disc pl-6">
                    <li>Преглед на налични автомобили, цени и условия;</li>
                    <li>Информация за характеристики и доставка;</li>
                    <li>Сключване на договори за покупко-продажба и доставка;</li>
                    <li>Електронни изявления и уведомления;</li>
                    <li>Упражняване на права по ЗЗП, включително отказ;</li>
                </ul>
                </section>

                <section>
                <h2 className="text-2xl font-semibold">IV. ИЗПОЛЗВАНЕ НА МАГАЗИНА</h2>
                <p>
                    Чл. 6. (1) Може да пазарувате с или без регистрация. Регистрацията е безплатна.
                </p>
                <p>
                    (2) За да поръчате е необходимо да въведете: име, имейл, телефон и адрес за доставка
                    и да приемете общите условия.
                </p>
                </section>

                <section>
                <h2 className="text-2xl font-semibold">V. СКЛЮЧВАНЕ НА ДОГОВОР</h2>
                <p>Чл. 8. Процедура:</p>
                <ol className="list-decimal pl-6">
                    <li>Избор на стоки;</li>
                    <li>Попълване на формуляр и данни;</li>
                    <li>Избор на доставка и плащане;</li>
                    <li>Потвърждение с бутон „ПЛАЩАНЕ“;</li>
                    <li>Доставка на потвърждение по имейл или телефон.</li>
                </ol>
                </section>

                <section>
                <h2 className="text-2xl font-semibold">VI. СЪДЪРЖАНИЕ НА ДОГОВОРА</h2>
                <p>Чл. 9–11. Договорите са отделни за всяка поръчка, доставката се организира от Доставчика, а цената е обявена в магазина.</p>
                </section>

                <section>
                <h2 className="text-2xl font-semibold">VII. ПРАВА НА ПОТРЕБИТЕЛИТЕ</h2>
                <p>Чл. 12–15. Потребителите имат право на информация, отказ в 14-дневен срок и възстановяване на суми.</p>
                </section>

                <section>
                <h2 className="text-2xl font-semibold">XIII. ПЛАЩАНИЯ</h2>
                <p>Чл. 31. Приемаме VISA и MasterCard чрез BORICA. Всички плащания са криптирани.</p>
                <p>Чл. 32. Валути: BGN/EUR/USD, превалутиране по курс БНБ.</p>
                </section>

                <section>
                <h2 className="text-2xl font-semibold">XIV. ДРУГИ УСЛОВИЯ</h2>
                <p>Чл. 34–36. Поверителност на кореспонденцията, недействителност на клауза не засяга останалите и приложимо българско законодателство.</p>
                <p>
                    Политиките влизат в сила на: <strong>01.05.2025</strong>.
                </p>
                </section>
                <p>
                    <strong>
                        * Доставчикът не носи отговорност за косвени, последващи или неконтролируеми щети над
                        сумата, заплатена по конкретната поръчка.
                    </strong>
                </p>
            </div>
        </div>
    </div>
);

export default TermsConditions;
