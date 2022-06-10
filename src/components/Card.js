export default class Card {

    constructor({data, templateSelector, handleCardClick}) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
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
        this._btnRemove.addEventListener('click', () => this._handleBtnRemove());
        this._image.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    }

    getElement() {
        this._card = this._getTemplate();
        this._btnLike = this._card.querySelector('.card__like-btn');
        this._btnRemove = this._card.querySelector('.card__remove');
        this._image = this._card.querySelector('.card__image');

        this._card.querySelector('.card__title').textContent = this._name;
        this._image.src = this._link;
        this._image.alt = this._name;

        this._setEventListeners();
        return this._card;
    }
}