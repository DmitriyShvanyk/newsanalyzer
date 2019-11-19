export default class MyDate {
  constructor(domElement) {
    this._domElement = domElement;
  }
  renderDay() {
    this._domElement.textContent = new Date().toLocaleString('ru', { day: 'numeric' });
  }
  renderMonth() {
    this._domElement.textContent = new Date().toLocaleString('ru', { month: 'long' });
  }
  renderYears() {
    this._domElement.textContent = new Date().toLocaleString('ru', { year: 'numeric' });
  }

}