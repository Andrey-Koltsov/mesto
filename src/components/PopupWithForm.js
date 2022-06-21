import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

    constructor({popupSelector, submitForm}) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = this._form.querySelectorAll('.popup__input');
        this._buttonSubmit = this._form.querySelector('.popup__btn-submit');
        this._submitForm = submitForm;
    }

    _getInputValues() {
        const data = {};
        this._inputs.forEach(input => {
            data[input.name] = input.value;
        });
        return data;
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const dataInputs = this._getInputValues();
            this._submitForm(dataInputs);
        });
        super.setEventListeners();
    }

    setInputValues(data) {
        this._inputs.forEach((input) => {
            input.value = data[input.name];
        });
    }

    close() {
        this._form.reset();
        super.close()
    }

    loadingButtonForm(bool) {
        if (bool) {
            this._buttonSubmit.textContent = 'Сохранение...';
        } else {
            this._buttonSubmit.textContent = 'Сохранить';
        }
    }

}