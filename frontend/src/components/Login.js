import React, {useState} from 'react';

export default function Login({onSubmit}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleСhangeEmail(evt) {
    setEmail(evt.target.value);
  }
  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit({password, email});
  }
  return (
    <form className="popup__authorization" onSubmit={handleSubmit}>
      <h3 className="popup__title popup__title_place_login">Вход</h3>
      <input className="popup__form-input popup__form-input_type_authorization-data" onChange={handleСhangeEmail} type="email" value={email} placeholder="Email" id="inputEmail" required></input>
      <input className="popup__form-input popup__form-input_type_authorization-data" onChange={handleChangePassword} type="password" value={password} placeholder="Пароль" id="imputPassword" required maxLength="40" minLength="2"></input>
      <button className="popup__button-submit button button_type_login">Войти</button>
    </form>
  )
}
