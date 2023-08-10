import { Route, Routes, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Main from '../Main/Main';
import './App.css';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import authApi from '../../utils/AuthApi'
import InfoTooltip from '../../components/InfoTooltip/InfoTooltip'
function App() {
  const validator = require('validator');
  const [currentUser, setCurrentUser] = useState({
    email: '',
    name: ''
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState({
    isOpen: false,
    successful: true,
    text: '',
  });
  const navigate = useNavigate();
  const [savedMoviesList, setSavedMoviesList] = useState([]);

  function closeInfoTooltip() {
    setIsInfoTooltip({ ...isInfoTooltip, isOpen: false });
  }
  
  function handleRegisterUser(name,email,password) {
    if (validator.isEmail(email)){
    authApi.registerUser(name, email, password)
    .then((data) => {
      if(data) {
      setLoggedIn(true);
      setCurrentUser({
        name,
        email,
      });
      handleAuthUser( email,password );
    }
    })
    .catch((err) => {
      setIsInfoTooltip({
        isOpen: true,
        successful: false,
        text: 'Такой пользователь уже существует'
      });
    })
  } else {
    setIsInfoTooltip({
      isOpen: true,
      successful: false,
      text: 'Введены не корректные данные'
    });
  }
  }

  function setUserData() {
    const jwt = localStorage.getItem('jwt');
    authApi.checkToken(jwt)
    .then((user) => {
      setCurrentUser({
        email: user.email,
        name: user.name
      });
    })
  }

  function handleAuthUser( email,password) {
    authApi.loginUser(email, password)
    .then((res) => {
      localStorage.setItem('jwt', res.token)
      setLoggedIn(true)
      setTimeout(() => {navigate('/movies')}, 200)
      setIsInfoTooltip({
        isOpen: true,
        successful: true,
        text: 'Добро пожаловать!',
      });
      setUserData();
      }
      )
      .catch(err =>
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: "Вы ввели не правильный логин или пароль",
        })
      )
  }
  
  function handleSignOut() {
    setCurrentUser({});
    setLoggedIn(false);
    localStorage.clear();
  }
  
  function handleProfile({ name, email }) {
    mainApi
      .updateUser(name, email)
      .then(newUserData => {
        setCurrentUser(newUserData);
        setIsInfoTooltip({
          isOpen: true,
          successful: true,
          text: 'Ваши данные обновлены!',
        });
      })
      .catch(err =>
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err,
        })
      )
  }

  function handleSaveMovie(movie) {
    console.log(movie);
    mainApi
      .addNewMovie(movie)
      .then(newMovie => setSavedMoviesList([newMovie, ...savedMoviesList]))
      .catch(err =>
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err,
        })
      );
  }

  function handleDeleteMovie(movie) {
    const savedMovie = savedMoviesList.find(
      (item) => item.movieId === movie.id || item.movieId === movie.movieId
    );
    mainApi
      .deleteMovie(savedMovie._id)
      .then(() => {
        const newMoviesList = savedMoviesList.filter(m => {
          if (movie.id === m.movieId || movie.movieId === m.movieId) {
            return false;
          } else {
            return true;
          }
        });
        setSavedMoviesList(newMoviesList);
      })
      .catch(err =>
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err,
        })
      );
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      authApi
        .checkToken(jwt)
        .then((user) => {
          if (user) {
            setLoggedIn(true);
            setCurrentUser({
              email: user.email,
              name: user.name
            });
            navigate("/movies", { replace: true });
          }
        })
        .catch(err =>
          setIsInfoTooltip({
            isOpen: true,
            successful: false,
            text: err,
          })
        )
    } else {
    }
  }, []);

  useEffect(() => {
    mainApi
      .getCurrentUser()
      .then((user) => {
        setCurrentUser({
          email: user.email,
          name: user.name
        });
      })
      .catch(err =>
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err,
        })
      )
  }, []);

  useEffect(() => {
    if (loggedIn && currentUser) {
      mainApi
        .getSavedMovies()
        .then(data => {
          setSavedMoviesList(data.reverse());
        })
        .catch(err =>
          setIsInfoTooltip({
            isOpen: true,
            successful: false,
            text: err,
          })
        );
    }
  }, [currentUser, loggedIn]);


  return (
  <div className='App'>

    <CurrentUserContext.Provider value={currentUser}>
    <Routes>
      <Route
        path='/'
        element={<Main loggedIn={loggedIn} />}
      />
      <Route
        path='/sign-up'
        element={<Register handleRegisterUser={handleRegisterUser} />}
      />
      <Route
        path='/sign-in'
        element={<Login handleAuthUser={handleAuthUser} />}
      />
      <Route
        path='/movies'
        element={<ProtectedRoute loggedIn={loggedIn}>
          <Movies 
          loggedIn={loggedIn}
          savedMoviesList={savedMoviesList}
          setIsInfoTooltip={setIsInfoTooltip}
          onLikeClick={handleSaveMovie}
          onDeleteClick={handleDeleteMovie}

          />
        </ProtectedRoute>}
      />
      <Route
        path='/profile'
        element={<ProtectedRoute loggedIn={loggedIn} >
          <Profile
          loggedIn={loggedIn}
          handleProfile={handleProfile}
          handleSignOut={handleSignOut}
          />
        </ProtectedRoute>}
      />
      <Route
        path='/saved-movies'
        element={<ProtectedRoute loggedIn={loggedIn}>
          <SavedMovies 
          savedMoviesList={savedMoviesList}
          onDeleteClick={handleDeleteMovie}
          setIsInfoTooltip={setIsInfoTooltip}
          loggedIn={loggedIn}
          />
        </ProtectedRoute>}
      />
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
          <InfoTooltip
            status={isInfoTooltip}
            onClose={closeInfoTooltip}
          />
    </CurrentUserContext.Provider>
  </div>
  );
}

export default App;