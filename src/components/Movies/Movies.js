import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SearcForm from '../SearchForm/SearchForm';
import { contains } from '../../vendor/contains';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies() {
    return(
        <>
            <Header />
            <SearcForm />
            <MoviesCardList
            cards={contains}
            />
            <Footer />
        </>
    );
}

export default Movies;