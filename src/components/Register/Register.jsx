import logo from '../../images/logo.svg'
import { Link } from 'react-router-dom';
import React, { useState } from "react";

function Register({ handleRegisterUser }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleNameChange(evt) {
        setName(evt.target.value);
      }

    function handleEmailChange(evt) {
        setEmail(evt.target.value);
      }
    
      function handlePasswordChange(evt) {
        setPassword(evt.target.value);
      }
    
      function handleSubmit(e) {
        e.preventDefault();
        handleRegisterUser(name, email, password);
        console.log(name,email, " ", password);
      }
        
    return(
        <div className="form">
            <form className='form__container' onSubmit={handleSubmit} >
                <Link to='/' className='form__logo'>
                  <img className='form__logo-image' src={logo} alt='логотип' />
                </Link>
                <h2 className='form__title'>Добро пожаловать!</h2>
                <h3 className='form__input-title'>Имя</h3>
                <input className='form__input' onChange={handleNameChange} type='name' minLength={2} maxLength={30} required></input>
                <span className='form__input-error'></span>
                <h3 className='form__input-title'>E-mail</h3>
                <input className='form__input' onChange={handleEmailChange} type='email' required></input>
                <span className='form__input-error'></span>
                <h3 className='form__input-title'>Пароль</h3>
                <input className='form__input' onChange={handlePasswordChange} type='password' minLength={8} required></input>
                <span className='form__input-error'></span>
                <button className='form__button' type='submit'>Зарегистрироваться</button>
                <div className='form__question'>
                    <p className='form__tag'>Уже зарегистрированы?</p>
                    <Link to="/sign-in" className='form__link'>Войти</Link>
                </div> 
            </form>
        </div>
    );
}

export default Register;