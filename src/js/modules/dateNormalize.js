import { monthListWhen } from '../main.js'

export default class NormalizeDate {
  constructor(dateArr) {
    this.dateArr = dateArr;
    //this.render();
  }
  render() {
    const date = new Date(this.dateArr);
    const nowDate = date.getDate();
    const nowMonth = date.getMonth();
    const nowYears = date.getFullYear();
    const datePublished = `${nowDate} ${monthListWhen[nowMonth]}, ${nowYears}`;

    return datePublished;
  }

}