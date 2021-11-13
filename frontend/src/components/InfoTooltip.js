import React from 'react';
import success from '../images/success.svg'
import fail from '../images/fail.svg';

export default function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={isOpen ? 'popup popup_status_opened' : 'popup'}>
      <div className="popup__container popup__cointainer_place_infoToolTip" onClick={onClose}>
        <form className="popup__form" name="infoTooltip">
          <fieldset className="popup__fieldset popup__filedset_place_infoToolTip">
            <button className="popup__button-close button" type="button"/>
            <img className="popup__image-authorization" src={`${isSuccess ? success : fail}`} alt="иконка статуса регистрации" />
            <h3 className="popup__title popup__title_place_infoTooltip">
              {`${isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}`}
            </h3>
          </fieldset>
        </form>
      </div>
    </div>
  )
}
