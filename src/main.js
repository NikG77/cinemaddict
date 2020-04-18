import {generateFilms} from "./mock/films";
import {generateFilters} from "./mock/filter";
import {render, RenderPosition} from "./utils/render";
import PageController from "./contollers/page-controller";

import ProfileComponent from "./components/profile";
import NavigationComponent from "./components/navigation";
import SortComponent from "./components/sort";
import FilmsComponent from "./components/films";
import FooterComponent from "./components/footer";
import NoFilmsComponent from "./components/no-films";

const COUNT_FILMS = 20;

const films = generateFilms(COUNT_FILMS);
let filters = generateFilters(films);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new ProfileComponent(films), RenderPosition.BEFOREEND);

const navigationElement = new NavigationComponent(filters);
render(siteMainElement, navigationElement, RenderPosition.BEFOREEND);
render(siteMainElement, new SortComponent(), RenderPosition.BEFOREEND);

if (films.length === 0) {
  render(siteMainElement, new NoFilmsComponent(), RenderPosition.BEFOREEND);
} else {
  const filmsComponent = new FilmsComponent();
  render(siteMainElement, filmsComponent, RenderPosition.BEFOREEND);

  const filmsElement = filmsComponent.getElement();
  const pageController = new PageController(filmsElement);
  pageController.render(films);
}

const footerElement = document.querySelector(`.footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

render(footerStatisticsElement, new FooterComponent(films.length), RenderPosition.BEFOREEND);

