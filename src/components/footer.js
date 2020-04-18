import AbstractComponent from "./abstract-component";

const createFooterTemplate = (numberFilms) => {
  return (
    `<p>${numberFilms} movies inside</p>`
  );
};


export default class Footer extends AbstractComponent {
  constructor(numberFilms) {
    super();
    this._numberFilms = numberFilms;
  }

  getTemplate() {
    return createFooterTemplate(this._numberFilms);
  }
}

