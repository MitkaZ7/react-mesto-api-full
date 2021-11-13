import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';

export default function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }
  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    props.handleRegistration(email, password);
  }
    return (
      <form name="popup-form" className="popup__authorization" onSubmit={handleSubmit}>
        <h3 className="popup__title popup__title_place_login">Регистрация</h3>
        <input className="popup__form-input popup__form-input_type_authorization-data" onChange={handleChangeEmail} type="email" value={email} placeholder="Email" id="inputEmail" required></input>
        <input className="popup__form-input popup__form-input_type_authorization-data" onChange={handleChangePassword} type="password" value={password} placeholder="Пароль" id="imputPassword" required></input>
        <button className="popup__button-submit button button_type_login">Зарегистрироваться</button>
          <div className="popup__redirect-container">
            <Route path="/sign-up">
              <Link className="popup__redirect-link" to="/sign-in">Уже зарегистрированы? Войти</Link>
            </Route>
          </div>
      </form>
    )
}
