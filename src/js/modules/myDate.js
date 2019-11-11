export default class MyDate {
  constructor(domElement) {
    this.domElement = domElement;
  }
  renderDay() {
    this.domElement.textContent = new Date().toLocaleString('ru', { day: 'numeric' });
  }
  renderMonth() {
    this.domElement.textContent = new Date().toLocaleString('ru', { month: 'long' });
  }
  renderYears() {
    this.domElement.textContent = new Date().toLocaleString('ru', { year: 'numeric' });
  }

}