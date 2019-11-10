export default class NormalizeDate {
  constructor(dateArr) {
    this.dateArr = dateArr;
    this.render();
  }
  render() {
    const date = new Date(this.dateArr);
    const nowDate = date.getDate();
    const monthArray = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    const nowMonth = date.getMonth();
    const nowYears = date.getFullYear();
    const datePublished = `${nowDate} ${monthArray[nowMonth]}, ${nowYears}`;

    return datePublished;
  }
}



