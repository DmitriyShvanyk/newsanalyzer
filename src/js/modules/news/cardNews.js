export default class CardNews {
  constructor(imageCard, dateCard, titleCard, textCard, sourceCard, urlCard) {
    this.cardElement = this.createCard(imageCard, dateCard, titleCard, textCard, sourceCard, urlCard);
  }

  createCard(image, date, title, text, source, url) {
    const fragmentCard = document.createDocumentFragment();
    const card = document.createElement('div');
    const cardItem = document.createElement('div');
    const cardHead = document.createElement('div');
    const cardImage = document.createElement('img');
    const cardBody = document.createElement('div');
    const cardDate = document.createElement('time');
    const cardTitle = document.createElement('h3');
    const cardLink = document.createElement('a');
    const cardParagraph = document.createElement('p');
    const cardFoot = document.createElement('div');
    const cardSource = document.createElement('a');

    card.classList.add('news__column');
    cardItem.classList.add('news__item');
    cardHead.classList.add('news__head');
    cardImage.classList.add('news__image');
    cardBody.classList.add('news__body');
    cardDate.classList.add('news__date');
    cardTitle.classList.add('news__title');
    cardLink.classList.add('news__link');
    cardParagraph.classList.add('news__paragraph');
    cardFoot.classList.add('news__foot');
    cardSource.classList.add('news__source');

    cardImage.src = image;
    cardImage.alt = title;
    
    function errorImage() {
      cardImage.src = 'https://cdn.browshot.com/static/images/not-found.png';
    }
    cardImage.addEventListener('error', errorImage);

    cardDate.textContent = date;
    cardDate.setAttribute('datetime', date);
    cardLink.textContent = title;
    cardLink.href = url;
    cardLink.target = '_blank';
    cardParagraph.textContent = text;
    cardSource.textContent = source;
    cardSource.href = url;
    cardSource.target = '_blank';

    cardHead.appendChild(cardImage);
    cardTitle.appendChild(cardLink);
    cardBody.appendChild(cardDate);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardParagraph);
    cardFoot.appendChild(cardSource);
    cardItem.appendChild(cardHead);
    cardItem.appendChild(cardBody);
    cardItem.appendChild(cardFoot);
    card.appendChild(cardItem);
    fragmentCard.appendChild(card);

    return card;
  }
  

}
