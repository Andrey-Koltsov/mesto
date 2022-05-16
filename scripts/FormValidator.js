export class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._form = formElement;
    }
    
    _setListenerInputs() {
        this._inputs.forEach(input => {
            input.addEventListener('input', () => {
                this._handleInputValid(input);
                this._toggleButtonForm();
            });
        });
        this._toggleButtonForm();
    }

    _handleInputValid(input) {
        const inputErrorMessage = this._form.querySelector(`.${input.id}-error`);
    
        if (input.validity.valid) {
            input.classList.remove(this._config.inputErrorClass);
            inputErrorMessage.textContent = '';
        } else {
            input.classList.add(this._config.inputErrorClass);
            inputErrorMessage.textContent = input.validationMessage;
        }
    }

    _toggleButtonForm() {
        const stateInputs = this._hasInputsValid();
    
        if (stateInputs) {
            this.disableButtonForm();
        } else {
            this._enableButtonForm();
        }
    }

    _hasInputsValid() {
        return this._inputs.some(inputElement => {
            return !inputElement.validity.valid;
        });
    }

    _enableButtonForm() {
        this._btnSubmit.classList.remove(this._config.inactiveButtonClass);
        this._btnSubmit.disabled = false;
    }

    disableButtonForm() {
        this._btnSubmit.classList.add(this._config.inactiveButtonClass);
        this._btnSubmit.disabled = true;
    }

    enableValidation() {
        this._inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        this._btnSubmit = this._form.querySelector(this._config.submitButtonSelector);

        this._setListenerInputs();
    }
}