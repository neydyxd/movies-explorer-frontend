import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Footer from '../Footer/Footer'   
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    filterMovies, // фильтрация начального массива всех фильмов по запросу
    filterShortMovies, // фильтрация по длительности
  } from '../../utils/utils.js';
  import useFormWithValidation from '../../hooks/useFormWithValidation.jsx';

function SavedMovies({ onDeleteClick, savedMoviesList, setIsInfoTooltip, loggedIn }) {
  const location = useLocation();
  const currentUser = useContext(CurrentUserContext);
  const [shortMovies, setShortMovies] = useState(false); 
  const [NotFound, setNotFound] = useState(false); 
  const [showedMovies, setShowedMovies] = useState(savedMoviesList); 
  const [filteredMovies, setFilteredMovies] = useState(showedMovies); 
  const { values, handleChange, isValid, setIsValid } = useFormWithValidation();
  const [errorQuery, setErrorQuery] = useState('');
  const input = values.search || ''


  function handleSubmit(e) {
    e.preventDefault();
    isValid ? handleSearchSubmit(values.search) : setErrorQuery('Нужно ввести ключевое слово.');
};

useEffect(() => {
    setErrorQuery('')
}, [isValid]);

useEffect(() => {
    if (location.pathname === '/movies' && localStorage.getItem(`currentUser - movieSearch`)) {
    const searchValue = localStorage.getItem(`currentUser - movieSearch`);
    values.search = searchValue;
    setIsValid(true);
    }
}, [currentUser]);

  function handleSearchSubmit(inputValue) {
    const moviesList = filterMovies(savedMoviesList, inputValue, shortMovies);
    if (moviesList.length === 0) {
      setNotFound(true);
      setIsInfoTooltip({
        isOpen: true,
        successful: false,
        text: 'Ничего не найдено.',
      });
    } else {
      setNotFound(false);
      setFilteredMovies(moviesList);
      setShowedMovies(moviesList);
    }
  }

  function handleShortFilms() {
    if (!shortMovies) {
      setShortMovies(true);
      localStorage.setItem(`currentUser - shortSavedMovies`, true);
      setShowedMovies(filterShortMovies(filteredMovies));
      filterShortMovies(filteredMovies).length === 0 ? setNotFound(true) : setNotFound(false);
    } else {
      setShortMovies(false);
      localStorage.setItem(`currentUser - shortSavedMovies`, false);
      filteredMovies.length === 0 ? setNotFound(true) : setNotFound(false);
      setShowedMovies(filteredMovies);
    }
  }

  useEffect(() => {
    if (localStorage.getItem(`currentUser - shortSavedMovies`) === 'true') {
      setShortMovies(true);
      setShowedMovies(filterShortMovies(savedMoviesList));
    } else {
      setShortMovies(false);
      setShowedMovies(savedMoviesList);
    }
  }, [savedMoviesList, currentUser]);

  useEffect(() => {
    setFilteredMovies(savedMoviesList);
    savedMoviesList.length !== 0 ? setNotFound(false) : setNotFound(true);
  }, [savedMoviesList]);

  useEffect(() => {
    if (values.search !== undefined) {
    handleSearchSubmit(values.search);
    console.log(values.search);
    }
  }, [shortMovies])


    return(
        <section className="movies">
            <Header loggedIn={loggedIn} />
            <main>
                <SearchForm
                handleShortFilms={handleShortFilms}
                shortMovies={shortMovies}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                input={input}
                errorQuery={errorQuery}
                />
                {!NotFound && (
                    <MoviesCardList
                    moviesList={showedMovies}
                    savedMoviesList={savedMoviesList}
                    onDeleteClick={onDeleteClick}
                    />
                )}
            </main>
            <Footer />
        </section>
    );
}

export default SavedMovies;