import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';


export default function EditProfilePopup({ isOpen, onClose, onClick, onOverlayClick, ...props}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setUserName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setUserName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(evt) {
    setUserName(evt.target.value)
  }
  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }
  return (
    <PopupWithForm name="profile-edit" title="Редактировать профиль" isOpen={isOpen} onClose={onClose} onClick={onClick} buttonTitle="Сохранить" onSubmit={handleSubmit} onOverlayClick={onOverlayClick}>
      <input onChange={handleChangeName} id="inputName" type="text" className="popup__form-input popup__form-input_type_name" name="name" placeholder="Имя" minLength="2" maxLength="40" required value={name || ''}/>
      <span className="popup__input-error inputName-error"></span>
      <input onChange={handleDescriptionChange} id="inputAbout" type="text" className="popup__form-input popup__form-input_type_job" name="about" placeholder="Чем вы занимаетесь?" minLength="2" maxLength="200" required  value={description || ''}/>
      <span className="popup__input-error inputAbout-error"></span>
    </PopupWithForm>
  )
}
