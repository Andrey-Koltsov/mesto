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
const popupProfileBtnSave = popupProfile.querySelector('.popup__btn-save');

const popupCardAdd = document.querySelector('.popup_place_card-add');
const popupCardAddInputName = popupCardAdd.querySelector('.popup__input_form_name');
const popupCardAddInputSrc = popupCardAdd.querySelector('.popup__input_form_src');
const popupCardAddBtnSave = popupCardAdd.querySelector('.popup__btn-save');

const popupImageCard = document.querySelector('.popup_place_card-image');
const popupBtnsClose = document.querySelectorAll('.popup__btn-close');
const templateCard = document.querySelector('.template-card').content;
const listCard = document.querySelector('.cards__grid');

function togglePopup(element) {
  element.classList.toggle('popup_opened');
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
  const card = getCard({name: popupCardAddInputName.value, link: popupCardAddInputSrc.value});
  listCard.prepend(card);
  popupCardAddInputName.value = "";
  popupCardAddInputSrc.value = "";
  togglePopup(popupCardAdd);
}

function handlerOpenImage(evt) {
  const card = evt.target.closest('.card');
  const cardImageSrc = card.querySelector('.card__image').src;
  const cardTitle = card.querySelector('.card__title').textContent;
  const popupImage = popupImageCard.querySelector('.popup__image');
  const popupImageDescription = popupImageCard.querySelector('.popup__image-description');

  popupImage.src = cardImageSrc;
  popupImage.alt = cardTitle;
  popupImageDescription.textContent = cardTitle;
  togglePopup(popupImageCard);
}

function getCard(element) {
  const card = templateCard.cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const cardBtnLike = card.querySelector('.card__btn-like');
  const cardBtnRemove = card.querySelector('.card__btn-remove');

  cardImage.src = element.link;
  cardTitle.textContent = element.name;

  cardBtnLike.addEventListener('click', () => cardBtnLike.classList.toggle('card__btn-like_active'));
  cardBtnRemove.addEventListener('click', evt => evt.target.closest('.card').remove());
  cardImage.addEventListener('click', handlerOpenImage)
  return card;
}

function render() {
  const cards = initialCards.map(getCard);
  listCard.append(...cards);
}

render();

profileBtnEdit.addEventListener('click', handlerEditProfile);
popupProfileBtnSave.addEventListener('click', handlerSaveProfile);

profileBtnAdd.addEventListener('click', () => togglePopup(popupCardAdd));
popupCardAddBtnSave.addEventListener('click', handlerSaveCard);

popupBtnsClose.forEach(item => {
  item.addEventListener('click', evt => evt.target.closest('.popup').classList.remove('popup_opened'));
});