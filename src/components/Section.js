export default class Section{

    constructor(renderer, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderedCards(cards) {
        cards.forEach(card => {
            this.addItem(card);
        });
    }

    addItem(data) {
        const card = this._renderer(data)
        this._container.prepend(card);
    }
}