import { Route, Routes } from 'react-router-dom';
import Main from '../Main/Main';
import './App.css';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';

function App() {
  return (
  <div className='App'>
    <Routes>
      <Route
        path='/'
        element={<Main />}
      />
      <Route
        path='/sign-up'
        element={<Register />}
      />
      <Route
        path='/sign-in'
        element={<Login />}
      />
      <Route
        path='/movies'
        element={<Movies />}
      />
      <Route
        path='/profile'
        element={<Profile />}
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
  </div>
  );
}

export default App;
