import { normalizeDate } from '../../js/main.js'

export default class CardGithubList {
  constructor(container, cards, callback) {
    this._container = container;
    this._cards = cards;
    this._callback = callback;
  }

  addCards(...args) {
    const { cardElement } = this._callback(...args);
    this._container.appendChild(cardElement);
  }

  renderCards() {
    this._cards.forEach(card => {
      this.addCards(
        card.commit.committer.name,
        card.commit.committer.email,
        normalizeDate(card.commit.author.date),
        card.commit.message,
        card.author.avatar_url
      );
    });

  }

}