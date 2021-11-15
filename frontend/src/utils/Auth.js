// export const url = 'http://localhost:3000';
export const url = 'https://api.locus.students.nomoredomains.rocks';

const checkResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export const register = (email, password) => {
  return fetch(`${url}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const authorize = ({ password, email }) => {
  return fetch(`${url}/signin`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
        return response.json();
  })
    .then((data) => {
      console.log(data);
      if (data.token) {
        localStorage.setItem('token', data.token)
        return data;
      }
    })
    .catch((err) => console.log(err));
};

export const checkToken = (token) => {
  console.log('getToken в utils/auth: ' + token)
  return fetch(`${url}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  }).then(checkResponse);
};
