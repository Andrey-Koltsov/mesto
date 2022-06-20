export default class Section{

    constructor(renderer, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderedCards(cards) {
        cards.forEach(card => {
            const cardElement = this._renderer(card);
            this.addItem(cardElement);
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }
}