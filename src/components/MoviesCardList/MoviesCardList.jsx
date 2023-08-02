import React from 'react';
import { useEffect, useState } from 'react';
import MoviesCard from "../MoviesCard/MoviesCard.js";
import { getSavedMovieCard } from '../../utils/utils.js';
function MoviesCardList({ moviesList, savedMoviesList, onLikeClick, onDeleteClick }) {

  const [shownMovies, setShownMovies] = useState(0);
  const [showMovieList, setShowMovieList] = useState([]);

  function shownCount() {
    const display = window.innerWidth;
    if (display > 1279) {
      setShownMovies(12);
    } 
    else if (display > 767) {
      setShownMovies(8);
    } else if (display < 768) {
      setShownMovies(5);
    }
  }

  useEffect(() => {
    shownCount();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener('resize', shownCount);
    }, 500);
  });

  function showMore() {
    const display = window.innerWidth;
    if (display > 1279) {
      setShownMovies(shownMovies + 3);
    } else if (display > 1023) {
      setShownMovies(shownMovies + 2);
    }
    else if (display < 1023) {
      setShownMovies(shownMovies + 2);
    }
  }
    return (
        <section className="cards">
            <ul className="cards__list">
            {moviesList.slice(0, shownMovies).map(movie => (
              <MoviesCard
                key={movie.id || movie._id}
                saved={getSavedMovieCard(savedMoviesList, movie)}
                movie={movie}
                onLikeClick={onLikeClick}
                onDeleteClick={onDeleteClick}
              />
            ))}
            </ul>
            {moviesList.length > shownMovies ? (
                  <button className="cards__button" onClick={showMore}>
                    Ещё
                  </button>
                ) : (
                  ''
                )}
        </section>
    );
}

export default MoviesCardList;