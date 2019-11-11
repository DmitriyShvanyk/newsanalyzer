import '../pages/analytics.css'
import Stat from './modules/stat.js'
import MyDate from './modules/myDate.js';

export const timePeriod = 7;


// get localStorage for text, cards
const textStorage = JSON.parse(localStorage.getItem('text'));
const cardsStorage = JSON.parse(localStorage.getItem('cards'));

new Stat(textStorage, cardsStorage);

window.addEventListener('storage', () => new Stat(textStorage, cardsStorage));


// show month 
const graphMonth = document.querySelector('.graph__span');
new MyDate(graphMonth).renderMonth();