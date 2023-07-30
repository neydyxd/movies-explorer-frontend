import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
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
import success from "../../images/success.png";
import error from "../../images/fail.png";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function App() {
  const location = useLocation();
  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [showToolTip, setShowToolTip] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [info, setInfo] = useState({ image: "", text: "" });
  const navigate = useNavigate();

  function ChooseInfoTooltip (info) {
    setInfo({ image: info.image, text: info.text });
  }
  
  function handleRegisterUser(name,email,password) {
    console.log(name, email, password);
    mainApi.registerUser(name, email, password)
    .then((data) => {
      setTimeout(setShowToolTip, 1000, true);
      ChooseInfoTooltip({
        image: success,
        text:'Вы успешно зарегистрировались'
      })
   
      if(data) {
      setLoggedIn(true);
      handleAuthUser(email,password);
    }
    })
    .catch((err) => {
      setTimeout(setShowToolTip, 1000, true);
      ChooseInfoTooltip({
        image: error,
        text: "Что-то пошло не так! Попробуйте еще раз!",
      });
    });
  }

  function handleAuthUser(email, password) {
    mainApi.loginUser(email, password)
    .then((res) => {
      localStorage.setItem('jwt', res.token)
      setLoggedIn(true)
      setTimeout(() => {navigate('/movies')}, 200)
      }
      )
  }
  useEffect(() => {
    if (loggedIn) {
      const jwt = localStorage.getItem('jwt')
      mainApi
        .getUserData(jwt)
        .then(res => setCurrentUser(res))
        .catch((err) => console.log(err))
    }
  }, [loggedIn]);
  

  

  return (
  <div className='App'>
    <CurrentUserContext.Provider value={currentUser}>
    <Routes>
      <Route
        path='/'
        element={<Main />}
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
          <Movies />
        </ProtectedRoute>}
      />
      <Route
        path='/profile'
        element={<ProtectedRoute loggedIn={loggedIn} >
          <Profile/>
        </ProtectedRoute>}
      />
      <Route
        path='/saved-movies'
        element={<SavedMovies />}
      />
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
    </CurrentUserContext.Provider>
  </div>
  );
}

export default App;
