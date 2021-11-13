import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup(props) {
  const userAvatar = React.useRef();
  // очистка инпута при открытии
  useEffect(() => {
    userAvatar.current.value = '';
    }, [props.isOpen]);
  //
  function handleEditAvatarSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: userAvatar.current.value
    });

  }
  return (
    <PopupWithForm name="edit-avatar" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} buttonTitle="Сохранить" onSubmit={handleEditAvatarSubmit}>
      <input ref={userAvatar} id="avatar-input" type="url" className="popup__form-input popup__form-input_type_avatar-url" placeholder="Ссылка на аватар" name="avatar" required />
      <span className="popup__input-error input-avatar-url-error"></span>
    </PopupWithForm>
  )
}
