import Swiper from 'swiper'
import CardGithub from './cardGithub.js'
import NormalizeDate from '../dateNormalize.js'

export default class CardGithubList {
  constructor(container, cards) {
    this._container = container;
    this._cards = cards;
    this.renderCards();
    this.initSlider();
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
        new NormalizeDate(card.commit.author.date).render(),
        card.commit.message,
        card.author.avatar_url
      );
    });
  }
  initSlider() {
    new Swiper('.slider__swiper-container', {
      loop: true,
      preloadImages: false,
      lazy: true,
      slidesPerView: 3,
      spaceBetween: 16,
      pagination: {
        el: '.slider__swiper-pagination',
      },
      navigation: {
        nextEl: '.slider__swiper-button-next',
        prevEl: '.slider__swiper-button-prev',
      },
      clickable: true,
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 8,
          clickable: true
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 8,
          clickable: true
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 8,
          clickable: true
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 16,
          clickable: true
        },
        1441: {
          slidesPerView: 4,
          spaceBetween: 16,
          clickable: true
        }

      }

    });

  }

}