import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector('.popup__image');
        this._description = this._popup.querySelector('.popup__image-description');
    }

    open(name, src) {
        this._image.src = src;
        this._image.alt = name;
        this._description.textContent = name;
        super.open();
    }
}