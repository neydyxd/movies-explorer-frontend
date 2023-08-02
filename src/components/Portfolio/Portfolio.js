import arrow from '../../images/arrow.svg';

function Portfolio() {
    return(
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <nav className="portfolio__list">
                <a
                href="https://github.com/neydyxd/how-to-learn"
                className="portfolio__link portfolio__link-border"
                target="_blank"
                rel="noreferrer">
                <p className="portfolio__text">Статичный сайт</p>
                <img className="portfolio__image" src={arrow} alt="стрелка" />
                </a>
                <a
                href="https://github.com/neydyxd/russian-travel"
                className="portfolio__link portfolio__link-border"
                target="_blank"
                rel="noreferrer">
                <p className="portfolio__text">Адаптивный сайт</p>
                <img className="portfolio__image" src={arrow} alt="стрелка" />
                </a>
                <a
                href="https://neydyxd.github.io/react-mesto-auth/"
                className="portfolio__link"
                target="_blank"
                rel="noreferrer">
                <p className="portfolio__text">Одностраничное приложение</p>
                <img className="portfolio__image" src={arrow} alt="стрелка" />
                </a>
            </nav>
        </section>
    );
}

export default Portfolio;