import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SearcForm from '../SearchForm/SearchForm';
import { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import moviesApi from '../../utils/MoviesApi'
import Preloader from '../Preloader/Preloader';
import { transformMovies, filterMovies, filterShortMovies } from '../../utils/utils.js';
import useFormWithValidation from '../../hooks/useFormWithValidation.jsx';

function Movies({ setIsInfoTooltip, savedMoviesList, onLikeClick, onDeleteClick, loggedIn }) {
    const location = useLocation()
    const [shortMovies, setShortMovies] = useState(false);
    const [initialMovies, setInitialMovies] = useState([]); 
    const [filteredMovies, setFilteredMovies] = useState([]); 
    const [NotFound, setNotFound] = useState(false); 
    const [isAllMovies, setIsAllMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const currentUser = useContext(CurrentUserContext);
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

  function handleSetFilteredMovies(movies, userQuery, shortMoviesCheckbox) {
    const moviesList = filterMovies(movies, userQuery, shortMoviesCheckbox);
    if (moviesList.length === 0) {
      setNotFound(true);
      setIsInfoTooltip({
        isOpen: true,
        successful: false,
        text: 'Ничего не найдено.',
      });
    } else {
      setNotFound(false);
    }
    setInitialMovies(moviesList);
    setFilteredMovies(
      shortMoviesCheckbox ? filterShortMovies(moviesList) : moviesList
    );
    localStorage.setItem(
      `currentUser - movies`,
      JSON.stringify(moviesList)
    );
  }


  function handleSearchSubmit(inputValue) {
    localStorage.setItem(`currentUser - movieSearch`, inputValue);
    localStorage.setItem(`currentUser - shortMovies`, shortMovies);
    console.log(shortMovies);
    if (isAllMovies.length === 0) {
      moviesApi
        .getMovies()
        .then(movies => {
          setIsAllMovies(movies);
          handleSetFilteredMovies(
            transformMovies(movies),
            inputValue,
            shortMovies
          );
            setIsLoading(true);     
        })
        .catch(() =>
          setIsInfoTooltip({
            isOpen: true,
            successful: false,
            text: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
          })
        )
        .finally(() => setTimeout(function() {
          setIsLoading(false);
        }, 3000));
    } else {
      handleSetFilteredMovies(isAllMovies, inputValue, shortMovies);
    }
  }

  function handleShortFilms() {
    setShortMovies(!shortMovies);
    if (!shortMovies) {
      setFilteredMovies(filterShortMovies(initialMovies));
    } else {
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem(`currentUser - shortMovies`, !shortMovies);
  }

  useEffect(() => {
    if (localStorage.getItem(`currentUser - shortMovies`) === 'true') {
      setShortMovies(true);
    } else {
      setShortMovies(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (localStorage.getItem(`currentUser - movies`)) {
      const movies = JSON.parse(
        localStorage.getItem(`currentUser - movies`)
      );
      setInitialMovies(movies);
      if (
        localStorage.getItem(`currentUser - shortMovies`) === 'true'
      ) {
        setFilteredMovies(filterShortMovies(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, [currentUser]);
  
 

  useEffect(() => {
    if (values.search !== undefined) {
    handleSearchSubmit(values.search);
    console.log(values.search);
    }
  }, [shortMovies])

  
    
  return(
        <>
            <Header loggedIn={loggedIn}/>
            <main>
                <SearcForm 
                handleShortFilms={handleShortFilms}
                shortMovies={shortMovies}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                input={input}
                errorQuery={errorQuery}
                />
                {isLoading && <Preloader/>}
                {!NotFound && (
                <MoviesCardList
                moviesList={filteredMovies}
                savedMoviesList={savedMoviesList}
                onLikeClick={onLikeClick}
                onDeleteClick={onDeleteClick}
                />
                )}
            </main>
            <Footer />
        </>
    );
}

export default Movies;