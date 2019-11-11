import CardNews from './cardNews.js'
import { newsBtnMore } from '../../index.js'
import NormalizeDate from '../dateNormalize.js'


export default class CardListNews {
  constructor(container, card) {
    this.container = container;
    this.card = card;
    this.renderCard();
    this.renderFirstCards();

    this.renderMoreCards.bind(this);
  }
  addCard(...args) {
    const { cardElement } = new CardNews(...args);
    this.container.appendChild(cardElement);
  }
  renderCard() {
    for (let i = 0; i < this.card.articles.length; i++) {
      this.addCard(
        this.card.articles[i].urlToImage,
        new NormalizeDate(this.card.articles[i].publishedAt).render(),
        this.card.articles[i].title,
        this.card.articles[i].description,
        this.card.articles[i].source.name,
        this.card.articles[i].url
      )

    }

  }
  renderFirstCards() {
    const start = 3;
    const cards = document.querySelectorAll('.news__column:not(.news__column--active)');
    const elem = Array.from(cards).slice(0, start);

    for (let i = 0; i < elem.length; i++) {
      elem[i].classList.add('news__column--active');
    }

    newsBtnMore.addEventListener('click', this.renderMoreCards);

  }
  renderMoreCards() {    
    const cardsActive = document.querySelectorAll('.news__column--active');
    let index = 0;
    let step = 3;
    let nextCard = cardsActive[cardsActive.length - 1].nextElementSibling;

    while (index < step) {
      if (nextCard) {
        nextCard.classList.add('news__column--active');
        nextCard = nextCard.nextElementSibling;
        index++
      }
      else {
        newsBtnMore.classList.remove('news__btn-more--active');
        break;
      }
    }

  }

 /* remove() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }*/

}