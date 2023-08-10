import React from "react";
import { useLocation } from "react-router-dom";
import { transformDuration } from '../../utils/utils.js';
function MoviesCard({ movie, saved, onLikeClick, onDeleteClick }) {
    const location = useLocation();

    function handleLikeClick() {
        onLikeClick(movie);
      }

      function handleDeleteClick() {
        onDeleteClick(movie);
      }
    
    return(
        <li className="card">
            <a target="_blank" rel="noreferrer" href={movie.trailerLink}>
                <img
                className="card__image"
                alt={movie.nameRU}
                src={movie.image}
                />
            </a>
            <div className="card__container">
                <div className="card__info-container">
                    <h2 className="card__text">{movie.nameRU}</h2>
                    {(location.pathname !== '/saved-movies') ?
                    (<button type="button" 
                    className={`card__like ${saved  ? 'card__like_active' : ''}`}
                    onClick={saved ? handleDeleteClick : handleLikeClick}
                    >
                    </button>) : (<button type="button" className="card__delete" onClick={handleDeleteClick}></button>)}
                </div>
            <span className="card__time">{transformDuration(movie.duration)}</span> 
            </div>
        </li>
    );
};

export default MoviesCard;