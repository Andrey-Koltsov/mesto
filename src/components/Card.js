export default class Card {

    constructor({data, templateSelector, userId, handleCardClick, handleCardRemove}) {
        this._id = data._id;
        this._ownerId = data.owner._id;
        this._userId = userId;
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes.length;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardRemove = handleCardRemove;
    }

    _getTemplate() {
        const card = document.querySelector(this._templateSelector)
        .content.
        querySelector('.card')
        .cloneNode(true);

        return card;
    }

    _handleBtnLike() {
        this._btnLike.classList.toggle('card__like-btn_active')
    }

    _handleBtnRemove() {
        this._card.remove();
        this._card = null;
    }

    _setEventListeners() {
        this._btnLike.addEventListener('click', () => this._handleBtnLike());
        this._image.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    }

    _setEventRemoveCard() {
        this._btnRemove = this._card.querySelector('.card__remove');
        if (this._ownerId !== this._userId) {
            this._btnRemove.addEventListener('click', () => this._handleCardRemove(this._id));
        } else {
            this._btnRemove.classList.add('card__remove_disabled');
        }
    }

    getElement() {
        this._card = this._getTemplate();
        this._btnLike = this._card.querySelector('.card__like-btn');
        this._image = this._card.querySelector('.card__image');
        this._likeCountElement = this._card.querySelector('.card__like-count');

        this._card.querySelector('.card__title').textContent = this._name;
        this._image.src = this._link;
        this._image.alt = this._name;
        this._likeCountElement.textContent = this._likes;

        this._setEventRemoveCard();
        this._setEventListeners();
        return this._card;
    }
}