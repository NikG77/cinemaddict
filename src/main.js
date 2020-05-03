import {generateFilms, comments} from "./mock/films";
import {render, RenderPosition} from "./utils/render";

import PageController from "./contollers/page-controller";
import ProfileComponent from "./components/profile";
import FooterComponent from "./components/footer";
import FilmsModel from "./models/movies";
import CommentsModel from "./models/comments";


const COUNT_FILMS = 12;

const films = generateFilms(COUNT_FILMS);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const commentsModel = new CommentsModel();
commentsModel.setComments(comments);

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new ProfileComponent(films), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector(`.main`);
const pageController = new PageController(siteMainElement, filmsModel, commentsModel);
pageController.render(films);

const footerElement = document.querySelector(`.footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);
render(footerStatisticsElement, new FooterComponent(films.length), RenderPosition.BEFOREEND);

