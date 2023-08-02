import ava from '../../images/ava.jpg';

function AboutMe() {
    return(
        <section className="about-me" id="about-me">
           <h2 className="about-me__title">Студент</h2>
           <div className="about-me__container">
                <div className="about-me__content">
                    <h3 className="about-me__second-title">Степан</h3>
                    <p className="about-me__info">Фронтенд-разработчик, 20 лет</p>
                    <p className="about-me__description">
                    Живу и учусь в Нижнем Новгороде, учусь на факультете системного анализа. Люблю хоккей, футбол,
                    компьютерные игры. Кодить начинал во видео в ютубе, но потом понял, что нужен более серьезный преподаватель. Им стал
                    Яндекс Практикум. Благодарю его за качественное обучение.
                    </p>
                    <a
                    href="https://github.com/neydyxd"
                    className="about-me__link"
                    target="_blank"
                    rel="noreferrer">
                    Github
                    </a>
                </div>
                <img src={ava} alt="фото" className="about-me__photo" />
            </div>
        </section>
    );
}

export default AboutMe