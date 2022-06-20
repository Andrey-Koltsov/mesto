import Popup from "./Popup.js";

export default class PopupWithRemoveCard extends Popup {

    constructor({popupSelector, handleRemove}) {
        super(popupSelector);
        this._handleRemove = handleRemove;
        this._form = this._popup.querySelector('.popup__form');
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleRemove();
        });
        super.setEventListeners();
    }

}