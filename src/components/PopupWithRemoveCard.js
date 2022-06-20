import Popup from "./Popup.js";

export default class PopupWithRemoveCard extends Popup {

    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
    }

    setActionSubmit(action) {
        this._handleRemove = action;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleRemove();
        });
    }

}