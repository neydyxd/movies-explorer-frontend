import React from "react";
import Header from "../Header/Header";

function Profile(){
    return(
        <>
            <Header />
            <section className="profile">
                <h3 className="profile__title">Привет, Виталий!</h3>
                <form className="profile__form">
                    <label className="profile__label">
                    Имя
                        <input
                        className="profile__input"
                        value={'Виталий'} />
                    </label>
                    <div className="profile__border"></div>
                    <label className="profile__label">
                    E-mail
                        <input
                        className="profile__input"
                        value={'pochta@yandex.ru'} />
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