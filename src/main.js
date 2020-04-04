import {createProfileTemplate} from "./components/profile.js";
import {createNavigationTemplate} from "./components/navigation.js";
import {createSortingTemplate} from "./components/sorting.js";
import {createFilmsTemplate} from "./components/films.js";
import {createFilmCardTemplate} from "./components/film-card.js";
import {createShowMoreButtonTemplate} from "./components/show-more-button.js";
import {createTopRatedTemplate} from "./components/top-rated.js";
import {createMostCommentedTemplate} from "./components/most-commented.js";

// Разметка попапа, из-за неиспользуемости переменной временно закомментировал код
// import {createFilmDetailsTemplate} from "./components/film-details.js";

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

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const renderFilms = (container, template, filmCount) => {
  for (let i = 0; i < filmCount; i++) {
    render(container, template);
  }
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, createProfileTemplate());
render(siteMainElement, createNavigationTemplate());
render(siteMainElement, createSortingTemplate());
render(siteMainElement, createFilmsTemplate());

const filmsElement = siteMainElement.querySelector(`.films`);

render(filmsElement, createTopRatedTemplate());
render(filmsElement, createMostCommentedTemplate());

const filmListContainerElements = filmsElement.querySelectorAll(`.films-list__container`);

renderFilms(filmListContainerElements[FILMS_LIST_CONTAINER.FILM], createFilmCardTemplate(), COUNT.FILM);
render(filmListContainerElements[FILMS_LIST_CONTAINER.FILM], createShowMoreButtonTemplate(), `afterend`);

renderFilms(filmListContainerElements[FILMS_LIST_CONTAINER.TOP_RATED], createFilmCardTemplate(), COUNT.TOP_RATED);
renderFilms(filmListContainerElements[FILMS_LIST_CONTAINER.MOST_COMMENTED], createFilmCardTemplate(), COUNT.MOST_COMMENTED);
