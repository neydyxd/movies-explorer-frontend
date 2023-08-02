import logo from '../../images/logo.svg'
import { Link } from 'react-router-dom';
import React, { useState } from "react";

function Login({ handleAuthUser }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleEmailChange(evt) {
        setEmail(evt.target.value);
      }
    
      function handlePasswordChange(evt) {
        setPassword(evt.target.value);
      }
    
      function handleSubmit(e) {
        e.preventDefault();
        handleAuthUser(email, password);
        console.log(email, " ", password);
      }
    return(
        <div className="form">
            <form className='form__container' onSubmit={handleSubmit} >
                <Link to='/' className='form__logo'>
                  <img className='form__logo-image' src={logo} alt='логотип' />
                </Link>
                <h2 className='form__title'>Рады видеть!</h2>
                <h3 className='form__input-title'>E-mail</h3>
                <input className='form__input' onChange={handleEmailChange} type='email' required></input>
                <span className='form__input-error'></span>
                <h3 className='form__input-title'>Пароль</h3>
                <input className='form__input' onChange={handlePasswordChange}type='password' minLength={8}required></input>
                <span className='form__input-error'></span>
                <button className='form__button form__button_login' type='submit'>Войти</button>
                <div className='form__question'>
                    <p className='form__tag'>Еще не зарегистрированы?</p>
                    <Link to="/sign-up" className='form__link'>Регистрация</Link>
                </div> 
            </form>
        </div>
    );
}

export default Login;