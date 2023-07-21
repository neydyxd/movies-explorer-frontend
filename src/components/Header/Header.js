import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg'
import account from '../../images/account.svg'
import menu from '../../images/menu.svg'
import Navigation from '../Navigation/Navigation';
function Header() {
    const [isClicked, setIsClicked] = useState(false);
    let location = useLocation();

    function handleOpen() {
        setIsClicked(true);
    }

    function handleClose() {
        setIsClicked(false);
    }

    return(
        <>
        {(location.pathname === '/') ? (
        <header className="header">
            <div className='header__container'>
                <Link to="/" className="header__logo">
                    <img src={logo} alt="логотип" />
                </Link>
                <div className='header__buttons'>
                    <Link to="/sign-up" className='header__signup'>Регистрация</Link>
                    <Link to="/sign-in" className='header__signin'>Войти</Link>
                </div>
            </div>
        </header>
        ) : (
        <header className="header header-movies">
            <div className='header__container'>
                <Link to="/" className="header__logo">
                    <img src={logo} alt="логотип" />
                </Link>
                <div className='header__buttons header-movies__buttons'>
                    <NavLink exact to="/movies"
                    className={({ isActive }) =>
                    `button ${
                      isActive ? "header__button_active" : "header__button"
                    }`
                  }
                  >Фильмы</NavLink>
                    <NavLink exact to="/saved-movies"
                    className={({ isActive }) =>
                    `button ${
                      isActive ? "header__button_active" : "header__button"
                    }`
                  } 
                  activeClassName='header__button_active'>Сохраненные фильмы</NavLink>
                    <button onClick={handleOpen} className="header__menu-button">
                        <img src={menu} alt="меню" />
                    </button>
                </div>
                <Link to="/profile" className="header__account-button">
                        <h3 className='header__account-title'>Аккаунт</h3>
                        <div className='header__account-container'>
                            <img src={account} alt='иконка человека' />
                        </div>
                </Link>
            </div>
            {isClicked ? <Navigation handleClose={handleClose} /> : ''}
        </header>
        )}
        </>
    );     
}
export default Header;