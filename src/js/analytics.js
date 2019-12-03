import '../pages/analytics.css'
import Stat from './modules/stat.js'

export const analyticsContainer = document.querySelector('.analytics__container');


// get localStorage for text, cards
const keyTextStorage = JSON.parse(localStorage.getItem('keyText'));
const cardsStorage = JSON.parse(localStorage.getItem('cards'));
const stat = new Stat(keyTextStorage, cardsStorage).getArticlesPerDay();

window.addEventListener('storage', () => stat);


// uniq months
export function uniqMonths(arr) {
  return [...new Set(arr)];  
}

// show uniq months
export function showMonths(arr){
  return arr.map(item => new Date(item.publishedAt).toLocaleString('ru', { month: 'long' }));
}