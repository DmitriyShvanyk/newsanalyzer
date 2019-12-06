import Preloader from '../blocks/preloader/preloader.js'
import Lazy from '../blocks/lazy/lazy.js'


// loader page
const preloader = new Preloader();
const preloaderPage = document.querySelector('.preloader--page');
const preloaderPageHidden = 'preloader--hidden';

preloader.load(1000)
  .then(() => {
    preloaderPage.classList.add(preloaderPageHidden);
  }).catch(() => {
    preloaderPage.classList.remove(preloaderPageHidden);
  }); 


// lazy load
window.addEventListener('DOMContentLoaded', () => new Lazy('.lazy'));
window.addEventListener('scroll', () => new Lazy('.lazy'));
window.addEventListener('click', () => new Lazy('.lazy'));


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
export function normalizeDate(card) {
  const date = new Date(card);
  const nowDate = date.getDate();
  const nowMonth = date.getMonth();
  const nowYears = date.getFullYear();
  const datePublished = `${nowDate} ${monthListWhen[nowMonth]}, ${nowYears}`;

  return datePublished;
}


// current years
function showCurrentYears(domElement) {
  return domElement.textContent = new Date().toLocaleString('ru', { year: 'numeric' });
}


// footer date copyright
const footerDateYears = document.querySelector('.footer__date');
showCurrentYears(footerDateYears);