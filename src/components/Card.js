export default class Card {

    constructor({data, templateSelector, userId, handleCardClick, handleCardRemove, handleCardLike}) {
        this.id = data._id;
        this._ownerId = data.owner._id;
        this._userId = userId;
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardRemove = handleCardRemove;
        this._handleCardLike = handleCardLike;
    }

    _getTemplate() {
        const card = document.querySelector(this._templateSelector)
        .content.
        querySelector('.card')
        .cloneNode(true);

        return card;
    }

    remove() {
        this._card.remove();
        this._card = null;
    }

    _toggleBtnLike() {
        this._btnLike.classList.toggle('card__like-btn_active')
    }

    _handleBtnLikeClick() {
        if (this._btnLike.classList.contains('card__like-btn_active')) {
            this._handleCardLike(this, 'DELETE');
        } else {
            this._handleCardLike(this, 'PUT');
        }
    }

    updateCountLike(data) {
        this._likes = data.likes;
        this._likeCountElement.textContent = this._likes.length;
        this._toggleBtnLike();
    }

    _checkUserLike() {
        this._likes.forEach(item => {
            if (item._id === this._userId) {
                this._toggleBtnLike();
            }
        });
    }

    _setEventListeners() {
        this._btnLike.addEventListener('click', () => this._handleBtnLikeClick());
        this._image.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    }

    _setEventRemoveCard() {
        this._btnRemove = this._card.querySelector('.card__remove');
        if (this._ownerId === this._userId) {
            this._btnRemove.addEventListener('click', () => this._handleCardRemove(this));
        } else {
            this._btnRemove.classList.add('card__remove_disabled');
        }
    }

    getElement() {
        this._card = this._getTemplate();
        this._btnLike = this._card.querySelector('.card__like-btn');
        this._image = this._card.querySelector('.card__image');
        this._likeCountElement = this._card.querySelector('.card__like-count');
        this._checkUserLike();

        this._card.querySelector('.card__title').textContent = this._name;
        this._image.src = this._link;
        this._image.alt = this._name;
        this._likeCountElement.textContent = this._likes.length;

        this._setEventRemoveCard();
        this._setEventListeners();
        return this._card;
    }
}