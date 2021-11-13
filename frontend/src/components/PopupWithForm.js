import React from 'react';
export default function PopupWithForm({ isOpen, onClose, onSubmit, name, title, buttonTitle, children }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_status_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__button-close button" type="button" onClick={onClose}></button>
        <form action="#" name={name} className="popup__form" onSubmit={onSubmit}>
          <h3 className="popup__title">{title}</h3>
          <fieldset className="popup__fieldset">
            {children}
          </fieldset>
          <button type="submit" className="popup__button-submit button button_type_save">{buttonTitle}</button>
        </form>
      </div>
    </div>
  )
}

