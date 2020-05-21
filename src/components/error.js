import AbstractComponent from "./abstract-component";


const createErrorTemplate = (errorMessage) => {
  return (
    `<div style="margin: 0px auto; text-align: center; background-color: red; position: absolute; left: 50px; right: 50px; font-size: 30px;">
    ${errorMessage}</div>`
  );
};

export default class Error extends AbstractComponent {
  constructor(errorMessage) {
    super();
    this._errorMessage = errorMessage;
  }

  getTemplate() {
    return createErrorTemplate(this._errorMessage);
  }

}
