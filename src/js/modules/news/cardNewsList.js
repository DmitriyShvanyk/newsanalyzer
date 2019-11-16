import CardNews from './cardNews.js'
import NormalizeDate from '../dateNormalize.js'
import { newsBtnMore, newsBtnMoreActive } from '../../index.js'

export default class CardListNews {
  constructor(container, cards) {
    this._container = container;
    this._cards = cards;
    this.offset = 0;

    this.renderCards();
    newsBtnMore.addEventListener('click', () => this.renderCards());
  }
  createCards(...args) {
    const { cardElement } = new CardNews(...args);
    this._container.appendChild(cardElement);
  }
  renderCards() {
    const articles = this._cards.articles;

    for (let i = this.offset; i < Math.min(this.offset + 3, articles.length); i++) {
      const article = articles[i];
      this.createCards(
        article.urlToImage,
        new NormalizeDate(article.publishedAt).render(),
        article.title,
        article.description,
        article.source.name,
        article.url
      )
    }

    this.offset += 3;

    if (this.offset >= articles.length) {
      newsBtnMore.classList.remove(newsBtnMoreActive);
    }
    else {
      newsBtnMore.classList.add(newsBtnMoreActive);
    }

  }


}