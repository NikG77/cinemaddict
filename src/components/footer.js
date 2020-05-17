
import AbstractSmartComponent from "./abstract-smart-component";

const createFooterTemplate = (numberFilms) => {
  return (
    `<p>${numberFilms} movies inside</p>`
  );
};


export default class Footer extends AbstractSmartComponent {
  constructor(filmModel) {
    super();
    this._filmModel = filmModel;
  }

  getTemplate() {
    if (!this._filmModel) {
      this._filmModel = 0;
    }
    return createFooterTemplate(this._filmModel.getFilmsAll().length);
  }

  recoveryListeners() {
  }

  rerender() {
    super.rerender();
  }

}

