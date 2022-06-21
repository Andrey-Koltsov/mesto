import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/Api.js";
import "./index.css";

import {
  profileSelectors,
  configValidate,
  listCardSelector,
  profileBtnAdd,
  profileBtnEdit,
  avatar
} from "../utils/constants.js";

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43',
  headers: {
    authorization: '10f3c5e9-427f-4c5d-b986-8f6bfc1bfc5c',
    'Content-Type': 'application/json'
  }
});


const formValidators = {}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(configValidate);


const userInfo = new UserInfo(profileSelectors);
const section = new Section(getCard, listCardSelector);


const popupWithUpdateAvatar = new PopupWithForm({
  popupSelector: '.popup_place_avatar',
  submitForm: (data) => {
    popupWithUpdateAvatar.loadingButtonForm(true);
    api.setUserAvatar(data['card-src'])
      .then(data => {
        userInfo.setInfo(data);
        popupWithUpdateAvatar.close();
      })
      .catch(err => console.log(err))
      .finally(() => popupWithUpdateAvatar.loadingButtonForm(false));
  }
});
popupWithUpdateAvatar.setEventListeners();

const popupWithEditProfile = new PopupWithForm({
  popupSelector: '.popup_place_profile',
  submitForm: (data) => {
    popupWithEditProfile.loadingButtonForm(true);
    api.setUserInfo(data)
      .then(data => {
        userInfo.setInfo(data);
        popupWithEditProfile.close();
      })
      .catch(err => console.log(err))
      .finally(() => popupWithEditProfile.loadingButtonForm(false));
  }
});
popupWithEditProfile.setEventListeners();

const popupWithCardAdd = new PopupWithForm({
  popupSelector: '.popup_place_card-add',
  submitForm: (inputsData) => {
    popupWithCardAdd.loadingButtonForm(true);
    api.createCard(inputsData['card-name'], inputsData['card-src'])
      .then(data => {
        section.addItem(data);
        popupWithCardAdd.close();
      })
      .catch(err => console.log(err))
      .finally(() => popupWithCardAdd.loadingButtonForm(false));
  }
});
popupWithCardAdd.setEventListeners();

const popupWithImage = new PopupWithImage('.popup_place_card-image');
popupWithImage.setEventListeners();

const popupWithConfirmation = new PopupWithConfirmation('.popup_place_card-remove');
popupWithConfirmation.setEventListeners();


function getCard(dataElement) {
  const card = new Card({
    data: dataElement,
    templateSelector: '.template-card',
    userId: userInfo.getId(),
    handleCardClick: (name, src) => popupWithImage.open(name, src),
    handleCardRemove: (card) => {
      popupWithConfirmation.open();
      popupWithConfirmation.setActionSubmit(() => {
        api.removeCard(card.id)
          .then(data => {
            card.remove();
            popupWithConfirmation.close();
          })
          .catch(err => console.log(err));  
      });
    },
    handleCardLike: (card, method) => {
      api.likeCard(method, card.id)
        .then(data => {
          card.updateCountLike(data.likes);
        })
        .catch(err => console.log(err));
    }
  });
  return card.getElement();
}


profileBtnEdit.addEventListener('click', () => {
  formValidators['form-profile'].disableButtonForm();
  popupWithEditProfile.setInputValues(userInfo.getInfo());
  popupWithEditProfile.open();
});

profileBtnAdd.addEventListener('click', () => {
  formValidators['form-add-card'].disableButtonForm();
  popupWithCardAdd.open();
});

avatar.addEventListener('click', () => {
  formValidators['form-update-avatar'].disableButtonForm();
  popupWithUpdateAvatar.open();
});

Promise.all([api.getCards(), api.getUserInfo()])
  .then(([cards, userData]) => {
    userInfo.setInfo(userData);
    section.renderedCards(cards);
  })
  .catch(err => console.log(err));