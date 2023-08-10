class AuthApi {
    constructor(basePath) {
      this._basePath = basePath;
    }

    _getJson(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
 
    registerUser(name, email, password) {
      return fetch(`${this._basePath}/signup`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name, email, password }),
      }).then((res) => this._getJson(res));
    }
  
  
    loginUser(email, password) {
      return fetch(`${this._basePath}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }).then((res) => this._getJson(res));
    }
  
   
    checkToken(token) {
      return fetch(`${this._basePath}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => this._getJson(res));
    }
    
  }
  const authApi = new AuthApi("https://api.movies.neydy.nomoreparties.sbs");
  export default authApi;