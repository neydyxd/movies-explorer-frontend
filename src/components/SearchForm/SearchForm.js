import FilterCheckbox from "../FilterCheckBox/FilterCheckBox";

function SearcForm() {
    return(
        <section className="search">
            <form className="search__form" id="form">
                <input
                name="query"
                className="search__input"
                id="search-input"
                type="text"
                placeholder="Фильм"
                required
                ></input>
                <button className="search__button" type="submit"></button>
            </form>
            <FilterCheckbox />
        </section>
    );
}

export default SearcForm