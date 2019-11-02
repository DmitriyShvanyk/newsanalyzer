import '../../node_modules/swiper/css/swiper.css';
import '../pages/project.css'

import Swiper from 'swiper';

const slider = new Swiper('.slider__swiper-container', {
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