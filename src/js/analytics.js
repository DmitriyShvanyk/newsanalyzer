import '../pages/analytics.css'
import Stat from './modules/stat.js'
import MyDate from './modules/myDate.js';

export const timePeriod = 7;

// get localStorage for text, cards
const keyTextStorage = JSON.parse(localStorage.getItem('keyText'));
const cardsStorage = JSON.parse(localStorage.getItem('cards'));

new Stat(keyTextStorage, cardsStorage);

window.addEventListener('storage', () => new Stat(keyTextStorage, cardsStorage));


// show month 
const graphMonth = document.querySelector('.graph__span');
new MyDate(graphMonth).renderMonth();