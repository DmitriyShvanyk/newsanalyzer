import Swiper from 'swiper';
import CardGithub from './cardGithub.js';
import { month } from '../../main.js';

export default class CardListGithub {
  constructor(container, card) {
    this.container = container;
    this.card = card;
    this.renderCard();
    this.initSlider();
  }

  addCard(nameCard, emailCard, dateCard, messageCard, avatarCard) {
    const { cardElement } = new CardGithub(nameCard, emailCard, dateCard, messageCard, avatarCard);
    this.container.appendChild(cardElement);
  }

  renderCard() {
    for (let i = 0; i < this.card.length; i++) {
      const date = new Date(this.card[i].commit.author.date);
      const nowDate = date.getDate();
      const nowYears = date.getFullYear();
      const nowMonth = date.getMonth();
      const dateGithubCommit = `${nowDate} ${month[nowMonth]}, ${nowYears}`;

      this.addCard(
        this.card[i].commit.committer.name,
        this.card[i].commit.committer.email,
        dateGithubCommit,
        this.card[i].commit.message,
        this.card[i].author.avatar_url
      )
    }
  }

  initSlider() {
    new Swiper('.slider__swiper-container', {
      loop: true,
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