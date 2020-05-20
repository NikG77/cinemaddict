import API from "./api/index";
import FilmsComponent from "./components/films";
import FilmsModel from "./models/movies";
import FilterController from "./contollers/filter-controller";
import FooterComponent from "./components/footer";
import Navigation from "./components/navigation";
import PageController from "./contollers/page-controller";
import Provider from "./api/provider";
import ProfileComponent from "./components/profile";
import SortController from "./contollers/sort";
import StatisticsComponent from "./components/statistics";
import LoadingFilmsComponent from "./components/loading-films";

import {MenuItem} from "./const";
import {render, RenderPosition} from "./utils/render";

const AUTHORIZATION = `Basic gitDGfhjk$d29yZAo=`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

const api = new API(END_POINT, AUTHORIZATION);
const apiWithProvider = new Provider(api);
const filmsModel = new FilmsModel();

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const profileComponent = new ProfileComponent(filmsModel);
render(siteHeaderElement, profileComponent, RenderPosition.BEFOREEND);

const navigationComponent = new Navigation();
render(siteMainElement, navigationComponent, RenderPosition.BEFOREEND);

const siteNavigationElements = siteMainElement.querySelector(`nav`);
const filterController = new FilterController(siteNavigationElements, filmsModel);


const sortController = new SortController(siteMainElement, filmsModel);
const loadingFilmsComponent = new LoadingFilmsComponent();

filterController.render();
sortController.render();


render(siteMainElement, loadingFilmsComponent, RenderPosition.BEFOREEND);


const filmsComponent = new FilmsComponent();
render(siteMainElement, filmsComponent, RenderPosition.BEFOREEND);
const footerComponent = new FooterComponent(filmsModel);
render(footerStatisticsElement, footerComponent, RenderPosition.BEFOREEND);


const pageController = new PageController(filmsComponent, filmsModel, apiWithProvider);
let statisticsComponent = new StatisticsComponent(filmsModel, profileComponent.getRating());

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

apiWithProvider.getFilms().then((films) => {
  loadingFilmsComponent.getElement().remove();
  filmsModel.setFilms(films);

  profileComponent.rerender();
  filterController.render();
  pageController.render();
  footerComponent.rerender();

  statisticsComponent = new StatisticsComponent(filmsModel, profileComponent.getRating());
  render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
  statisticsComponent.hide();

})
.catch(() => {
  loadingFilmsComponent.getElement().remove();
  pageController.render();

});

