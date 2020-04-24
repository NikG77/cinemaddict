import {render, remove, RenderPosition} from "../utils/render";
import {generateFilters} from "../mock/filter";

import ShowMoreButtonComponent from "../components/show-more-button";
import TopRatedComponent from "../components/top-rated";
import MostCommentedComponent from "../components/most-commented";

import NavigationComponent from "../components/navigation";
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


const renderFilms = (container, films, onDataChange) => {
  return films.map((film) => {
    const movieController = new MovieController(container, onDataChange);

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
  constructor(container) {
    this._container = container;

    this._films = [];
    this._showedFilmControllers = [];

    this._showingFilmCount = COUNT.FILM_SHOW;

    this._sortComponent = new SortComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._filmsComponent = new FilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);

  }

  render(films) {
    this._films = films;

    let filters = generateFilters(this._films);
    this._currentFilms = this._films.slice();

    const navigationElement = new NavigationComponent(filters);
    render(this._container, navigationElement, RenderPosition.BEFOREEND);
    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);

    if (this._films.length === 0) {
      render(this._container, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(this._container, this._filmsComponent, RenderPosition.BEFOREEND);

    const filmsElement = this._filmsComponent.getElement();
    render(filmsElement, new TopRatedComponent(), RenderPosition.BEFOREEND);
    render(filmsElement, new MostCommentedComponent(), RenderPosition.BEFOREEND);

    this._filmsListElement = filmsElement.querySelector(`.films-list`);
    this._filmListContainerElements = filmsElement.querySelectorAll(`.films-list__container`);

    // const newFilms = showFilms(this._filmListContainerElements, this._films, this._onDataChange);
    let newFilms = renderFilms(this._filmListContainerElements[FILMS_LIST_CONTAINER.FILM], films.slice(0, COUNT.FILM_SHOW), this._onDataChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    newFilms = renderFilms(this._filmListContainerElements[FILMS_LIST_CONTAINER.TOP_RATED], films.slice(0, COUNT.TOP_RATED), this._onDataChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    newFilms = renderFilms(this._filmListContainerElements[FILMS_LIST_CONTAINER.MOST_COMMENTED], films.slice(0, COUNT.MOST_COMMENTED), this._onDataChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    this._renderShowMoreButton();

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevFilmCount = this._showingFilmCount;
      this._showingFilmCount = prevFilmCount + COUNT.FILM_SHOW;
      newFilms = renderFilms(this._filmListContainerElements[FILMS_LIST_CONTAINER.FILM], this._currentFilms.slice(prevFilmCount, this._showingFilmCount), this._onDataChange);
      this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

      if (this._showingFilmCount >= this._films.length) {
        remove(this._showMoreButtonComponent);
      }
    });

  }

  _renderShowMoreButton() {
    if (this._showingFilmCount >= this._films.length) {
      return;
    }
    render(this._filmsListElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    movieController.render(this._films[index]);
  }


  _onSortTypeChange(sortType) {
    // Если нужна реализация c дефолтым кол-вом карточек после сортировки
    // то надо разкомментировать следующую строку
    // this._showingFilmCount = COUNT.FILM_SHOW;
    this._currentFilms = getSortedFilms(this._films, sortType, 0, this._films.length);

    this._filmListContainerElements[FILMS_LIST_CONTAINER.FILM].innerHTML = ``;

    const newFilms = renderFilms(this._filmListContainerElements[FILMS_LIST_CONTAINER.FILM], this._currentFilms.slice(0, this._showingFilmCount), this._onDataChange);
    // Добавляются отсортиированные контроллеры повторно - подумать может такие не добавлять или обнулять за исключением двух лучших полей
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    // console.log(`this._showedFilmControllers- `, this._showedFilmControllers);

    this._renderShowMoreButton();
  }

}
