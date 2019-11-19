import CardNews from './cardNews.js'
import NormalizeDate from '../dateNormalize.js'
import { newsBtnMore, newsBtnMoreActive } from '../../index.js'

export default class CardNewsList {
  constructor(container, cards) {
    this.container = container;
    this.cards = cards;
    this.renderCards(cards.articles);    
    this.renderCardsMore();
  }
  addCards(...args) {
    const { cardElement } = new CardNews(...args);
    this.container.appendChild(cardElement);
  }
  renderCards(cards) {
    cards.slice(0, 3).forEach(card => {
      this.addCards(
        card.urlToImage,
        new NormalizeDate(card.publishedAt).render(),
        card.title,
        card.description,
        card.source.name,
        card.url
      );
    });
  }
  checkCards(arr, newArr) {
    const items = arr.filter(item => !newArr.includes(item));
    const newItems = items.slice(0, 3);
    return newItems;
  }
  renderCardsMore() {
    const articles = this.cards.articles;
    const addArticles = this.cards.articles.slice(0, 3);

    newsBtnMore.addEventListener('click', () => {      

      if (addArticles.length !== articles.length) {

        const newArticles = this.checkCards(articles, addArticles);

        this.renderCards(newArticles);

        newArticles.forEach(item => addArticles.push(item));

        this.checkCards(articles, addArticles);

        if (addArticles.length >= articles.length) {
          newsBtnMore.classList.remove(newsBtnMoreActive);
        }
        else {
          newsBtnMore.classList.add(newsBtnMoreActive);
        }

      }

    });  

  }  

}