export default class Validate {
  constructor(formElement) {
    this._formElement = formElement;
    this.addAttrNovalidate();
  }

  addAttrNovalidate() {
    this._formElement.setAttribute('novalidate', true);
  }

  static hasError(field) {

    if (field.disabled || field.type === 'submit') {
      return;
    }

    let validity = field.validity;

    if (validity.valid) {
      return;
    }

    if (validity.valueMissing) {
      return 'Нужно ввести ключевое слово';
    }

    return 'Нужно ввести ключевое слово';
  }

  static showError(field, error) {
    let name = field.name;
    if (!name) {
      return;
    }

    let message = field.form.querySelector(`.form-search__error#form-search__error-${name}`);
    if (!message) {
      message = document.createElement('div');
      message.classList.add('form-search__error');
      message.id = 'form-search__error-' + name;
      message.setAttribute('aria-live', 'polite');

      field.parentElement.insertBefore(message, field.nextSibling);
    }

    message.textContent = error;
    message.classList.add('form-search__error--show');
  }

  static removeError(field) {

    let name = field.name;
    if (!name) {
      return;
    }

    let message = field.form.querySelector(`.form-search__error#form-search__error-${name}`);
    if (!message) {
      return;
    }

    message.textContent = '';
    message.classList.remove('form-search__error--show');
  } 

  static checkField(event) {

    const target = event.target;

    if (!target) {
      return;
    }

    let error = Validate.hasError(target);

    if (error) {
      Validate.showError(target, error);
      return;
    }

    if(!error){
      Validate.removeError(target);
      return;
    }
    
    Validate.removeError(target);
  }

  addEventListener(...args) {
    this._formElement.addEventListener(...args);
  }

}