import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';
function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__card">
                    <div className="profile__avatar-container">
              <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}></div>
                        <button className="profile__button-edit-avatar" type="button" onClick={props.onEditAvatar}></button>
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__button-edit button button_type_edit" type="button" onClick={props.onEditProfile}></button>
                        <p className="profile__about">{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__button-add button button_type_add" type="button" onClick={props.onAddCard}></button>
            </section>
            <section className="places">
                <ul className="places__cards">
                {props.cards.map((card) => {
                  return (<Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>)
                })}
                </ul>
            </section>
        </main>
    )
}
export default Main;
