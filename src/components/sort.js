import AbstractComponent from "./abstract-component";

export const SortType = {
  DEFAULT: `default`,
  DATE_DOWN: `date`,
  RATING_DOWN: `rating`,
};

const createSortMarkup = (sortType, isActive) => {
  const sortActive = isActive ? `sort__button--active` : ``;
  return (
    `<li>
      <a href="#" data-sort-type="${sortType}"
      class="sort__button ${sortActive}">Sort by ${sortType}</a>
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
  constructor(sortType) {
    super();

    this._currentSortType = sortType;
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
