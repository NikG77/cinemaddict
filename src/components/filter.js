import AbstractComponent from "./abstract-component";
import {MenuItem} from "../const";

const createFilterMarkup = (filter, isMain) => {
  const {name, count, isActive} = filter;

  return (
    `<a href="#${name.toLowerCase().split(` `, 1)}" data-filter="${name.toLowerCase().split(` `, 1)}" data-navigation="${MenuItem.FILMS}" class="main-navigation__item
    ${isActive ? `main-navigation__item--active` : ``}">
    ${name} ${isMain ? `` : `<span class="main-navigation__item-count">${count}</span>`}</a>`
  );
};

const createNavigationTemplate = (filters) => {
  const filtersMarkup = filters.map((filter, i) => createFilterMarkup(filter, i === 0)).join(`\n`);
  return (
    `<div class="main-navigation__items" data-navigation="filters">
      ${filtersMarkup}
    </div>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createNavigationTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const filterName = evt.target.dataset.filter;
      handler(filterName);
    });
  }

}
