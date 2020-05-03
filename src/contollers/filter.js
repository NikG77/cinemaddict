import FilterComponent from "../components/navigation";
import {FilterType, FilterTypeOutput} from "../const.js";
import {render, replace, RenderPosition} from "../utils/render.js";
import {getFilmsByFilter} from "../utils/filter.js";

export default class FilterController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._filmsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const allFilms = this._filmsModel.getFilmsAll();
    const filters = Object.values(FilterTypeOutput).map((filterType) => {
      return {
        name: filterType,
        count: getFilmsByFilter(allFilms, filterType).length,
        isActive: filterType.toLowerCase().split(` `, 1).join() === this._activeFilterType,
      };
    });
    // console.log(`Получили фильтр`, filters);

    const oldComponent = this._filterComponent;

    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, RenderPosition.BEFOREEND);
    }
  }

  _onFilterChange(filterType) {
    if (this._activeFilterType !== filterType) {
      this._filmsModel.setFilter(filterType);
      this._activeFilterType = filterType;
      this._onDataChange();
    }
  }

  _onDataChange() {
    this.render();
  }
}
