function enableValidation(config) {
 const forms = document.querySelectorAll(config.formSelector);

 forms.forEach(form => {
     form.addEventListener('submit', evt => evt.preventDefault());
     setListenerInputs(form, config);
 });
}

function setListenerInputs(form, config) {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const submitBtn = form.querySelector(config.submitButtonSelector);
    
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            handlerInputValid(form, input, config);
            toggleButtonForm(inputs, submitBtn, config);
        });
    });
    toggleButtonForm(inputs, submitBtn, config);
}

function handlerInputValid(form, input, config) {
    const inputErrorMessage = form.querySelector(`.${input.id}-error`);

    if (input.validity.valid) {
        input.classList.remove(config.inputErrorClass);
        inputErrorMessage.textContent = '';
    } else {
        input.classList.add(config.inputErrorClass);
        inputErrorMessage.textContent = input.validationMessage;
    }
}

function hasInputsValid(inputs) {
    return inputs.some(inputElement => {
        return !inputElement.validity.valid;
    })
}

function toggleButtonForm(inputs, submitBtn) {
    const stateInputs = hasInputsValid(inputs);

    if (stateInputs) {
        disableButtonForm(submitBtn);
    } else {
        enableButtonForm(submitBtn);
    }
}

function disableButtonForm(button) {
    button.classList.add('popup__btn-save_disabled');
    button.disabled = true;
}

function enableButtonForm(button) {
    button.classList.remove('popup__btn-save_disabled');
    button.disabled = false;
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn-save',
    inputErrorClass: 'popup__input_type_error'
  }); 