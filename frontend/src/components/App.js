import React, { useEffect } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import api from '../utils/Api';
import * as authApi from '../utils/Auth';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isSuccessSignUp, setIsSuccessSignUp] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const history = useHistory();

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setIsAddCardPopupOpen(true);
  }
  const handleCardClick = (card) => {
    setSelectedCard(card);
  }
  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(!isInfoTooltipOpen);
  }
  function handleCheckToken() {
    const token = localStorage.getItem('token');
    if (token) {
      authApi.checkToken(token)
      .then((res) => {
        if (res.data.email) {
          setEmail(res.data.email);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch((error) => {
        console.log('Не удалось авторизоваться' + error);
      })
    }
  }
  useEffect(() => {
    handleCheckToken();
  }, []);
  // registration
  function handleRegistration(email, password) {
    authApi.register(email, password)
    .then((res) => {
      if (res.data) {
        setIsSuccessSignUp(true);
        handleInfoTooltipOpen();
        history.push('/sign-in');
      }
    })
    .catch((error) => {
      setIsSuccessSignUp(false);
      handleInfoTooltipOpen();
      console.log('Не удалось зарегистрироваться ' + error);
    })
  }
  // login
  function handleLogin ({email, password}) {
    authApi.authorize({email, password})
    .then((res) => {
      if (res.token) {
        setEmail(email);
        setLoggedIn(true);
        localStorage.setItem('jwt', res.token);
        history.push('/');
      }
    })
    .catch((error) => {
      console.log('Авторизация не прошла' + error);
    })
  }
  //logout
  function handleSignOut() {
    localStorage.removeItem('jwt');
    setEmail('');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }
  const closeByOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }

  function handleUpdateAvatar(avatar) {
    api
      .editUserAvatar(avatar)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((error) => {
        console.log('Ошибка, аватар не поменялся');
    })
  }
  function handleUpdateProfile(userProfile) {
    api.editUserInfo(userProfile)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log('Ошибка, данные пользователя не поменялись');
      })
  }
  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((error) => {
        console.log('Ошибка, данные пользователя не загрузились');
      })
  }, []);
  function handleAddPlaceSumbmit(card) {
    api
      .addNewCard(card)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log('Ошибка, не удалось добавить новую карточку');
      })
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some(myLike => myLike._id === currentUser._id);
    api
      .likeCard(card._id, isLiked)
      .then((newCard) => {
      setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((error) => {
        console.log('Ошибка установки лайка');
      });
  }

  function handleCardDelete(card) {
      api
      .removeCard(card._id)
        .then(() => {
          setCards((state) => state.filter((c) => c._id !== card._id));
          closeAllPopups();
        })
        .catch((error) => {
          console.log('Ошибка удаления карточки');
        })
  }

  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((error) => {
        console.log('Ошибка, карточки не загрузились');
      })
  }, []);

  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups()
      }
    }
    document.addEventListener('keyup', handleEscClose);
    return () => document.removeEventListener("keyup", handleEscClose);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} loggedIn={loggedIn} onSignOut={handleSignOut} />
        <Switch>
          <ProtectedRoute
          exact
          path="/"
          component={Main}
          onEditProfile={handleEditProfileClick}
          onAddCard={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
          loggedIn={loggedIn}
          logOut={handleSignOut}
          />
          <Route path="/sign-up">
            <Register handleRegistration={handleRegistration}/>
          </Route>
          <Route path="/sign-in">
            <Login onSubmit={handleLogin}
              onCheckToken={handleCheckToken} />
          </Route>
          <Route path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />
      </div>
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateProfile} onOverlayClick={closeByOverlayClick}></EditProfilePopup>
      <AddPlacePopup isOpen={isAddCardPopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSumbmit}></AddPlacePopup>
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}></EditAvatarPopup>
      <PopupWithForm name="remove-card" title="Вы уверены?" onClose={closeAllPopups} buttonTitle="Да" />
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isSuccess={isSuccessSignUp}/>
    </CurrentUserContext.Provider>
  );
}

export default App;
