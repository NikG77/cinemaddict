import {isEscEvent} from "../utils/common";
import {render, remove, append, RenderPosition} from "../utils/render";
import {generateFilters} from "../mock/filter";
import FilmCardComponent from "../components/film-card";

import ShowMoreButtonComponent from "../components/show-more-button";
import TopRatedComponent from "../components/top-rated";
import MostCommentedComponent from "../components/most-commented";
import FilmDetailsComponent from "../components/film-details";

import NavigationComponent from "../components/navigation";
import SortComponent, {SortType} from "../components/sort";
import FilmsComponent from "../components/films";
import NoFilmsComponent from "../components/no-films";

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
  const closePopup = () => {

    remove(filmDetailsComponent);
    document.removeEventListener(`keydown`, onPopupCloseEscPress);
  };

  const onPopupCloseEscPress = (evt) => isEscEvent(evt, closePopup);

  const onPopupOpenClick = (evt) => {
    const target = evt.target;

    if (target && target.className === `film-card__title` || target.className === `film-card__poster` || target.className === `film-card__comments`) {
      append(container, filmDetailsComponent);

      document.addEventListener(`keydown`, onPopupCloseEscPress);

      filmDetailsComponent.setPopupCloseClickHandler(closePopup);
    }
  };

  const filmCardComponent = new FilmCardComponent(film);
  const filmDetailsComponent = new FilmDetailsComponent(film);

  filmCardComponent.setClickHandler(onPopupOpenClick);
  render(container, filmCardComponent, RenderPosition.BEFOREEND);

  // // Подумать как повесить один обработчик на три условия карточки и где
  // const filmCardElement = filmCardComponent.getElement();
  // const filmCardControlAddWatchlist = filmCardElement.querySelector(`.film-card__controls-item--add-to-watchlist`);
  // let navigationElement = new NavigationComponent(filters);
  // const historyCountElement = navigationElement.getElement()
  //   .querySelector(`a[href="#history"]`)
  //   .querySelector(`span`);
  // filmCardControlAddWatchlist.addEventListener(`click`, (evt) => {
  //   evt.preventDefault();
  //   // Добавить проверку на true, чтоб избежать ненужных действий
  //   film[`user_details`][`already_watched`] = true;

  //   filters = generateFilters(films);

  //   historyCountElement.textContent = filters[2][`count`];

  // });

};


const renderFilms = (container, movielist, filmCount, startElement = 0) => {
  movielist.slice(startElement, filmCount).forEach((film) => renderFilm(container, film));
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

  }

  render(films) {
    const renderShowMoreButton = () => {
      if (showingFilmCount >= films.length) {
        return;
      }

      remove(this._showMoreButtonComponent);
      
      render(filmsListElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
      this._showMoreButtonComponent.setClickHandler(() => {
        const prevFilmCount = showingFilmCount;
        showingFilmCount = prevFilmCount + COUNT.FILM_SHOW;

        renderFilms(filmListContainerElements[FILMS_LIST_CONTAINER.FILM], currentFilms, showingFilmCount, prevFilmCount);

        if (showingFilmCount >= films.length) {
          remove(this._showMoreButtonComponent);
        }
      });
    };

    let filters = generateFilters(films);
    let currentFilms = films.slice();

    const navigationElement = new NavigationComponent(filters);
    render(this._container, navigationElement, RenderPosition.BEFOREEND);
    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);

    if (films.length === 0) {
      render(this._container, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(this._container, this._filmsComponent, RenderPosition.BEFOREEND);

    const filmsElement = this._filmsComponent.getElement();
    render(filmsElement, new TopRatedComponent(), RenderPosition.BEFOREEND);
    render(filmsElement, new MostCommentedComponent(), RenderPosition.BEFOREEND);

    const filmsListElement = filmsElement.querySelector(`.films-list`);
    const filmListContainerElements = filmsElement.querySelectorAll(`.films-list__container`);

    showFilms(filmListContainerElements, films);

    let showingFilmCount = COUNT.FILM_SHOW;
    renderShowMoreButton();



    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      // showingFilmCount = COUNT.FILM_SHOW;
      currentFilms = getSortedFilms(films, sortType, 0, films.length);

      filmListContainerElements[FILMS_LIST_CONTAINER.FILM].innerHTML = ``;

      renderFilms(filmListContainerElements[FILMS_LIST_CONTAINER.FILM], currentFilms, showingFilmCount);

      renderShowMoreButton();
    });
  }

}
