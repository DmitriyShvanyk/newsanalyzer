import Swiper from 'swiper';

const mySwiper = new Swiper('.swiper-container', {
  loop: true,
  slidesPerView: 3,
  spaceBetween: 16,
  clickable: true,
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
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