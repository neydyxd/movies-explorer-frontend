function FilterCheckbox({ shortMovies, handleShortFilms }) {
  return (
    <form className="filter">
      <input
        className="filter__checkbox"
        type="checkbox"
        onChange={handleShortFilms}
        checked={shortMovies ? true : false}
        ></input>
      <span className="filter__text">Короткометражки</span>
    </form>
  );
}

export default FilterCheckbox;