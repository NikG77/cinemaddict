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

import {MenuItem} from "./const";
import {render, RenderPosition} from "./utils/render";

const AUTHORIZATION = `Basic gitDGfhjk$d29yZAo=`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

const api = new API(END_POINT, AUTHORIZATION);
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
sortController.render();


const filmsComponent = new FilmsComponent();


const pageController = new PageController(filmsComponent, filmsModel, api);
const statisticsComponent = new StatisticsComponent(filmsModel, profileComponent.getRating());


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
    console.log(`с сервера нач загрузка для простоты первый фильма`, films[0]);


    render(footerStatisticsElement, new FooterComponent(films.length), RenderPosition.BEFOREEND);
    render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
    render(siteMainElement, filmsComponent, RenderPosition.BEFOREEND);

    filterController.render();
    pageController.render();
    statisticsComponent.hide();

  });

