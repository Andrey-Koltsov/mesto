export default class Popup {

    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    open() {
        this._popup.classList.add('popup_opened');
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', closePopupForKeybord);
    }

    setEventListeners() {
        this._popup.addEventListener('click', evt => {
            if (evt.target === this._popup || evt.target.classList.contains('popup__btn-close')) {
                this.close();
            }
        });

        document.addEventListener('keydown', this._handleEscClose);
    }
}