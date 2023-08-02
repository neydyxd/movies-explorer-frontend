import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SearcForm from '../SearchForm/SearchForm';
import { useState, useContext, useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import moviesApi from '../../utils/MoviesApi'
import { transformMovies, filterMovies, filterShortMovies } from '../../utils/utils.js';

function Movies({ setIsLoader, setIsInfoTooltip, savedMoviesList, onLikeClick, onDeleteClick, loggedIn }) {

    const [shortMovies, setShortMovies] = useState(false);
    const [initialMovies, setInitialMovies] = useState([]); 
    const [filteredMovies, setFilteredMovies] = useState([]); 
    const [NotFound, setNotFound] = useState(false); 
    const [isAllMovies, setIsAllMovies] = useState([]);
    const currentUser = useContext(CurrentUserContext);

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
      `${currentUser.email} - movies`,
      JSON.stringify(moviesList)
    );
  }

  function handleSearchSubmit(inputValue) {
    localStorage.setItem(`${currentUser.email} - movieSearch`, inputValue);
    localStorage.setItem(`${currentUser.email} - shortMovies`, shortMovies);

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
          setIsLoader(true);
        })
        .catch(() =>
          setIsInfoTooltip({
            isOpen: true,
            successful: false,
            text: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
          })
        )
        .finally(() => setIsLoader(false));
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
    localStorage.setItem(`${currentUser.email} - shortMovies`, !shortMovies);
  }

  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - shortMovies`) === 'true') {
      setShortMovies(true);
    } else {
      setShortMovies(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - movies`)) {
      const movies = JSON.parse(
        localStorage.getItem(`${currentUser.email} - movies`)
      );
      setInitialMovies(movies);
      if (
        localStorage.getItem(`${currentUser.email} - shortMovies`) === 'true'
      ) {
        setFilteredMovies(filterShortMovies(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, [currentUser]);
    return(
        <>
            <Header loggedIn={loggedIn}/>
            <main>
                <SearcForm 
                handleSearchSubmit={handleSearchSubmit}
                handleShortFilms={handleShortFilms}
                shortMovies={shortMovies}
                />
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