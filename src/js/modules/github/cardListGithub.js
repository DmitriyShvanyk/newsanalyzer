import Swiper from 'swiper'
import CardGithub from './cardGithub.js'
import NormalizeDate from '../dateNormalize.js'


export default class CardListGithub {
  constructor(container, card) {
    this.container = container;
    this.card = card;
    this.renderCard();
    this.initSlider();
  }
  addCard(...args) {
    const { cardElement } = new CardGithub(...args);
    this.container.appendChild(cardElement);
  }
  renderCard() {
    for (let i = 0; i < this.card.length; i++) {
      this.addCard(
        this.card[i].commit.committer.name,
        this.card[i].commit.committer.email,
        new NormalizeDate(this.card[i].commit.author.date).render(),
        this.card[i].commit.message,
        this.card[i].author.avatar_url
      )

    }

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