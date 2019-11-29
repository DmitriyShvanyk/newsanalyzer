export default class ScrollTo {
  constructor(scrollElement, scrollToElement) {
    this._scrollElement = scrollElement;
    this._scrollToElement = scrollToElement;

    this.scroll = this.scroll.bind(this);
  }

  scroll() {
    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: this._scrollToElement.getBoundingClientRect().top + window.scrollY
    });
  }
  
}