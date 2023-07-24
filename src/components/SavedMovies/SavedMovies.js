import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Footer from '../Footer/Footer'
import { contains } from '../../vendor/contains';

function SavedMovies() {
    return(
        <section className="movies">
            <Header />
            <main>
                <SearchForm />
                <MoviesCardList cards={contains} />
            </main>
            <Footer />
        </section>
    );
}

export default SavedMovies;