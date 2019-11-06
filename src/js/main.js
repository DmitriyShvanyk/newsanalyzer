export const month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

import Loader from './modules/loader.js';

const loader = new Loader();
const preloaderPage = document.querySelector('.preloader--page');
const preloaderPageHidden = 'preloader--hidden';

loader.load(1000)
  .then(() => {
    preloaderPage.classList.add(preloaderPageHidden);
  }).catch(() => {
    preloaderPage.classList.remove(preloaderPageHidden);
  });