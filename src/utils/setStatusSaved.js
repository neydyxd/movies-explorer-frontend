export const setStatusSaved = (movie, savedMovies) => {
    let updatedMovie = movie;
  
    // Проверяю наличие списка сохраненных фильмов
    if (savedMovies.length >= 1) {
      const find = savedMovies.find(el => el.movieId === movie.movieId);
  
      // Проверяю найден ли фильм в спсике сохраненных фильмов
      if (find) {
        updatedMovie.saved = true;
      } else {
        updatedMovie.saved = false;
      }
  
    } else {
      updatedMovie = movie;
    }
  
    return updatedMovie;
  }