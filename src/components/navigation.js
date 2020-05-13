import AbstractComponent from "./abstract-component";
import {MenuItem} from "../const";

const createNavigationTemplate = () => {


  return (
    `<nav class="main-navigation">

      <a href="#stats" data-navigation="${MenuItem.STATISTICS}" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Navigation extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createNavigationTemplate();
  }


  setNavigationChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target && evt.target.tagName !== `A`) {
        return;
      }
      const navigationName = evt.target.dataset.navigation;
      handler(navigationName);
    });
  }

}
