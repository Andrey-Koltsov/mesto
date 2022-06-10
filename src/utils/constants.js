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

export const configValidate = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-submit',
  inactiveButtonClass: 'popup__btn-submit_disabled',
  inputErrorClass: 'popup__input_type_error'
};

export const listCardSelector = '.cards__grid';

const popupProfile = document.querySelector('.popup_place_profile');
export const popupProfileForm = popupProfile.querySelector('.popup__form');

const popupCard = document.querySelector('.popup_place_card-add');
export const popupCardForm = popupCard.querySelector('.popup__form');

const popupAvatar = document.querySelector('.popup_place_avatar');
export const popupAvatarForm = popupAvatar.querySelector('.popup__form');

export const profileBtnAdd = document.querySelector('.profile__btn-add');
export const profileBtnEdit = document.querySelector('.profile__btn-edit');
export const avatar = document.querySelector('.avatar');