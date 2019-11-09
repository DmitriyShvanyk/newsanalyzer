export default class Stat{
  constructor(text = 'Слово', cards){
    this.text = text;
    this.cards = cards;
    this.showTestRequest();
    this.countTestRequestInTitle();
  }

  showTestRequest(){
    const outputRequest = document.querySelector('.output__request');
    outputRequest.textContent = this.text;
  }

  countTestRequestInTitle(){
    const outputMentionsTitles = document.querySelector('.output__mentions-titles');
    outputMentionsTitles.textContent = this.cards.totalResults;
  }  

}