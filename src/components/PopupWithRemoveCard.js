import Popup from "./Popup.js";

export default class PopupWithRemoveCard extends Popup {

    constructor({popupSelector, handleSave}) {
        super(popupSelector);
        this._handleSave = handleSave;
        this._btnSave = this._popup.querySelector('.popup__btn-submit');
    }

    setEventListeners() {
        this._btnSave.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._handleSave();
        });
        super.setEventListeners();
    }

}