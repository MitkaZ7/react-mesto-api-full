import React from 'react';
function ImagePopup(props) {
    return (
      <div className={`popup popup_type_image ${props.card._id ? "popup_status_opened" : ""} `}>
            <div className="popup__image-container">
                <button className="popup__button-close button" type="button" onClick={props.onClose}></button>
                <figure className="popup__caption-container">
                    <img src={props.card.link} alt={props.card.name} className="popup__image" />
                    <figcaption className="popup__caption">
                        <h2 className="popup__place-caption">{props.card.name}</h2>
                    </figcaption>
                </figure>
            </div>
        </div>
    )
}

export default ImagePopup;
