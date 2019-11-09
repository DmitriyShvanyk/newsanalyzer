import '../pages/analytics.css'
import Stat from './modules/stat.js';

const cardsStorage = JSON.parse(localStorage.getItem('cards')); 
const textStorage = JSON.parse(localStorage.getItem('text')); 

new Stat(textStorage, cardsStorage);

window.addEventListener('storage', function(){    
  new Stat(textStorage, cardsStorage);
});

