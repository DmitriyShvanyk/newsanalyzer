import CardGithub from './cardGithub.js'
import { normalizeDate } from '../../main.js'

export default class CardGithubList {
  constructor(container, cards) {
    this._container = container;
    this._cards = cards;
    this.renderCards();
  }
  addCards(...args) {
    const { cardElement } = new CardGithub(...args);
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