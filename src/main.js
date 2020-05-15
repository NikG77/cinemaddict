import API from "./api.js";
import FilmsComponent from "./components/films";
import FilmsModel from "./models/movies";
import FilterController from "./contollers/filter-controller";
import FooterComponent from "./components/footer";
import Navigation from "./components/navigation";
import PageController from "./contollers/page-controller";
import ProfileComponent from "./components/profile";
import SortController from "./contollers/sort";
import StatisticsComponent from "./components/statistics";
// import {generateFilms} from "./mock/films";
import {MenuItem} from "./const";
import {render, RenderPosition} from "./utils/render";

const AUTHORIZATION = `Basic gitDGfhjk$d29yZAo=`;


// const COUNT_FILMS = 17;

// const films = generateFilms(COUNT_FILMS);

const api = new API(AUTHORIZATION);
const filmsModel = new FilmsModel();
// filmsModel.setFilms(films);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const profileComponent = new ProfileComponent(films);
render(siteHeaderElement, profileComponent, RenderPosition.BEFOREEND);

const navigationComponent = new Navigation();
render(siteMainElement, navigationComponent, RenderPosition.BEFOREEND);

const siteNavigationElements = siteMainElement.querySelector(`nav`);
const filterController = new FilterController(siteNavigationElements, filmsModel);
filterController.render();

const sortController = new SortController(siteMainElement, filmsModel);
sortController.render();

const filmsComponent = new FilmsComponent();
render(siteMainElement, filmsComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(filmsComponent, filmsModel);
// pageController.render();

const statisticsComponent = new StatisticsComponent(filmsModel, profileComponent.getRating());
render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
statisticsComponent.hide();

render(footerStatisticsElement, new FooterComponent(films.length), RenderPosition.BEFOREEND);

navigationComponent.setNavigationChangeHandler((menuItem) => {
  switch (menuItem) {
    case MenuItem.STATISTICS:
      pageController.hide();
      sortController.hide();
      statisticsComponent.show();
      break;
    case MenuItem.FILMS:
      statisticsComponent.hide();
      pageController.reset();
      sortController.reset();
      sortController.show();
      pageController.show();
      break;
  }

});

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
    pageController.render();
  });

