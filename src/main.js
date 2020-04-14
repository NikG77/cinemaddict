import {generateFilms} from "./mock/films";
import {generateFilters} from "./mock/filter";
import {isEscEvent, render, RenderPosition} from "./utils";

import Profile from "./components/profile";
import Navigation from "./components/navigation";
import Sort from "./components/sorting";
import Films from "./components/films";
import FilmCard from "./components/film-card";
import Footer from "./components/footer";
import ShowMoreButton from "./components/show-more-button";
import TopRated from "./components/top-rated";
import MostCommented from "./components/most-commented";
import FilmDetails from "./components/film-details";

const COUNT = {
  ALL_FILM: 17,
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
const filters = generateFilters(films);

// const render = (container, template, place = `beforeend`) => {
//   container.insertAdjacentHTML(place, template);
// };

const renderFilms = (container, filmCount, startElement = 0) => {
  films.slice(startElement, filmCount).forEach((film) => render(container, createFilmCardTemplate(film)));
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, createProfileTemplate());
render(siteMainElement, createNavigationTemplate(filters));
render(siteMainElement, createSortingTemplate());
render(siteMainElement, createFilmsTemplate());

const filmsElement = siteMainElement.querySelector(`.films`);

render(filmsElement, createTopRatedTemplate());
render(filmsElement, createMostCommentedTemplate());

const filmListContainerElements = filmsElement.querySelectorAll(`.films-list__container`);

renderFilms(filmListContainerElements[FILMS_LIST_CONTAINER.FILM], COUNT.FILM_SHOW);
render(filmListContainerElements[FILMS_LIST_CONTAINER.FILM], createShowMoreButtonTemplate(), `afterend`);
renderFilms(filmListContainerElements[FILMS_LIST_CONTAINER.TOP_RATED], COUNT.TOP_RATED);
renderFilms(filmListContainerElements[FILMS_LIST_CONTAINER.MOST_COMMENTED], COUNT.MOST_COMMENTED);

const footerElement = document.querySelector(`.footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

render(footerStatisticsElement, createFooterTemplate(films.length));

const closePopup = () => {
  const filmDetails = document.querySelector(`.film-details`);
  document.querySelector(`body`).removeChild(filmDetails);
  document.removeEventListener(`keydown`, onPopupCloseEscPress);
};

const onPopupCloseEscPress = (evt) => isEscEvent(evt, closePopup);

const onPopupOpenClick = (evt) => {
  const target = evt.target;
  if (target && target.className === `film-card__title` || target.className === `film-card__poster` || target.className === `film-card__comments`) {
    const articleElement = target.closest(`article`);
    const idFilm = articleElement.dataset.index;

    render(footerElement, createFilmDetailsTemplate(films[idFilm]), `afterend`);

    document.addEventListener(`keydown`, onPopupCloseEscPress);
    const filmDetailsPopupClose = document.querySelector(`.film-details__close-btn`);
    filmDetailsPopupClose.addEventListener(`click`, () => closePopup());
  }
};

const filmCardElement = document.querySelectorAll(`.film-card`);

filmCardElement.forEach((card) => {
  card.addEventListener(`click`, onPopupOpenClick);
});

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

