class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }
  getUserInfo(token) {
    console.log('getUserInfo в utils/api: ' + token);
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._checkResponse)
  }
  getInitialCards(token) {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._checkResponse)
  }
  editUserInfo(data, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._checkResponse)
  }
  editUserAvatar(data, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(this._checkResponse)
  }
  addNewCard(data, token) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.placeName,
        link: data.imageUrl
      })
    })
      .then(this._checkResponse)
  }
  likeCard(cardId, isLiked, token) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: `${!isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers,
    })
      .then(this._checkResponse)
  }
  removeCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkResponse)
  }
}

const config = {
  url: 'https://api.locus.students.nomoredomains.rocks',
  //url: 'http://localhost:3000',
  headers: {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${'token'}`,
  }
};
const api = new Api(config);
export default api;
