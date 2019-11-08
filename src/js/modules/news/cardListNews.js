import CardNews from './cardNews.js';
import { month } from '../../main.js';

export default class CardListNews {
  constructor(container, card = '') {
    this.container = container;
    this.card = card;
    this.renderCard();
  }

  addCard(...args) {
    const { cardElement } = new CardNews(...args);
    this.container.appendChild(cardElement);
  }

  renderCard() {
    for (let i = 0; i < this.card.articles.length; i++) {
      const date = new Date(this.card.articles[i].publishedAt);
      const nowDate = date.getDate();
      const nowMonth = date.getMonth();
      const nowYears = date.getFullYear();
      const dateNewsPublished = `${nowDate} ${month[nowMonth]}, ${nowYears}`;

      this.addCard(
        this.card.articles[i].urlToImage,
        dateNewsPublished,
        this.card.articles[i].title,
        this.card.articles[i].description,
        this.card.articles[i].source.name,
        this.card.articles[i].url
      )

    }

  }

  /*removeCard() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }*/

}