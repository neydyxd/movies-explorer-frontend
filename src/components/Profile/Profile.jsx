import React from 'react';
import {useState, useEffect} from 'react';
import {useContext} from 'react';
import {useForm} from 'react-hook-form';
import Header from "../Header/Header";
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Profile(){



    return(
        <>
            <Header />
            <section className="profile">
                <h3 className="profile__title">Привет,!</h3>
                <form className="profile__form" >
                    <label className="profile__label">
                    Имя
                        <input
                        className="profile__input"
                        
                        />
                    </label>
                    <div className="profile__border"></div>
                    <label className="profile__label">
                    E-mail
                        <input
                        className="profile__input"
                       
                        />
                    </label>
                    <button className="profile__button-save" type="submit">Редактировать</button>
                    <button type="button" className="profile__logout">
                        Выйти из аккаунта
                    </button>
                </form>
            </section>
        </>
    );
}

export default Profile