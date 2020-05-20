import {render, remove, RenderPosition} from "../utils/render";
import ShowMoreButtonComponent from "../components/show-more-button";
import TopRatedComponent from "../components/top-rated";
import MostCommentedComponent from "../components/most-commented";
import {SortType} from "../components/sort";
import FilmsListComponent from "../components/films-list";
import NoFilmsComponent from "../components/no-films";
import FilmController from "./film-contoller";
import CommentsModel from "../models/comments";


const COUNT = {
  FILM_SHOW: 5,
  TOP_RATED: 2,
  MOST_COMMENTED: 2,
};

const FILMS_LIST_CONTAINER = {
  FILM: 0,
  TOP_RATED: 1,
  MOST_COMMENTED: 2,
};

const FILM_FIRST = 0;


const renderFilms = (container, films, onDataChange, onViewChange, onCommentChange, commentsModel, api, filmsModel) => {
  return films.map((film) => {
    const filmController = new FilmController(container, onDataChange, onViewChange, onCommentChange, commentsModel, api, filmsModel);
    filmController.render(film);
    return filmController;
  });
};

const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.RATING_DOWN:
      sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
      break;
    case SortType.DATE_DOWN:
      sortedFilms = showingFilms.sort((a, b) => b.releaseDate - a.releaseDate);
      break;
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
  }

  return sortedFilms.slice(from, to);
};


export default class PageController {
  constructor(container, filmsModel, api) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._api = api;

    this._commentsModel = null;

    this._showedFilmControllers = [];
    this._showedTopRatedFilmControllers = [];
    this._showedMostCommentedFilmControllers = [];

    this._showedRaringFilmControllers = [];

    this._showingFilmCount = COUNT.FILM_SHOW;

    this._noFilmsComponent = new NoFilmsComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);

    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
    this._filmsModel.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  hide() {
    this._container.hide();
  }

  show() {
    this._container.show();
  }

  reset() {
    this._showingFilmCount = COUNT.FILM_SHOW;
    this._updateFilms(this._showingFilmCount);
  }

  render() {
    const container = this._container.getElement();
    const films = this._filmsModel.getFilms();

    this._commentsModel = new CommentsModel();

    films.forEach((film) => {
      this._api.getComments(film.id)
        .then((comments) => {
          this._commentsModel.setComments(comments);
        })
        .catch(() => {


        });
    });

    if (films.length === 0) {
      render(container, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._filmsListComponent, RenderPosition.BEFOREEND);
    this._filmListContainerElements = container.querySelectorAll(`.films-list__container`);
    this._renderFilms(films.slice(0, COUNT.FILM_SHOW));
    this._renderShowMoreButton();

    this._renderTopRatedFilms(films);
    this._renderMostCommentedFilms(films);
  }

  _renderFilms(films) {
    const newFilms = renderFilms(this._filmListContainerElements[FILMS_LIST_CONTAINER.FILM], films, this._onDataChange, this._onViewChange, this._commentsModel, this._api, this._filmsModel);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
  }

  _renderTopRatedFilms(films) {
    const topRatedFilms = this._searchTopRatedFilms(films);
    const container = this._container.getElement();

    if (topRatedFilms === null) {
      return;
    }
    render(container, new TopRatedComponent(), RenderPosition.BEFOREEND);
    this._filmListContainerElements = container.querySelectorAll(`.films-list__container`);
    const filmContainerTopRatedElement = this._filmListContainerElements[FILMS_LIST_CONTAINER.TOP_RATED];
    const newFilms = renderFilms(filmContainerTopRatedElement, topRatedFilms, this._onDataChange, this._onViewChange, this._commentsModel, this._api, this._filmsModel);
    this._showedTopRatedFilmControllers = this._showedTopRatedFilmControllers.concat(newFilms);
  }

  _renderMostCommentedFilms(films) {
    const mostCommentedFilms = this._searchMostCommentedFilms(films);
    const container = this._container.getElement();

    if (mostCommentedFilms === null) {
      return;
    }
    this._mostCommentedComponent = new MostCommentedComponent();
    render(container, this._mostCommentedComponent, RenderPosition.BEFOREEND);
    this._filmListContainerElements = container.querySelectorAll(`.films-list__container`);
    const filmContainerMostCommentedElement = this._filmListContainerElements[this._filmListContainerElements.length - 1];
    const newFilms = renderFilms(filmContainerMostCommentedElement, mostCommentedFilms, this._onDataChange, this._onViewChange, this._commentsModel, this._api, this._filmsModel);
    this._showedMostCommentedFilmControllers = this._showedMostCommentedFilmControllers.concat(newFilms);
  }

  _removeFilms() {
    this._showedFilmControllers.forEach((filmController) => filmController.destroy());
    this._showedFilmControllers = [];
  }

  _removeMostCommentedFilms() {
    remove(this._mostCommentedComponent);
    this._showedMostCommentedFilmControllers.forEach((filmController) => filmController.destroy());
    this._showedMostCommentedFilmControllers = [];
  }

  _renderShowMoreButton() {
    remove(this._showMoreButtonComponent);

    if (this._showingFilmCount >= this._filmsModel.getFilms().length) {
      return;
    }
    render(this._filmsListComponent.getElement(), this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonClick);
  }

  _onShowMoreButtonClick() {
    const prevFilmCount = this._showingFilmCount;
    this._showingFilmCount = prevFilmCount + COUNT.FILM_SHOW;
    const films = this._filmsModel.getFilms();
    const sortedFilms = getSortedFilms(films, this._filmsModel.getSortType(), prevFilmCount, this._showingFilmCount);

    this._renderFilms(sortedFilms);

    if (this._showingFilmCount >= this._filmsModel.getFilms().length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _updateMostCommentedFilms() {
    this._removeMostCommentedFilms();
    this._renderMostCommentedFilms(this._filmsModel.getFilms());
  }


  _updateFilms(count) {
    this._removeFilms();
    this._renderFilms(this._filmsModel.getFilms().slice(0, count));
    this._renderShowMoreButton();
  }

  _onDataChange(filmController, oldData, newData) {
    this._api.updateFilm(oldData.id, newData)
      .then((filmModel) => {
        const isSuccess = this._filmsModel.updateFilm(oldData.id, filmModel);

        if (isSuccess) {
          filmController.render(filmModel);
          this._updateMostCommentedFilms();
        }
      })
      .catch(() => {


      });

  }

  _onViewChange() {
    this._showedFilmControllers.forEach((it) => it.setDefaultView());
    this._showedTopRatedFilmControllers.forEach((it) => it.setDefaultView());
    this._showedMostCommentedFilmControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange() {
    this._showingFilmCount = COUNT.FILM_SHOW;
    const films = this._filmsModel.getFilms();
    const sortType = this._filmsModel.getSortType();

    const sortedFilms = getSortedFilms(films, sortType, 0, this._showingFilmCount);

    this._removeFilms();
    this._renderFilms(sortedFilms);
    this._renderShowMoreButton();
  }

  _onFilterChange() {
    this._updateFilms(this._showingFilmCount);
    this._filmsModel.setSortType(SortType.DEFAULT);
  }

  _searchTopRatedFilms(films) {
    const clonFilms = films.slice();
    const topRatedFilms = clonFilms.sort((a, b) => b.rating - a.rating).slice(0, COUNT.TOP_RATED);
    return topRatedFilms[FILM_FIRST].rating > 0 ? topRatedFilms : null;
  }

  _searchMostCommentedFilms(films) {
    const clonFilms = films.slice();
    const mostCommentedFilms = clonFilms.sort((a, b) => b.comments.length - a.comments.length).slice(0, COUNT.MOST_COMMENTED);
    return mostCommentedFilms[FILM_FIRST].comments.length > 0 ? mostCommentedFilms : null;
  }

}
