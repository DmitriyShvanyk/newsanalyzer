import CardNews from './../__column/cardNews.js'
import { normalizeDate } from '../../../js/main.js'
import { newsBtnMore, newsBtnMoreActive } from '../../../js/index.js'

export default class CardListNews {
  constructor(container, cards) {
    this._container = container;
    this._cards = cards;
    this.offset = 0;

    this.renderCards();
    newsBtnMore.onclick = () => this.renderCards();
  }

  addCards(...args) {
    const { cardElement } = new CardNews(...args);
    this._container.appendChild(cardElement);
  }

  renderCards() {
    const articles = this._cards.articles;

    for (let i = this.offset; i < Math.min(this.offset + 3, articles.length); i++) {
      const article = articles[i];
      this.addCards(
        article.urlToImage,
        normalizeDate(article.publishedAt),
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