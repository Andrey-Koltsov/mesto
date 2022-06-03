import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

import {
  initialCards,
  profileSelectors,
  configValidate,
  listCardSelector,
  popupProfileForm,
  popupCardForm,
  profileBtnAdd,
  profileBtnEdit,
} from "../utils/constants.js";


const userInfo = new UserInfo(profileSelectors);


const section = new Section({
  items: initialCards,
  renderer: (dataElement) => {
    const card = new Card({
      data: dataElement,
      templateSelector: '.template-card',
      handleCardClick: handleOpenImage
    });
    return card.getElement();
  }
}, listCardSelector);
section.initialRender();


const popupWithImage = new PopupWithImage('.popup_place_card-image');
popupWithImage.setEventListeners();


const popupWithEditProfile = new PopupWithForm({
  popupSelector: '.popup_place_profile',
  submitForm: (data) => {
    userInfo.setUserInfo({
      name: data['profile-name'],
      job: data['profile-job']
    });
    console.log(data);
  }
});
popupWithEditProfile.setEventListeners();


const popupWithCardAdd = new PopupWithForm({
  popupSelector: '.popup_place_card-add',
  submitForm: (data) => {
    const card = getCard({
      name: data['card-name'],
      link: data['card-src']
    });
    section.addItem(card);
  }
});
popupWithCardAdd.setEventListeners();


const formProfileValidate = new FormValidator(configValidate, popupProfileForm);
const formCardValidate = new FormValidator(configValidate, popupCardForm);
formProfileValidate.enableValidation();
formCardValidate.enableValidation();


function handleOpenImage(name, src) {
  popupWithImage.open(name, src);
}

function getCard(dataElement) {
  const card = new Card({
    data: dataElement,
    templateSelector: '.template-card',
    handleCardClick: handleOpenImage
  });
  return card.getElement();
}


profileBtnEdit.addEventListener('click', () => {
  formProfileValidate.disableButtonForm();
  popupWithEditProfile.open();
});

profileBtnAdd.addEventListener('click', () => {
  console.log('dsfsdf');
  formCardValidate.disableButtonForm();
  popupWithCardAdd.open();
});