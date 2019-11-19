import '../../node_modules/swiper/css/swiper.css';
import '../pages/project.css';

import Swiper from 'swiper';
import ApiGithub from './modules/github/apiGithub.js';
import CardGithubList from './modules/github/cardGithubList.js';

const cardsGithubContainer = document.querySelector('.swiper-wrapper');
const apiGithub = new ApiGithub({
  baseURL: 'https://api.github.com/repos/DmitriyShvanyk/newsanalyzer/commits'
});

apiGithub.initCardsGithub()
  .then(cards => {   

    new CardGithubList(cardsGithubContainer, cards);

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

  }).catch(function (err) {
    return Promise.reject(`Ошибка: ${err.status}`);
  });