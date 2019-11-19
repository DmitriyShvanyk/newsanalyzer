import Loader from './modules/loader.js';
import MyDate from './modules/myDate.js';
import LazyLoad from './modules/lazyLoad.js';


// loader page
const loader = new Loader();
const preloaderPage = document.querySelector('.preloader--page');
const preloaderPageHidden = 'preloader--hidden';

loader.load(1000)
  .then(() => {
    preloaderPage.classList.add(preloaderPageHidden);
  }).catch(() => {
    preloaderPage.classList.remove(preloaderPageHidden);
  });


// lazy load
window.addEventListener('DOMContentLoaded', () => new LazyLoad('.lazy'));
window.addEventListener('scroll', () => new LazyLoad('.lazy'));
window.addEventListener('click', () => new LazyLoad('.lazy'));


// footer date copyright
const footerDateYears = document.querySelector('.footer__date');
new MyDate(footerDateYears).renderYears();


// variable date
export const date = new Date();
export const dateTime = date.getTime();
export const day = 60 * 60 * 24 * 1000;
export const dateSixDaysAgo = day * 6;
export const dateFrom = new Date(dateTime - dateSixDaysAgo);
export const dateTo = date;
export const monthList = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
export const monthListWhen = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];


// normalize date
export function normalizeDate(array) {
  const date = new Date(array);
  const nowDate = date.getDate();
  const nowMonth = date.getMonth();
  const nowYears = date.getFullYear();
  const datePublished = `${nowDate} ${monthListWhen[nowMonth]}, ${nowYears}`;

  return datePublished;
}