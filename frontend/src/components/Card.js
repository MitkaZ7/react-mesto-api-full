import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
export default function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(myLike => myLike._id === currentUser._id);
  const buttonLikeClassName = (`button_type_like ${isLiked ? 'button_type_like-active' : ''}`);
  const buttonDeleteClassName = (`place__button-remove ${isOwn ? 'place__button-remove_status-active' : ''}`);
  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

    return (
        <li className="place">
        {isOwn && <button className={buttonDeleteClassName} onClick={handleDeleteClick}></button>}
            <figure className="place__card">
                <div className="place__image" onClick={handleClick} style={{ backgroundImage: `url(${props.card.link})`}}></div>
                <figcaption className="place__caption">
                    <h2 className="place__name">{props.card.name}</h2>
                    <div className="place__like-container">
              <button className={buttonLikeClassName} type="button" onClick={handleLikeClick}></button>
                        <span className="place__counter-likes">{props.card.likes.length}</span>
                    </div>
                </figcaption>
            </figure>
        </li>
    )
}

