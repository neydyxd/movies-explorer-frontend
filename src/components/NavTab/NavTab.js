import { Link } from 'react-scroll';

function NavTab(){
    return(
        <nav className="navtab">
            <Link to="about" className="navtab__link" smooth={true} duration={600}>
                О проекте
            </Link>
            <Link to="techs" className="navtab__link" smooth={true} duration={600}>
                Технологии
            </Link>
            <Link to="about-me" className="navtab__link" smooth={true} duration={600}>
                Студент
            </Link>

        </nav>
    );
}

export default NavTab;