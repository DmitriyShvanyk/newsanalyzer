import { COUNT_ARTICLES } from '../../../js/config.js'
import { normalizeDate } from '../../../js/main.js'
import { newsBtnMore, newsBtnMoreActive } from '../../../js/index.js'

export default class CardListNews {
  constructor(container, cards, callback) {    
    this._container = container;
    this._cards = cards;        
    this._callback = callback;
    this._offset = 0;

    newsBtnMore.onclick = () => this.renderCards();
  }

  addCards(...args) {
    const { cardElement } = this._callback(...args);
    this._container.appendChild(cardElement);
  }

  renderCards() {
    const articles = this._cards.articles;    

    for (let i = this._offset; i < Math.min(this._offset + COUNT_ARTICLES, articles.length); i++) {
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

    this._offset += COUNT_ARTICLES;

    if (this._offset >= articles.length) {
      newsBtnMore.classList.remove(newsBtnMoreActive);
    }
    else {
      newsBtnMore.classList.add(newsBtnMoreActive);
    }

  }

}