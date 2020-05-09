import {generateFilms} from "./mock/films";
import {render, RenderPosition} from "./utils/render";

import PageController from "./contollers/page-controller";
import ProfileComponent from "./components/profile";
import FooterComponent from "./components/footer";
import FilmsModel from "./models/movies";

const COUNT_FILMS = 7;

const films = generateFilms(COUNT_FILMS);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new ProfileComponent(films), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector(`.main`);
const pageController = new PageController(siteMainElement, filmsModel);
pageController.render();

const footerElement = document.querySelector(`.footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);
render(footerStatisticsElement, new FooterComponent(films.length), RenderPosition.BEFOREEND);

