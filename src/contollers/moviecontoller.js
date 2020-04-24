
import FilmCardComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";
import {isEscEvent} from "../utils/common";
import {render, remove, append, RenderPosition} from "../utils/render";

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._onPopupOpenClick = this._onPopupOpenClick.bind(this);
    this._onPopupCloseEscPress = this._onPopupCloseEscPress.bind(this);
    this._closePopup = this._closePopup.bind(this);

  }

  render(film) {
    this._filmCardComponent = new FilmCardComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    this._filmCardComponent.setClickHandler(this._onPopupOpenClick);

    this._filmCardComponent.setWatchlistButtonClickHandler(() => {
      console.log(`1`, film.user_details.watchlist);
      this._onDataChange(this, film, Object.assign({}, film, {
        watchlist: !film.user_details.watchlist,
      }));
      console.log(`2`, film.user_details.watchlist);
    });


    this._filmCardComponent.setHistoryButtonClickHandler(() => {

    });
    this._filmCardComponent.setFavoriteButtonClickHandler();

  }

  _closePopup() {
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onPopupCloseEscPress);
  }

  _onPopupCloseEscPress(evt) {
    isEscEvent(evt, this._closePopup);
  }

  _onPopupOpenClick(evt) {
    const target = evt.target;

    if (target && target.className === `film-card__title` || target.className === `film-card__poster` || target.className === `film-card__comments`) {
      append(this._container, this._filmDetailsComponent);

      document.addEventListener(`keydown`, this._onPopupCloseEscPress);

      this._filmDetailsComponent.setPopupCloseClickHandler(this._closePopup);
    }
  }

}

