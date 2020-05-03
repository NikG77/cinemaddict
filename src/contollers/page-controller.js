import {render, remove, RenderPosition} from "../utils/render";
// import {generateFilters} from "../mock/filter";

import ShowMoreButtonComponent from "../components/show-more-button";
import TopRatedComponent from "../components/top-rated";
import MostCommentedComponent from "../components/most-commented";
import FilterController from "../contollers/filter";
// import NavigationComponent from "../components/navigation";
import SortComponent, {SortType} from "../components/sort";
import FilmsComponent from "../components/films";
import NoFilmsComponent from "../components/no-films";
import MovieController from "./moviecontoller";

const COUNT = {
  FILM_SHOW: 5,
  TOP_RATED: 2,
  MOST_COMMENTED: 2,
};

const FILMS_LIST_CONTAINER = {
  FILM: 0,
  TOP_RATED: 1,
  MOST_COMMENTED: 2,
};


const renderFilms = (container, films, onDataChange, onViewChange) => {
  return films.map((film) => {
    const movieController = new MovieController(container, onDataChange, onViewChange);

    movieController.render(film);
    return movieController;
  });
};

// const showFilms = (container, films, onDataChange) => {
//   renderFilms(container[FILMS_LIST_CONTAINER.FILM], films.slice(0, COUNT.FILM_SHOW), onDataChange);
//   renderFilms(container[FILMS_LIST_CONTAINER.TOP_RATED], films.slice(0, COUNT.TOP_RATED), onDataChange);
//   renderFilms(container[FILMS_LIST_CONTAINER.MOST_COMMENTED], films.slice(0, COUNT.MOST_COMMENTED), onDataChange);
// };

const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.RATING_DOWN:
      sortedFilms = showingFilms.sort((a, b) => b.film_info.total_rating - a.film_info.total_rating);
      break;
    case SortType.DATE_DOWN:
      sortedFilms = showingFilms.sort((a, b) => b.film_info.release.date - a.film_info.release.date);
      break;
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
  }

  return sortedFilms.slice(from, to);
};


export default class PageController {
  constructor(container, filmsModel, commentsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;

    this._showedFilmControllers = [];

    this._showedAllFilmControllers = [];
    this._showedRaringFilmControllers = [];

    this._showingFilmCount = COUNT.FILM_SHOW;

    this._sortComponent = new SortComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._filmsComponent = new FilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const films = this._filmsModel.getFilms();
    this._currentFilms = films.slice();

    const filterController = new FilterController(this._container, this._filmsModel);
    filterController.render();

    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);

    if (films.length === 0) {
      render(this._container, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(this._container, this._filmsComponent, RenderPosition.BEFOREEND);

    const filmsElement = this._filmsComponent.getElement();
    render(filmsElement, new TopRatedComponent(), RenderPosition.BEFOREEND);
    render(filmsElement, new MostCommentedComponent(), RenderPosition.BEFOREEND);

    this._filmsListElement = filmsElement.querySelector(`.films-list`);
    this._filmListContainerElements = filmsElement.querySelectorAll(`.films-list__container`);

    let newFilms = renderFilms(this._filmListContainerElements[FILMS_LIST_CONTAINER.TOP_RATED], this._searchTopRatedFilms(this._currentFilms), this._onDataChange, this._onViewChange);
    this._showedRaringFilmControllers = this._showedRaringFilmControllers.concat(newFilms);

    newFilms = renderFilms(this._filmListContainerElements[FILMS_LIST_CONTAINER.MOST_COMMENTED], this._searchMostCommentedFilms(this._currentFilms), this._onDataChange, this._onViewChange);
    this._showedRaringFilmControllers = this._showedRaringFilmControllers.concat(newFilms);

    this._renderFilms(films.slice(0, COUNT.FILM_SHOW));

    this._renderShowMoreButton();
  }

  _renderFilms(films) {
    const newFilms = renderFilms(this._filmListContainerElements[FILMS_LIST_CONTAINER.FILM], films, this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    this._showedAllFilmControllers = this._showedRaringFilmControllers.concat(this._showedFilmControllers);
  }

  _removeFilms() {
    this._showedFilmControllers.forEach((filmController) => filmController.destroy());
    this._showedFilmControllers = [];
  }

  _renderShowMoreButton() {
    remove(this._showMoreButtonComponent);

    if (this._showingFilmCount >= this._filmsModel.getFilms().length) {
      return;
    }
    render(this._filmsListElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonClick);
  }

  _onShowMoreButtonClick() {
    const prevFilmCount = this._showingFilmCount;
    this._showingFilmCount = prevFilmCount + COUNT.FILM_SHOW;
    const films = this._filmsModel.getFilms();

    const sortedFilms = getSortedFilms(films, this._sortComponent.getSortType(), prevFilmCount, this._showingFilmCount);

    this._renderFilms(sortedFilms);

    if (this._showingFilmCount >= this._filmsModel.getFilms().length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _updateFilms(count) {
    this._removeFilms();
    this._renderFilms(this._filmsModel.getFilms().slice(0, count));
    this._renderShowMoreButton();
  }

  _onDataChange(movieController, oldData, newData) {

    const isSuccess = this._filmsModel.updateFilm(oldData.id, newData);
    if (isSuccess) {
      movieController.render(newData);
    }
  }

  _onViewChange() {
    this._showedAllFilmControllers.forEach((it) => it.setDefaultView());
  }


  _onSortTypeChange(sortType) {
    // Если нужна реализация c дефолтым кол-вом карточек после сортировки
    // то надо разкомментировать следующую строку
    this._showingFilmCount = COUNT.FILM_SHOW;
    const films = this._filmsModel.getFilms();
    const sortedFilms = getSortedFilms(films, sortType, 0, films.length);

    this._filmListContainerElements[FILMS_LIST_CONTAINER.FILM].innerHTML = ``;

    const newFilms = renderFilms(this._filmListContainerElements[FILMS_LIST_CONTAINER.FILM], sortedFilms.slice(0, this._showingFilmCount), this._onDataChange, this._onViewChange);
    // Добавляются отсортиированные контроллеры повторно - подумать может такие не добавлять или обнулять за исключением двух лучших полей
    this._showedFilmControllers = [];
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    this._showedAllFilmControllers = this._showedRaringFilmControllers.concat(this._showedFilmControllers);

    this._renderShowMoreButton();
  }

  _onFilterChange() {
    this._updateFilms(this._showingFilmCount);
  }


  _searchTopRatedFilms(films) {
    const topRatedFilms = films.slice();
    return topRatedFilms.sort(function (a, b) {
      return b.film_info.total_rating - a.film_info.total_rating;
    }).slice(0, COUNT.TOP_RATED);
  }

  _searchMostCommentedFilms(films) {
    const mostCommentedFilms = films.slice();
    return mostCommentedFilms.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    }).slice(0, COUNT.MOST_COMMENTED);
  }

}
