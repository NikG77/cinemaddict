import {generateFilms} from "./mock/films";
import {generateFilters} from "./mock/filter";
import {isEscEvent} from "./utils/utils";
import {render, RenderPosition} from "./utils/render";

import ProfileComponent from "./components/profile";
import NavigationComponent from "./components/navigation";
import SortComponent from "./components/sort";
import FilmsComponent from "./components/films";
import FilmCardComponent from "./components/film-card";
import FooterComponent from "./components/footer";
import NoFilmsComponent from "./components/no-films";
import ShowMoreButtonComponent from "./components/show-more-button";
import TopRatedComponent from "./components/top-rated";
import MostCommentedComponent from "./components/most-commented";
import FilmDetailsComponent from "./components/film-details";

const COUNT = {
  ALL_FILM: 6,
  FILM_SHOW: 5,
  TOP_RATED: 2,
  MOST_COMMENTED: 2,
};

const FILMS_LIST_CONTAINER = {
  FILM: 0,
  TOP_RATED: 1,
  MOST_COMMENTED: 2,
};


const films = generateFilms(COUNT.ALL_FILM);
let filters = generateFilters(films);


const renderFilm = (container, film) => {
  const closePopup = () => {
    container.removeChild(filmDetailsComponent.getElement());
    document.removeEventListener(`keydown`, onPopupCloseEscPress);
  };

  const onPopupCloseEscPress = (evt) => isEscEvent(evt, closePopup);

  const onPopupOpenClick = (evt) => {
    const target = evt.target;

    if (target && target.className === `film-card__title` || target.className === `film-card__poster` || target.className === `film-card__comments`) {
      container.appendChild(filmDetailsComponent.getElement());

      document.addEventListener(`keydown`, onPopupCloseEscPress);
      const filmDetailsPopupClose = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);
      filmDetailsPopupClose.addEventListener(`click`, () => closePopup());
    }
  };

  const filmCardComponent = new FilmCardComponent(film);
  const filmDetailsComponent = new FilmDetailsComponent(film);
  const filmCardElement = filmCardComponent.getElement();

  filmCardElement.addEventListener(`click`, onPopupOpenClick);

  render(container, filmCardComponent, RenderPosition.BEFOREEND);

  const filmCardControlAddWatchlist = filmCardElement.querySelector(`.film-card__controls-item--add-to-watchlist`);
  const historyCountElement = navigationElement.getElement()
    .querySelector(`a[href="#history"]`)
    .querySelector(`span`);
  filmCardControlAddWatchlist.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    // Добавить проверку на true, чтоб избежать ненужных действий
    film[`user_details`][`already_watched`] = true;

    filters = generateFilters(films);

    historyCountElement.textContent = filters[2][`count`];

  });


};


const renderFilms = (container, filmCount, startElement = 0) => {
  films.slice(startElement, filmCount).forEach((film) => renderFilm(container, film));
};


const showFilms = () => {
  render(siteMainElement, new FilmsComponent(), RenderPosition.BEFOREEND);

  const filmsElement = siteMainElement.querySelector(`.films`);

  render(filmsElement, new TopRatedComponent(), RenderPosition.BEFOREEND);
  render(filmsElement, new MostCommentedComponent(), RenderPosition.BEFOREEND);

  const filmsListElement = filmsElement.querySelector(`.films-list`);
  const filmListContainerElements = filmsElement.querySelectorAll(`.films-list__container`);

  renderFilms(filmListContainerElements[FILMS_LIST_CONTAINER.FILM], COUNT.FILM_SHOW);
  render(filmsListElement, new ShowMoreButtonComponent(), RenderPosition.BEFOREEND);

  renderFilms(filmListContainerElements[FILMS_LIST_CONTAINER.TOP_RATED], COUNT.TOP_RATED);
  renderFilms(filmListContainerElements[FILMS_LIST_CONTAINER.MOST_COMMENTED], COUNT.MOST_COMMENTED);

  const showMoreButton = filmsElement.querySelector(`.films-list__show-more`);
  let showingFilmcount = COUNT.FILM_SHOW;

  showMoreButton.addEventListener(`click`, () => {
    const prevFilmCount = showingFilmcount;
    showingFilmcount = prevFilmCount + COUNT.FILM_SHOW;

    renderFilms(filmListContainerElements[FILMS_LIST_CONTAINER.FILM], showingFilmcount, prevFilmCount);

    if (showingFilmcount >= films.length) {
      showMoreButton.remove();
    }
  });
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new ProfileComponent(films), RenderPosition.BEFOREEND);

let navigationElement = new NavigationComponent(filters);
render(siteMainElement, navigationElement, RenderPosition.BEFOREEND);
render(siteMainElement, new SortComponent(), RenderPosition.BEFOREEND);

if (films.length === 0) {
  render(siteMainElement, new NoFilmsComponent(), RenderPosition.BEFOREEND);
} else {
  showFilms();
}

const footerElement = document.querySelector(`.footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

render(footerStatisticsElement, new FooterComponent(films.length), RenderPosition.BEFOREEND);
