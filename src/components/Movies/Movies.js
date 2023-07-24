import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SearcForm from '../SearchForm/SearchForm';
import { contains } from '../../vendor/contains';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies() {
    return(
        <>
            <Header />
            <main>
                <SearcForm />
                <MoviesCardList
                cards={contains}
                />
            </main>
            <Footer />
        </>
    );
}

export default Movies;