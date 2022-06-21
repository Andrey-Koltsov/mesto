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

const formProfileValidate = new FormValidator(configValidate, popupProfileForm);
const formCardValidate = new FormValidator(configValidate, popupCardForm);
const formAvatarValidate = new FormValidator(configValidate, popupAvatarForm);
formProfileValidate.enableValidation();
formCardValidate.enableValidation();
formAvatarValidate.enableValidation();




const popupWithUpdateAvatar = new PopupWithForm({
  popupSelector: '.popup_place_avatar',
  submitForm: (data) => {
    formAvatarValidate.loadingButtonForm(true);
    api.setUserAvatar(data['card-src'])
      .then(data => {
        userInfo.setUserInfo(data);
        formAvatarValidate.loadingButtonForm(false);
        popupWithUpdateAvatar.close();
      })
      .catch(err => console.log(err));
  }
});
popupWithUpdateAvatar.setEventListeners();

const popupWithEditProfile = new PopupWithForm({
  popupSelector: '.popup_place_profile',
  submitForm: (data) => {
    formProfileValidate.loadingButtonForm(true);
    api.setUserInfo(data)
      .then(data => {
        userInfo.setUserInfo(data);
        formProfileValidate.loadingButtonForm(false);
        popupWithEditProfile.close();
      })
      .catch(err => console.log(err));
  }
});
popupWithEditProfile.setEventListeners();

const popupWithCardAdd = new PopupWithForm({
  popupSelector: '.popup_place_card-add',
  submitForm: (data) => {
    formCardValidate.loadingButtonForm(true);
    api.createCard(data['card-name'], data['card-src'])
      .then(data => {
        section.addItem(getCard(data));
        formCardValidate.loadingButtonForm(false);
        popupWithCardAdd.close();
      })
      .catch(err => console.log(err));
    
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
    userId: userInfo.getUserId(),
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

Promise.all([api.getCards(), api.getUserInfo()])
  .then(([cards, userData]) => {
    userInfo.setUserInfo(userData);
    section.renderedCards(cards);
  })
  .catch(err => console.log(err));