import React from "react";
function MoviesCard({ card }) {
    return(
        <li className="card">
            <img
            className="card__image"
            alt={card.nameRu}
            src={card.image}
            />
            <div className="card__container">
                <div className="card__info-container">
                    <h2 className="card__text">{card.nameRu}</h2>
                    <button type="button" className='card__like_active'>
                    </button>
                </div>
            <span className="card__time">{card.duration}</span> 
            </div>
        </li>
    );
};

export default MoviesCard;