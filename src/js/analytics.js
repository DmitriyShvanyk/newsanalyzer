import '../pages/analytics.css'
import Stat from './modules/stat.js'

export const analyticsContainer = document.querySelector('.analytics__container');


// get localStorage for text, cards
const keyTextStorage = JSON.parse(localStorage.getItem('keyText'));
const cardsStorage = JSON.parse(localStorage.getItem('cards'));

new Stat(keyTextStorage, cardsStorage);
window.addEventListener('storage', () => new Stat(keyTextStorage, cardsStorage));


// uniq months
export function uniqMonths(arr) {

  const monthUniq = [];

  arr.forEach(item => {
    if (!monthUniq.includes(item)) {
      monthUniq.push(item);
    }
  });

  return monthUniq;
}


// show months
export function showMonths(articles) {
  let resultMonth = [];

  for (let i = 0; i < articles.length; i++) {
    const months = new Date(articles[i].publishedAt).toLocaleString('ru', { month: 'long' });
    resultMonth.push(months);
  }

  return resultMonth;
}