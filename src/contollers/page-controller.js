// import {isEscEvent} from "../utils/common";
import {render, remove, RenderPosition} from "../utils/render";
import {generateFilters} from "../mock/filter";
// import FilmCardComponent from "../components/film-card";

import ShowMoreButtonComponent from "../components/show-more-button";
import TopRatedComponent from "../components/top-rated";
import MostCommentedComponent from "../components/most-commented";
// import FilmDetailsComponent from "../components/film-details";

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

const renderFilm = (container, film) => {

  const movieController = new MovieController(container);
  movieController.render(film);

};


const renderFilms = (container, films, filmCount, startElement = 0) => {
  films.slice(startElement, filmCount).forEach((film) => renderFilm(container, film));
};


const showFilms = (container, films) => {
  renderFilms(container[FILMS_LIST_CONTAINER.FILM], films, COUNT.FILM_SHOW);
  renderFilms(container[FILMS_LIST_CONTAINER.TOP_RATED], films, COUNT.TOP_RATED);
  renderFilms(container[FILMS_LIST_CONTAINER.MOST_COMMENTED], films, COUNT.MOST_COMMENTED);
};

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

    this._sortComponent = new SortComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._filmsComponent = new FilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);

  }

  render(films) {
    this._films = films;

    const renderShowMoreButton = () => {

      if (this._showingFilmCount >= this._films.length) {
        return;
      }

      render(filmsListElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    };

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

    const filmsListElement = filmsElement.querySelector(`.films-list`);
    this._filmListContainerElements = filmsElement.querySelectorAll(`.films-list__container`);

    showFilms(this._filmListContainerElements, this._films);

    this._showingFilmCount = COUNT.FILM_SHOW;
    renderShowMoreButton();

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevFilmCount = this._showingFilmCount;
      this._showingFilmCount = prevFilmCount + COUNT.FILM_SHOW;
      renderFilms(this._filmListContainerElements[FILMS_LIST_CONTAINER.FILM], this._currentFilms, this._showingFilmCount, prevFilmCount);
      if (this._showingFilmCount >= this._films.length) {
        remove(this._showMoreButtonComponent);
      }
    });

  }


  _onSortTypeChange(sortType) {
    console.log(`this._films-`, this._films);


    // Если нужна реализация с дефолтным кол-вом карточек после сортировки
    // то надо разкомментировать следующую строку или наоборот
    this._showingFilmCount = COUNT.FILM_SHOW;
    this._currentFilms = getSortedFilms(this._films, sortType, 0, this._films.length);

    this._filmListContainerElements[FILMS_LIST_CONTAINER.FILM].innerHTML = ``;

    renderFilms(this._filmListContainerElements[FILMS_LIST_CONTAINER.FILM], this._currentFilms, this._showingFilmCount);
    // renderFilms(this._filmListContainerElements[FILMS_LIST_CONTAINER.FILM], this._currentFilms);


    this._renderShowMoreButton();
  }

}
