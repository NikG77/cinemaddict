
import FilmCardComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";
import {isEscEvent} from "../utils/common";
import {render, remove, RenderPosition, replace} from "../utils/render";
import FilmCommentsComponent from "../components/comments";
import FilmNewCommentComponent from "../components/newComment";
import {isCtrlOrCommandAndEnterEvent} from "../utils/common";

export const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const EmptyComment = {};

export default class FilmController {
  constructor(container, onDataChange, onViewChange, commentsModel) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._commentsModel = commentsModel;

    this._mode = Mode.DEFAULT;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._filmCommentsComponent = null;
    this._filmNewCommentComponent = null;

    this._onPopupOpenClick = this._onPopupOpenClick.bind(this);
    this._onPopupCloseEscPress = this._onPopupCloseEscPress.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._onCommentChange = this._onCommentChange.bind(this);


    this._film = null;
  }

  render(film) {
    this._film = film;

    const oldFilmCardComponent = this._filmCardComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCardComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    if (oldFilmCardComponent && oldFilmDetailsComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
    } else {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }

    this._filmCardComponent.setClickHandler(this._onPopupOpenClick);

    this._filmCardComponent.setWatchListButtonClickHandler((evt) => {
      this.onWatchListButtonClick(evt);
    });

    this._filmCardComponent.setHistoryButtonClickHandler((evt) => {
      this.onHistoryButtonClickHandler(evt);
    });

    this._filmCardComponent.setFavoriteButtonClickHandler((evt) => {
      this.onFavoriteButtonClick(evt);
    });

  }

  onWatchListButtonClick(evt) {
    evt.preventDefault();
    const newFilm = Object.assign({}, this._film);
    newFilm[`user_details`][`watchlist`] = !this._film[`user_details`][`watchlist`];

    this._onDataChange(this, this._film, newFilm);
  }

  onHistoryButtonClickHandler(evt) {
    evt.preventDefault();
    const newFilm = Object.assign({}, this._film);
    newFilm[`user_details`][`already_watched`] = !this._film[`user_details`][`already_watched`];

    this._onDataChange(this, this._film, newFilm);
  }

  onFavoriteButtonClick(evt) {
    evt.preventDefault();
    const newFilm = Object.assign({}, this._film);
    newFilm[`user_details`][`favorite`] = !this._film[`user_details`][`favorite`];

    this._onDataChange(this, this._film, newFilm);
  }


  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopup();
    }
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onPopupCloseEscPress);
  }

  _closePopup() {
    this._filmDetailsComponent.reset();
    this._filmCommentsComponent.reset();
    this._filmNewCommentComponent.reset();

    this._mode = Mode.DEFAULT;

    remove(this._filmDetailsComponent);
    document.querySelector(`body`).classList.remove(`hide-overflow`);
    document.removeEventListener(`keydown`, this._onPopupCloseEscPress);

    this._onDataChange(this, this._film, this._film);
  }

  _onPopupCloseEscPress(evt) {
    isEscEvent(evt, this._closePopup);
  }

  _onPopupOpenClick(evt) {
    const target = evt.target;

    if (target && target.className === `film-card__title` || target.className === `film-card__poster` || target.className === `film-card__comments`) {
      document.querySelector(`body`).classList.add(`hide-overflow`);

      this._onViewChange();

      this._renderPopup();

      this._mode = Mode.EDIT;

      document.addEventListener(`keydown`, this._onPopupCloseEscPress);

      this._filmDetailsComponent.setPopupCloseClickHandler(this._closePopup);
    }
  }

  _renderPopup() {
    render(this._container, this._filmDetailsComponent, RenderPosition.BEFOREEND);
    this._renderPopupComment();
  }


  _rerenderPopupComment() {
    remove(this._filmCommentsComponent);

    this._renderPopupComment();
  }

  _renderPopupComment() {
    const comments = this._commentsModel.getComments();
    const filmCommets = this._getFilmComment(comments);
    this._filmCommentsComponent = new FilmCommentsComponent(this._film, filmCommets);


    render(this._container.querySelector(`.film-details__inner`), this._filmCommentsComponent, RenderPosition.BEFOREEND);
    if (!this._filmNewCommentComponent) {
      this._filmNewCommentComponent = new FilmNewCommentComponent();
    }


    render(this._container.querySelector(`.film-details__comments-wrap`), this._filmNewCommentComponent, RenderPosition.BEFOREEND);

    this._filmCommentsComponent.setCommentDeleteClickHandler((evt) => {
      this._onCommentDeleteClick(evt);
    });


    this._filmNewCommentComponent.setCommentAddClickHandler((evt) => {
      this._onCommentAddClick(evt);
    });

  }


  _onCommentAddClick(evt) {

    if (evt.ctrlKey && evt.keyCode === 13 || evt.metaKey && evt.keyCode === 13) {
      console.log(`пошел за новым комментом`);

      const newComment = this._filmNewCommentComponent.getNewComment();
      console.log(`выдали новый коммент ${newComment}`);


    //  this._onCommentChange(null, newComment);
    }

  }

  _onCommentDeleteClick(evt) {
    evt.preventDefault();
    const target = evt.target;

    if (target && target.className !== `film-details__comment-delete`) {
      return;
    }
    const commentId = target.dataset.id;

    const index = this._film.comments.findIndex((it) => {
      return it === commentId;
    });

    // Удаляю из фильма из массива комментариев комментарий
    this._film.comments = [].concat(this._film.comments.slice(0, index), this._film.comments.slice(index + 1));

    // Передаю id комментария для удаления из массива комментариев
    this._onCommentChange(commentId, null);
  }

  _onCommentChange(oldData, newData) {
    if (newData === null) {
      const isSuccess = this._commentsModel.removeComments(oldData);
      if (isSuccess) {
        this._rerenderPopupComment();
      }
    }
    if (oldData === null) {
      this._commentsModel.addComments(newData);
      this._rerenderPopupComment();
    }

  }


  _getFilmComment(comments) {
    return this._film.comments.map((item) =>
      comments.find((comment) => comment.id === item));
  }

}

