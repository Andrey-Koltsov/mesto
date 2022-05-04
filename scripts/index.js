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
const templateCard = document.querySelector('.template-card').content;
const listCard = document.querySelector('.cards__grid');

function openPopup(element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupForKeybord);
}

function closePopup(element) {
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupForKeybord);
}

function closePopupForKeybord(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function handleEditProfile() {
  popupProfileInputName.value = profileName.textContent;
  popupProfileInputJob.value = profileJob.textContent;
  openPopup(popupProfile);
}

function handleSaveProfile(evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileInputName.value;
  profileJob.textContent = popupProfileInputJob.value;
  closePopup(popupProfile);
}

function handleSaveCard(evt) {
  evt.preventDefault();
  const card = getCard({name: popupCardInputName.value, link: popupCardInputSrc.value});
  listCard.prepend(card);
  popupCardForm.reset();
  closePopup(popupCard);
}

function handleOpenImage(name, src) {
  popupImagePicture.src = src;
  popupImagePicture.alt = name;
  popupImageDescription.textContent = name;
  openPopup(popupImage);
}

function removeCard(evt) {
  evt.target.closest('.card').remove()
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
  cardBtnRemove.addEventListener('click', removeCard);
  cardImage.addEventListener('click', () => handleOpenImage(element.name, element.link));
  return card;
}

function renderCards() {
  const cards = initialCards.map(getCard);
  listCard.append(...cards);
}

renderCards();

profileBtnEdit.addEventListener('click', handleEditProfile);
popupProfileForm.addEventListener('submit', handleSaveProfile);

profileBtnAdd.addEventListener('click', () => {
  disableButtonForm(popupCardBtnSubmit, 'popup__btn-save_disabled');
  openPopup(popupCard);
});
popupCardForm.addEventListener('submit', handleSaveCard);

popups.forEach(popup => {
  popup.addEventListener('click', evt => {
    if (evt.target === popup || evt.target.classList.contains('popup__btn-close')) {
      closePopup(popup);
    }
  });
});