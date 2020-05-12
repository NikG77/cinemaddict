import {generateFilms} from "./mock/films";
import {render, RenderPosition} from "./utils/render";

import PageController from "./contollers/page-controller";
import ProfileComponent from "./components/profile";
import FooterComponent from "./components/footer";
import FilmsModel from "./models/movies";
import FilterController from "./contollers/filter-controller";
import StatisticsComponent from "./components/statistics";
import FilmsComponent from "./components/films";

const COUNT_FILMS = 7;

const films = generateFilms(COUNT_FILMS);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new ProfileComponent(films), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector(`.main`);

const filterController = new FilterController(siteMainElement, filmsModel);
filterController.render();

const filmsComponent = new FilmsComponent();
render(siteMainElement, filmsComponent, RenderPosition.BEFOREEND);


const pageController = new PageController(filmsComponent, filmsModel);
pageController.render();
pageController.hide();


const statisticsComponent = new StatisticsComponent({films: filmsModel});
render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);


const footerElement = document.querySelector(`.footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);
render(footerStatisticsElement, new FooterComponent(films.length), RenderPosition.BEFOREEND);

