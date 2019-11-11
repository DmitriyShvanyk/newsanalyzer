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


export const date = new Date();
export const dateTime = date.getTime();
export const day = 60 * 60 * 24 * 1000;
export const dateSixDaysAgo = day * 6;
export const dateFrom = new Date(dateTime - dateSixDaysAgo);
export const dateTo = date;
export const weekList = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']; // sunday - index[0]
export const monthList = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];


