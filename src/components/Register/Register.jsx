import logo from '../../images/logo.svg'
import { Link } from 'react-router-dom';
function Register() {
    return(
        <div className="form">
            <div className='form__container'>
                <img className='form__logo' src={logo} alt='логотип' />
                <h2 className='form__title'>Добро пожаловать!</h2>
                <h3 className='form__input-title'>Имя</h3>
                <input className='form__input' minLength={2} required></input>
                <h3 className='form__input-title'>E-mail</h3>
                <input className='form__input' minLength={2} required></input>
                <h3 className='form__input-title'>Пароль</h3>
                <input className='form__input' minLength={8} required></input>
                <label className='form__label'>Что-то пошло не так ...</label>
                <button className='form__button'>Зарегистрироваться</button>
                <div className='form__question'>
                    <p className='form__tag'>Уже зарегистрированы?</p>
                    <Link to="/sign-in" className='form__link'>Войти</Link>
                </div> 
            </div>
        </div>
    );
}

export default Register;