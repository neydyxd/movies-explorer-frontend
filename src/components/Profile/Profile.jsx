import React from 'react';
import {useState, useEffect} from 'react';
import {useContext} from 'react';
import {useForm} from 'react-hook-form';
import Header from "../Header/Header";
import CurrentUserContext from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../hooks/useFormWithValidation.jsx';

function Profile({ handleSignOut, handleProfile }){

  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();
  const currentUser = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();
    handleProfile(values);
    console.log(values);
  }

  // после загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  const requirementValidity = (!isValid || (currentUser.name === values.name && currentUser.email === values.email));



    return(
        <>
            <Header />
            <section className="profile">
                <h3 className="profile__title">{`Привет, ${currentUser.name || ''}!`}</h3>
                <form className="profile__form" onSubmit={handleSubmit}>
                    <label className="profile__label">
                    Имя
                        <input
                        name='name'
                        className="profile__input"
                        onChange={handleChange}
                        defaultValue={values.name || ''}
                        type='text'
                        required
                        minLength="2"
                        maxLength="30"
                        pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
                        
                        />
                    </label>
                    <div className="profile__border"></div>
                    <label className="profile__label">
                    E-mail
                        <input
                        name='email'
                        className="profile__input"
                        onChange={handleChange}
                        defaultValue={values.email || ''}
                        type="email"
                        required
                        />
                    </label>
                    <button  className={`profile__button-save ${requirementValidity ? 'profile__button-save_disable' : ''}`} type="submit">Редактировать</button>
                </form>
                <button type="submit" className="profile__logout" onClick={handleSignOut}>
                        Выйти из аккаунта
                    </button>
            </section>
        </>
    );
}

export default Profile