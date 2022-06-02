export const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const profileSelectors = {
  nameSelector: '.profile__name',
  jobSelector: '.profile__job'
};
export const listCardSelector = '.cards__grid';
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
export const profileBtnEdit = document.querySelector('.profile__btn-edit');
export const profileBtnAdd = document.querySelector('.profile__btn-add');

export const popupProfile = document.querySelector('.popup_place_profile');
export const popupProfileInputName = popupProfile.querySelector('.popup__input_form_name');
export const popupProfileInputJob = popupProfile.querySelector('.popup__input_form_job');
export const popupProfileForm = popupProfile.querySelector('.popup__form');

export const popupCard = document.querySelector('.popup_place_card-add');
export const popupCardInputName = popupCard.querySelector('.popup__input_form_name');
export const popupCardInputSrc = popupCard.querySelector('.popup__input_form_src');
export const popupCardForm = popupCard.querySelector('.popup__form');

export const popupImage = document.querySelector('.popup_place_card-image');
export const popupImagePicture = popupImage.querySelector('.popup__image');
export const popupImageDescription = popupImage.querySelector('.popup__image-description');

export const popups = document.querySelectorAll('.popup');
export const listCard = document.querySelector('.cards__grid');

export const configValidate = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_type_error'
};