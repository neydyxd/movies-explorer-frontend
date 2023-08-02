import React from "react";
import { transformDuration } from '../../utils/utils.js';
function MoviesCard({ movie, saved, onLikeClick, onDeleteClick }) {

    function handleLikeClick() {
        onLikeClick(movie);
      }

      function handleDeleteClick() {
        onDeleteClick(movie);
      }
    
    return(
        <li className="card">
            <img
            className="card__image"
            alt={movie.nameRU}
            src={movie.image}
            />
            <div className="card__container">
                <div className="card__info-container">
                    <h2 className="card__text">{movie.nameRU}</h2>
                    <button type="button" 
                    className={`card__like ${saved  ? 'card__like_active' : ''}`}
                    onClick={saved ? handleDeleteClick : handleLikeClick}
                    >
                    </button>
                </div>
            <span className="card__time">{transformDuration(movie.duration)}</span> 
            </div>
        </li>
    );
};

export default MoviesCard;