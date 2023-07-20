import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Footer from '../Footer/Footer'
import { contains } from '../../vendor/contains';

function SavedMovies() {
    return(
        <section className="movies">
            <Header />
            <SearchForm />
            <MoviesCardList cards={contains} />
            <Footer />
        </section>
    );
}

export default SavedMovies;