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
  return [...new Set(arr)];  
}

// show uniq months
export function showMonths(arr){
  return arr.map(item => {
    return new Date(item.publishedAt).toLocaleString('ru', { month: 'long' });
  })
}