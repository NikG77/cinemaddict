
import SortComponent, {SortType} from "../components/sort";
// import {FilterType, FilterTypeOutput} from "../const.js";
import {render, replace, RenderPosition} from "../utils/render.js";


export default class SortController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._activeFilterType = SortType.DEFAULT;
    this._sortComponent = null;

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);

    this._filmsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    this._activeSortType = this._filmsModel.getSortType();

    const container = this._container;
    const oldComponent = this._sortComponent;
    this._sortComponent = new SortComponent(this._activeSortType);

    if (oldComponent) {
      replace(this._sortComponent, oldComponent);
    } else {
      render(container, this._sortComponent, RenderPosition.BEFOREEND);
    }
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  hide() {
    this._sortComponent.hide();
  }

  show() {
    this._sortComponent.show();
  }

  reset() {
    this._activeSortType = SortType.DEFAULT;
    this._onSortTypeChange(this._activeSortType);
  }

  _onSortTypeChange(sortType) {
    this._activeSortType = sortType;
    this._filmsModel.setSortType(sortType);
    this._onDataChange();
  }

  _onDataChange() {
    this.render();
  }
}
