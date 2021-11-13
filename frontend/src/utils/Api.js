class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`${res.status}`);
  }
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }
  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method:'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._checkResponse)
  }
  editUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(this._checkResponse)
  }
  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.placeName,
        link: data.imageUrl
      })
    })
    .then(this._checkResponse)
  }
  likeCard(cardId, isLiked) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: `${!isLiked ? 'PUT' : 'DELETE'}`,
      credentials: 'include',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }
  removeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    })
      .then(this._checkResponse)
  }
}
const api = new Api({
  baseUrl: "https://api.locus.students.nomoredomains.rocks",
  headers: {
    'Content-Type': 'application / json',
    'authorization': `Bearer ${localStorage.getItem('_id')}`,
  }
});
export default api;
