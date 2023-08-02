import FilterCheckbox from "../FilterCheckBox/FilterCheckBox";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import useFormWithValidation from '../../hooks/useFormWithValidation.jsx';

function SearcForm({ handleSearchSubmit, handleShortFilms, shortMovies }) {
    const currentUser = useContext(CurrentUserContext);
    const location = useLocation();
    const { values, handleChange, isValid, setIsValid } = useFormWithValidation();

    const [errorQuery, setErrorQuery] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        isValid ? handleSearchSubmit(values.search) : setErrorQuery('Нужно ввести ключевое слово.');
        console.log(isValid);
    };

    useEffect(() => {
        setErrorQuery('')
    }, [isValid]);

    useEffect(() => {
        if (location.pathname === '/movies' && localStorage.getItem(`${currentUser} - movieSearch`)) {
        const searchValue = localStorage.getItem(`${currentUser} - movieSearch`);
        values.search = searchValue;
        setIsValid(true);
        }
    }, [currentUser]);
    return(
        <section className="search">
            <form className="search__form" id="form" onSubmit={handleSubmit}>
                <input
                className="search__input"
                name="search"
                type="text"
                placeholder="Фильм"
                autoComplete="off"
                defaultValue={values.search || ''}
                onChange={handleChange}
                required
                ></input>
                <span className="search__error">{errorQuery}</span>
                <button className="search__button" type="submit"></button>
            </form>
            <FilterCheckbox shortMovies={shortMovies} handleShortFilms={handleShortFilms}/>
        </section>
    );
}

export default SearcForm