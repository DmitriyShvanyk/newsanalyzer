import CardNews from './cardNews.js';
import { month } from '../../main.js';

export default class CardListNews {
  constructor(container, card) {
    this.container = container;
    this.card = card;
    this.renderCard();
  }

  addCard(imageCard, dateCard, titleCard, textCard, sourceCard, urlCard) {
    const { cardElement } = new CardNews(imageCard, dateCard, titleCard, textCard, sourceCard, urlCard);
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

}