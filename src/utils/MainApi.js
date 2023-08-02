class MainApi {
  constructor(basePath, token) {
    this._basePath = basePath;
    this._token = token;
  }
  _getHeaders() {
    return {
      "Content-type": "application/json",
      authorization: this._token,
    };
  }
  _getJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }


  getCurrentUser() {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._basePath}/users/me `, {
      headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${token}`,
      }
    }).then(this._getJson);
  }

  updateUser(name, email) {
    return fetch(`${this._basePath}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    }).then(res => this._getJson(res));
  }

  addNewMovie(data) {
    return fetch(`${this._basePath}/movies`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailerLink: data.trailerLink,
        thumbnail: data.thumbnail,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      }),
    }).then(res => this._getJson(res));
  }

  // удаление фильма из сохранённых
  deleteMovie(data) {
    return fetch(`${this._basePath}/movies/${data}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(res => this._getJson(res));
  }

  getSavedMovies() {
    return fetch(`${this._basePath}/movies`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(res => this._getJson(res));
  }
}


const mainApi = new MainApi('https://api.movies.neydy.nomoreparties.sbs');

  export default mainApi;