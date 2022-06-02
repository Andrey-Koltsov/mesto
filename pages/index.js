import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";

import {
  configValidate,
  initialCards,
  listCard,
  listCardSelector,
  popupCard,
  popupCardForm,
  popupCardInputName,
  popupCardInputSrc,
  popupImage,
  popupImageDescription,
  popupImagePicture,
  popupProfile,
  popupProfileForm,
  popupProfileInputJob,
  popupProfileInputName,
  popups,profileBtnAdd,
  profileBtnEdit,
  profileJob,
  profileName,
  profileSelectors
} from "../utils/constants.js";


const userInfo = new UserInfo(profileSelectors);


const section = new Section({
  items: initialCards,
  renderer: (dataElement) => {
    const card = new Card(dataElement, '.template-card', handleOpenImage);
    return card.getElement();
  }
}, listCardSelector);

section.initialRender();

// OLD

const formProfileValidate = new FormValidator(configValidate, popupProfileForm);
const formCardValidate = new FormValidator(configValidate, popupCardForm);
formProfileValidate.enableValidation();
formCardValidate.enableValidation();


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

// function getCard(dataElement) {
//   const card = new Card(dataElement, '.template-card', handleOpenImage);
//   return card.getElement();
// }

// function renderCards() {
//   const cards = initialCards.map(getCard);
//   listCard.append(...cards);
// }
// renderCards();

profileBtnEdit.addEventListener('click', handleEditProfile);
popupProfileForm.addEventListener('submit', handleSaveProfile);

profileBtnAdd.addEventListener('click', () => {
  formCardValidate.disableButtonForm();
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