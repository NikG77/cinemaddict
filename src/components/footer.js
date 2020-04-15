import {createElement} from "../utils.js";

const createFooterTemplate = (numberFilms) => {
  return (
    `<p>${numberFilms} movies inside</p>`
  );
};


export default class Footer {
  constructor(numberFilms) {
    this._numberFilms = numberFilms;
    this._element = null;
  }

  getTemplate() {
    return createFooterTemplate(this._numberFilms);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

