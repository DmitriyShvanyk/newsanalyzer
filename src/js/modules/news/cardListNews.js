import CardNews from './cardNews.js'
import NormalizeDate from '../dateNormalize.js'
import { newsBtnMore, newsBtnMoreActive } from '../../index.js'

export default class CardListNews {
  constructor(container, card) {
    this.container = container;
    this.card = card;
    this.offset = 0;

    this.renderCard();
    newsBtnMore.addEventListener('click', () => this.renderCard());
  }

  createCard(...args) {
    const { cardElement } = new CardNews(...args);
    this.container.appendChild(cardElement);
  }

  renderCard() {
    const articles = this.card.articles;

    for (let i = this.offset; i < Math.min(this.offset + 3, articles.length); i++) {
      this.createCard(
        articles[i].urlToImage,
        new NormalizeDate(articles[i].publishedAt).render(),
        articles[i].title,
        articles[i].description,
        articles[i].source.name,
        articles[i].url
      )
    }

    this.offset += 3;

    if (this.offset >= articles.length) {
      newsBtnMore.classList.remove(newsBtnMoreActive);
    }
    else{
      newsBtnMore.classList.add(newsBtnMoreActive);
    }

  }

}