import React from 'react';
import logo from '../images/logo.svg';
import { Link, Route } from 'react-router-dom';

export default function Header({loggedIn, email, onSignOut}) {
  return (
    <header className="header">
      <img src={logo} alt="логотип" className="header__logo" />
        <div className="header__login">
          {loggedIn && (
            <>
              <p className="header__user-email">{email}</p>
                <Route exact path="/">
                  <Link className="header__button-logout" to="/sign-in" onClick={onSignOut}>Выйти</Link>
                </Route>
            </>
          )}
          <Route path="/sign-in">
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          </Route>
          <Route path="/sign-up">
            <Link className="header__link" to="/sign-in">
              Вход
            </Link>
          </Route>
        </div>
    </header>
  )
}
