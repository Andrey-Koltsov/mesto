const profileName = document.querySelector('.profile__name'),
      profileJob = document.querySelector('.profile__job'),
      profileBtnEdit = document.querySelector('.profile__btn-edit'),
      popup = document.querySelector('.popup'),
      popupBtnClose = popup.querySelector('.popup__btn-close'),
      form = popup.querySelector('.form'),
      formInputName = form.querySelector('.form__input_name'),
      formInputJob = form.querySelector('.form__input_description');

function togglePopup() {
    popup.classList.toggle('popup_opened');
}

function openPopupHandler() {
    formInputName.value = profileName.textContent;
    formInputJob.value = profileJob.textContent;
    togglePopup();
}

function formSubmitHandler(event) {
    event.preventDefault();
    profileName.textContent = formInputName.value;
    profileJob.textContent = formInputJob.value;
    togglePopup();
}

profileBtnEdit.addEventListener('click', openPopupHandler);
popupBtnClose.addEventListener('click', togglePopup);
form.addEventListener('submit', formSubmitHandler); 