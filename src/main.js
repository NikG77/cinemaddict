import {generateFilms} from "./mock/films";
import {render, RenderPosition} from "./utils/render";

import PageController from "./contollers/page-controller";
import ProfileComponent from "./components/profile";
import FooterComponent from "./components/footer";
import FilmsModel from "./models/movies";
import FilterController from "./contollers/filter-controller";
import SortController from "./contollers/sort";
import StatisticsComponent from "./components/statistics";
import FilmsComponent from "./components/films";
import Navigation from "./components/navigation";
import {MenuItem} from "./const";


const COUNT_FILMS = 17;

const films = generateFilms(COUNT_FILMS);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const siteHeaderElement = document.querySelector(`.header`);
const profileComponent = new ProfileComponent(films);
render(siteHeaderElement, profileComponent, RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector(`.main`);

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
pageController.render();
pageController.hide();


const statisticsComponent = new StatisticsComponent(filmsModel, profileComponent.getRating());
render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
// statisticsComponent.hide();


const footerElement = document.querySelector(`.footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);
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

