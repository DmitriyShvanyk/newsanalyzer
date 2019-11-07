export default class CardGithub {
  constructor(...args) {
    this.cardElement = this.createCard(...args);
  }

  createCard(name, email, date, message, avatar) {

    const cardFragment = document.createDocumentFragment();
    const card = document.createElement('div');
    const cardItem = document.createElement('div');
    const cardDate = document.createElement('time');
    const cardHead = document.createElement('div');
    const cardPhoto = document.createElement('div');
    const cardImage = document.createElement('img');
    const cardContent = document.createElement('div');
    const cardAuthor = document.createElement('div');
    const cardEmail = document.createElement('div');
    const cardBody = document.createElement('div');
    const cardParagraph = document.createElement('p');

    card.classList.add('swiper-slide', 'slider__swiper-slide');
    cardItem.classList.add('slider__item');
    cardDate.classList.add('slider__date');
    cardHead.classList.add('slider__head');
    cardPhoto.classList.add('slider__photo');
    cardImage.classList.add('slider__image');
    cardContent.classList.add('slider__content');
    cardAuthor.classList.add('slider__author');
    cardEmail.classList.add('slider__email');
    cardBody.classList.add('slider__body');
    cardParagraph.classList.add('slider__paragraph');

    cardDate.setAttribute('datetime', date);
    cardDate.textContent = date;
    cardImage.src = avatar;
    cardImage.alt = name;
    cardAuthor.textContent = name;
    cardEmail.textContent = email;
    cardParagraph.textContent = message;

    cardPhoto.appendChild(cardImage);
    cardContent.appendChild(cardAuthor);
    cardContent.appendChild(cardEmail);
    cardHead.appendChild(cardPhoto);
    cardHead.appendChild(cardContent);
    cardBody.appendChild(cardParagraph);
    cardItem.appendChild(cardDate);
    cardItem.appendChild(cardHead);
    cardItem.appendChild(cardBody);
    card.appendChild(cardItem);
    cardFragment.appendChild(card);

    return card;
  }

}