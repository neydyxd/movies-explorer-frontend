import logo from '../../images/logo.svg'
import { Link } from 'react-router-dom';
function Login() {
    return(
        <div className="form">
            <div className='form__container'>
                <img className='form__logo' src={logo} alt='логотип' />
                <h2 className='form__title'>Рады видеть!</h2>
                <h3 className='form__input-title'>E-mail</h3>
                <input className='form__input' minLength={2}></input>
                <h3 className='form__input-title'>Пароль</h3>
                <input className='form__input' minLength={2}></input>
                <button className='form__button form__button_login'>Войти</button>
                <div className='form__question'>
                    <p className='form__tag'>Еще не зарегистрированы?</p>
                    <Link to="/sign-up" className='form__link'>Регистрация</Link>
                </div> 
            </div>
        </div>
    );
}

export default Login;