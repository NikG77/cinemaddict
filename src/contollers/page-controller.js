import {isEscEvent} from "../utils/common";
import {render, remove, append, RenderPosition} from "../utils/render";
import {generateFilters} from "../mock/filter";
import FilmCardComponent from "../components/film-card";

import ShowMoreButtonComponent from "../components/show-more-button";
import TopRatedComponent from "../components/top-rated";
import MostCommentedComponent from "../components/most-commented";
import FilmDetailsComponent from "../components/film-details";

import NavigationComponent from "../components/navigation";
import SortComponent from "../components/sort";
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
  render(container, new TopRatedComponent(), RenderPosition.BEFOREEND);
  render(container, new MostCommentedComponent(), RenderPosition.BEFOREEND);

  const filmsListElement = container.querySelector(`.films-list`);
  const filmListContainerElements = container.querySelectorAll(`.films-list__container`);

  renderFilms(filmListContainerElements[FILMS_LIST_CONTAINER.FILM], films, COUNT.FILM_SHOW);

  const showMoreButtonComponent = new ShowMoreButtonComponent();
  render(filmsListElement, showMoreButtonComponent, RenderPosition.BEFOREEND);

  renderFilms(filmListContainerElements[FILMS_LIST_CONTAINER.TOP_RATED], films, COUNT.TOP_RATED);
  renderFilms(filmListContainerElements[FILMS_LIST_CONTAINER.MOST_COMMENTED], films, COUNT.MOST_COMMENTED);

  let showingFilmCount = COUNT.FILM_SHOW;

  showMoreButtonComponent.setClickHandler(() => {
    const prevFilmCount = showingFilmCount;
    showingFilmCount = prevFilmCount + COUNT.FILM_SHOW;

    renderFilms(filmListContainerElements[FILMS_LIST_CONTAINER.FILM], films, showingFilmCount, prevFilmCount);

    if (showingFilmCount >= films.length) {
      remove(showMoreButtonComponent);
    }
  });
};

export default class PageController {
  constructor(container) {
    this._container = container;
  }

  render(films) {
    let filters = generateFilters(films);

    const navigationElement = new NavigationComponent(filters);
    render(this._container, navigationElement, RenderPosition.BEFOREEND);
    render(this._container, new SortComponent(), RenderPosition.BEFOREEND);

    if (films.length === 0) {
      render(this._container, new NoFilmsComponent(), RenderPosition.BEFOREEND);
    } else {
      const filmsComponent = new FilmsComponent();

      render(this._container, filmsComponent, RenderPosition.BEFOREEND);

      const filmsElement = filmsComponent.getElement();
      showFilms(filmsElement, films);
    }
  }

}
