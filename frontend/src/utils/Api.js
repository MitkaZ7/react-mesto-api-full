class Api {
  constructor(url) {
    this._url = url;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      сredentials: 'include',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(this._checkResponse)
  }
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      сredentials: 'include',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(this._checkResponse)
  }
  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      сredentials: 'include',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
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
      сredentials: 'include',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(this._checkResponse)
  }
  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      сredentials: 'include',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
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
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(this._checkResponse)
  }
  removeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(this._checkResponse)
  }
}
const api = new Api('https://api.locus.students.nomoredomains.rocks');
const token = localStorage.getItem('token');
export default api;
