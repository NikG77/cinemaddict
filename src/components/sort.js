import AbstractComponent from "./abstract-component";

export const SortType = {
  DEFAULT: `default`,
  DATE_DOWN: `date-down`,
  RATING_DOWN: `rating-down`,
};

const createSortTemplate = (currenSortType) => {
  // const isSortActive = currenSortType === SortType ? `sort__button--active` : ``;
  return (
    `<ul class="sort">
      <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" data-sort-type="${SortType.DATE_DOWN}" class="sort__button">Sort by date</a></li>
      <li><a href="#" data-sort-type="${SortType.RATING_DOWN}" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};
export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currenSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortTemplate(this._currenSortType);
  }

  getSortType() {
    return this._currenSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      handler(this._currenSortType);
    });
  }
}
