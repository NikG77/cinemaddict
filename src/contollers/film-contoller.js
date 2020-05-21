import ErrorComponent from "../components/error";
import FilmCardComponent from "../components/film-card";
import FilmCommentsComponent from "../components/comments";
import FilmDetailsComponent from "../components/film-details";
import FilmNewCommentComponent from "../components/newComment";
import MovieModel from "../models/movie";
import {encode} from "he";
import {isCtrlOrCommandAndEnterEvent, isEscEvent, shake} from "../utils/common";
import {render, remove, RenderPosition, replace} from "../utils/render";
import {Timeout} from "../const";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class FilmController {
  constructor(container, onDataChange, onViewChange, commentsModel, api, filmsModel) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._api = api;
    this._filmsModel = filmsModel;

    this._commentsModel = commentsModel;

    this._mode = Mode.DEFAULT;
    this._modeFullPopup = Mode.DEFAULT;

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
      this._onWatchListButtonClick(evt);
    });

    this._filmCardComponent.setHistoryButtonClickHandler((evt) => {
      this._onHistoryButtonClickHandler(evt);
    });

    this._filmCardComponent.setFavoriteButtonClickHandler((evt) => {
      this._onFavoriteButtonClick(evt);
    });
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
    if (this._modeFullPopup === Mode.EDIT) {
      this._filmCommentsComponent.reset();
      this._filmNewCommentComponent.reset();
      remove(this._filmCommentsComponent);
      remove(this._filmNewCommentComponent);
      this._modeFullPopup = Mode.DEFAULT;
    }

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

    if (this._commentsModel.getComments().length > 0) {
      this._renderPopupComment();
      this._modeFullPopup = Mode.EDIT;
    }
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

  _showError(errorMessage) {
    const errorComponent = new ErrorComponent(errorMessage);
    render(this._filmCommentsComponent.getElement(), errorComponent, RenderPosition.AFTERBEGIN);

    setTimeout(() => {
      remove(errorComponent);
    }, Timeout.SHOW_ERROR);
  }

  _onCommentChange(oldData, newData) {
    if (newData === null) {
      const isSuccess = this._commentsModel.removeComments(oldData);
      if (isSuccess) {
        this._rerenderPopupComment();
      }
    }
    if (oldData === null) {
      this._commentsModel.addComment(newData);
      this._rerenderPopupComment();
      this._filmNewCommentComponent.reset();
    }
  }

  _getFilmComment(comments) {
    return this._film.comments.map((item) =>
      comments.find((comment) => comment.id === item));
  }

  _onCommentAddClick(evt) {
    if (isCtrlOrCommandAndEnterEvent(evt)) {
      const commentEmotionElement = this._filmNewCommentComponent.getElement().querySelector(`.film-details__add-emoji-label img`);
      const notSanitizedCommentText = this._filmNewCommentComponent.getElement().querySelector(`.film-details__comment-input`).value;
      const commentText = encode(notSanitizedCommentText);
      if (!commentEmotionElement || commentText.length === 0) {
        shake(this._filmNewCommentComponent.getElement());
        return;
      }

      const emotion = commentEmotionElement.alt.split(`-`)[1];
      const newComment = {
        id: new Date() + Math.floor(Math.random() * 1000),
        date: new Date(),
        emotion,
        comment: commentText,
      };

      const textareaElement = evt.target;
      textareaElement.disabled = true;

      this._api.createComment(newComment, this._film.id)
        .then((data) => {
          this._film.comments = [];
          this._film.comments = data.movie.comments;

          const newComments = data.comments;
          this._filmsModel.updateFilm(this._film.id, data.movie);
          this._onCommentChange(null, newComments);
        })
        .catch(() => {
          textareaElement.disabled = false;
          this._filmNewCommentComponent.showErrorBorder();
          shake(this._filmNewCommentComponent.getElement());
          const errorMessage = `Отправка комментария невозможна из-за отсутствия интернета`;
          this._showError(errorMessage);
        });
    }
  }

  _onCommentDeleteClick(evt) {
    evt.preventDefault();
    const target = evt.target;

    if (target && target.className !== `film-details__comment-delete`) {
      return;
    }

    const commentId = target.dataset.id;
    const deleteButtonElement = target;
    const index = this._film.comments.findIndex((it) => {
      return it === commentId;
    });

    deleteButtonElement.innerHTML = `Deleting...`;
    deleteButtonElement.disabled = true;

    this._api.deleteComment(commentId)
      .then(() => {
        this._film.comments = [].concat(this._film.comments.slice(0, index), this._film.comments.slice(index + 1));

        const newFilm = MovieModel.clone(this._film);
        newFilm.comments = this._film.comments;
        this._filmsModel.updateFilm(this._film.id, newFilm);

        this._onCommentChange(commentId, null);
      })
      .catch(() => {
        deleteButtonElement.innerHTML = `Delete`;
        deleteButtonElement.disabled = false;
        this._filmCommentsComponent.recoveryListeners();
        shake(this._filmCommentsComponent.getElement().querySelectorAll(`li`)[index]);
        const errorMessage = `Удаление комментария невозможно из-за отсутствия интернета`;
        this._showError(errorMessage);
      });
  }

  _onWatchListButtonClick(evt) {
    evt.preventDefault();
    const newFilm = MovieModel.clone(this._film);
    newFilm.watchlist = !this._film.watchlist;

    this._onDataChange(this, this._film, newFilm);
  }

  _onHistoryButtonClickHandler(evt) {
    evt.preventDefault();
    const newFilm = MovieModel.clone(this._film);
    newFilm.alreadyWatched = !this._film.alreadyWatched;

    this._onDataChange(this, this._film, newFilm);
  }

  _onFavoriteButtonClick(evt) {
    evt.preventDefault();
    const newFilm = MovieModel.clone(this._film);
    newFilm.favorite = !this._film.favorite;

    this._onDataChange(this, this._film, newFilm);
  }

}

