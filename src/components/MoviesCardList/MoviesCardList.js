import React from 'react';
import { useEffect, useState } from 'react';
import MoviesCard from "../MoviesCard/MoviesCard.js";
function MoviesCardList({ cards }) {

  const [shownMovies, setShownMovies] = useState(0);

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
                {cards.slice(0, shownMovies).map((card) => (
                  <MoviesCard
                    cards={cards}
                    card={card}
                  />
                ))}
            </ul>
            {cards.length > shownMovies ? (
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