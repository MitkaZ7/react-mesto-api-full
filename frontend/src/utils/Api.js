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
        "Content-Type": "application/json"
      }
    })
      .then(this._checkResponse)
  }
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      сredentials: 'include',
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(this._checkResponse)
  }
  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      сredentials: 'include',
      headers: {
        'Content-Type': 'application/json'
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
        'Content-Type': 'application/json'
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
        'Content-Type': 'application/json'
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
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }
  removeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }
}
const api = new Api('api.locus.students.nomoredomains.rocks');
export default api;
