import {generateFilms} from "./mock/films";
import {generateFilters} from "./mock/filter";
import {isEscEvent} from "./utils";

import {createProfileTemplate} from "./components/profile.js";
import {createNavigationTemplate} from "./components/navigation.js";
import {createSortingTemplate} from "./components/sorting.js";
import {createFilmsTemplate} from "./components/films.js";
import {createFilmCardTemplate} from "./components/film-card.js";
import {createShowMoreButtonTemplate} from "./components/show-more-button.js";
import {createTopRatedTemplate} from "./components/top-rated.js";
import {createMostCommentedTemplate} from "./components/most-commented.js";

// Разметка попапа, из-за неиспользуемости переменной временно закомментировал код
import {createFilmDetailsTemplate} from "./components/film-details.js";

const COUNT = {
  FILM: 5,
  TOP_RATED: 2,
  MOST_COMMENTED: 2,
};

const FILMS_LIST_CONTAINER = {
  FILM: 0,
  TOP_RATED: 1,
  MOST_COMMENTED: 2,
};

const films = generateFilms(3);
const filters = generateFilters();

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

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


renderFilms(filmListContainerElements[FILMS_LIST_CONTAINER.FILM], COUNT.FILM);
render(filmListContainerElements[FILMS_LIST_CONTAINER.FILM], createShowMoreButtonTemplate(), `afterend`);

renderFilms(filmListContainerElements[FILMS_LIST_CONTAINER.TOP_RATED], COUNT.TOP_RATED);
renderFilms(filmListContainerElements[FILMS_LIST_CONTAINER.MOST_COMMENTED], COUNT.MOST_COMMENTED);

const footerElement = document.querySelector(`.footer`);

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


// console.log(films[2].id);
// films.forEach((item) => console.log(item.film_info.release.date));

