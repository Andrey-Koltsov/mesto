import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithRemoveCard from "../components/PopupWithRemoveCard.js";
import Api from "../components/Api.js";
import "./index.css";

import {
  profileSelectors,
  configValidate,
  listCardSelector,
  popupProfileForm,
  popupCardForm,
  profileBtnAdd,
  profileBtnEdit,
  avatar,
  popupAvatarForm
} from "../utils/constants.js";

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43',
  headers: {
    authorization: '10f3c5e9-427f-4c5d-b986-8f6bfc1bfc5c',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo(profileSelectors);
const section = new Section(getCard, listCardSelector);


const popupWithUpdateAvatar = new PopupWithForm({
  popupSelector: '.popup_place_avatar',
  submitForm: (data) => {
    api.setUserAvatar(data['card-src'])
      .then(data => {
        console.log(res);
        userInfo.setUserInfo(data);
      });
  }
});
popupWithUpdateAvatar.setEventListeners();

const popupWithEditProfile = new PopupWithForm({
  popupSelector: '.popup_place_profile',
  submitForm: (data) => {
    api.setUserInfo(data)
      .then(data => {
        userInfo.setUserInfo(data);
    });
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

const popupWithImage = new PopupWithImage('.popup_place_card-image');
popupWithImage.setEventListeners();

const popupWithRemoveCard = new PopupWithRemoveCard({
  popupSelector: '.popup_place_card-remove',
  handleRemove: () => {
    console.log('Remove Card!');
    popupWithRemoveCard.close();
  }
});
popupWithRemoveCard.setEventListeners();


const formProfileValidate = new FormValidator(configValidate, popupProfileForm);
const formCardValidate = new FormValidator(configValidate, popupCardForm);
const formAvatarValidate = new FormValidator(configValidate, popupAvatarForm);
formProfileValidate.enableValidation();
formCardValidate.enableValidation();
formAvatarValidate.enableValidation();


function getCard(dataElement) {
  const card = new Card({
    data: dataElement,
    templateSelector: '.template-card',
    userId: userInfo.getUserId(),
    handleCardClick: (name, src) => popupWithImage.open(name, src),
    handleCardRemove: (cardId) => {
      popupWithRemoveCard.open();
      console.log(cardId);
    }
  });
  return card.getElement();
}

function getUserInfo() {
  const {name, job} = userInfo.getUserInfo();
  return [{
    selector: '.popup__input_form_name',
    value: name
  },
  {
    selector: '.popup__input_form_job',
    value: job
  }]
}

profileBtnEdit.addEventListener('click', () => {
  formProfileValidate.disableButtonForm();
  popupWithEditProfile.setInputsData(getUserInfo());
  popupWithEditProfile.open();
});

profileBtnAdd.addEventListener('click', () => {
  formCardValidate.disableButtonForm();
  popupWithCardAdd.open();
});

avatar.addEventListener('click', () => {
  formAvatarValidate.disableButtonForm();
  popupWithUpdateAvatar.open();
});

Promise.all([api.getCard(), api.getUserInfo()])
  .then(([cards, userData]) => {
    userInfo.setUserInfo(userData);

    cards.forEach(card => {
      section.addItem(getCard(card));
    });

    console.log(userData);
    
  });