const initialCards = [{
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

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileBtnEdit = document.querySelector('.profile__btn-edit');
const profileBtnAdd = document.querySelector('.profile__btn-add');

const popupProfile = document.querySelector('.popup_place_profile');
const popupProfileInputName = popupProfile.querySelector('.popup__input_form_name');
const popupProfileInputJob = popupProfile.querySelector('.popup__input_form_job');
const popupProfileForm = popupProfile.querySelector('.popup__form');

const popupCard = document.querySelector('.popup_place_card-add');
const popupCardInputName = popupCard.querySelector('.popup__input_form_name');
const popupCardInputSrc = popupCard.querySelector('.popup__input_form_src');
const popupCardForm = popupCard.querySelector('.popup__form');
const popupCardBtnSubmit = popupCard.querySelector('.popup__btn-save');

const popupImage = document.querySelector('.popup_place_card-image');
const popupImagePicture = popupImage.querySelector('.popup__image');
const popupImageDescription = popupImage.querySelector('.popup__image-description');

const popups = document.querySelectorAll('.popup');
const popupCloseBtns = document.querySelectorAll('.popup__btn-close');
const templateCard = document.querySelector('.template-card').content;
const listCard = document.querySelector('.cards__grid');

function togglePopup(element) {
  element.classList.toggle('popup_opened');
}

function closePopupForKeybord() {
  const openedPopup = document.querySelector('.popup_opened');
  if (openedPopup) {
    togglePopup(openedPopup);
  }
}

function handlerEditProfile() {
  popupProfileInputName.value = profileName.textContent;
  popupProfileInputJob.value = profileJob.textContent;
  togglePopup(popupProfile);
}

function handlerSaveProfile(evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileInputName.value;
  profileJob.textContent = popupProfileInputJob.value;
  togglePopup(popupProfile);
}

function handlerSaveCard(evt) {
  evt.preventDefault();
  const card = getCard({name: popupCardInputName.value, link: popupCardInputSrc.value});
  listCard.prepend(card);
  popupCardForm.reset();
  togglePopup(popupCard);
}

function handlerOpenImage(name, src) {
  popupImagePicture.src = src;
  popupImagePicture.alt = name;
  popupImageDescription.textContent = name;
  togglePopup(popupImage);
}

function getCard(element) {
  const card = templateCard.cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const cardBtnLike = card.querySelector('.card__btn-like');
  const cardBtnRemove = card.querySelector('.card__btn-remove');

  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardTitle.textContent = element.name;

  cardBtnLike.addEventListener('click', () => cardBtnLike.classList.toggle('card__btn-like_active'));
  cardBtnRemove.addEventListener('click', evt => evt.target.closest('.card').remove());
  cardImage.addEventListener('click', () => handlerOpenImage(element.name, element.link));
  return card;
}

function render() {
  const cards = initialCards.map(getCard);
  listCard.append(...cards);
}

render();

profileBtnEdit.addEventListener('click', handlerEditProfile);
popupProfileForm.addEventListener('submit', handlerSaveProfile);

profileBtnAdd.addEventListener('click', () => {
  togglePopup(popupCard);
  disableButtonForm(popupCardBtnSubmit);
});
popupCardForm.addEventListener('submit', handlerSaveCard);

popupCloseBtns.forEach(item => {
  item.addEventListener('click', evt => togglePopup(evt.target.closest('.popup')));
});

popups.forEach(popup => {
  popup.addEventListener('click', evt => {
    if (evt.target === popup) {
      togglePopup(popup);
    }
  });
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closePopupForKeybord()
  }
});