import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

    constructor({popupSelector, submitForm}) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._submitForm = submitForm;
    }

    _getInputValues() {
        const data = {};
        const inputs = this._form.querySelectorAll('.popup__input');
        inputs.forEach(input => {
            data[input.name] = input.value;
        });
        return data;
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const dataInputs = this._getInputValues();
            this._submitForm(dataInputs);
            this.close();
        });
        super.setEventListeners();
    }

    setInputsData(data) {
        data.forEach(({selector, value}) => {
            const input = this._form.querySelector(selector);
            input.value = value;
        });
    }

    close() {
        this._form.reset();
        super.close()
    }

}