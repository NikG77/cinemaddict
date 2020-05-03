import AbstractComponent from "./abstract-component";

export const SortType = {
  DEFAULT: `default`,
  DATE_DOWN: `date`,
  RATING_DOWN: `rating`,
};

const createSortMarkup = (sortType, isActive) => {
  return (
    `<li>
      <a href="#" data-sort-type="${sortType}"
      class="sort__button ${isActive ? `sort__button--active` : ``}">Sort by ${sortType}</a>
    </li>`
  );
};

const createSortTemplate = (currentSortType) => {
  const sortMarkup = Object.values(SortType).map((sortType) => createSortMarkup(sortType, sortType === currentSortType)).join(`\n`);

  return (
    `<ul class="sort">
        ${sortMarkup}
    </ul>`
  );
};
export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortTemplate(this._currentSortType);
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;

      handler(this._currentSortType);
    });
  }
}
