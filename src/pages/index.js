import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithRemoveCard from "../components/PopupWithRemoveCard.js";
import "./index.css";

import {
  initialCards,
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


const userInfo = new UserInfo(profileSelectors);

const section = new Section({
  items: initialCards,
  renderer: getCard
}, listCardSelector);
section.initialRender();


const popupWithUpdateAvatar = new PopupWithForm({
  popupSelector: '.popup_place_avatar',
  submitForm: (data) => {
    // const card = getCard({
    //   name: data['card-name'],
    //   link: data['card-src']
    // });
    // section.addItem(card);
  }
});
popupWithUpdateAvatar.setEventListeners();

const popupWithEditProfile = new PopupWithForm({
  popupSelector: '.popup_place_profile',
  submitForm: (data) => {
    userInfo.setUserInfo({
      name: data['profile-name'],
      job: data['profile-job']
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
  handleSave: () => {
    console.log('Remove Card!');
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
    handleCardClick: (name, src) => popupWithImage.open(name, src),
    handleCardRemove: () => {
      popupWithRemoveCard.open();
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