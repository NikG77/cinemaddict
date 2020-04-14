import {MINUTE_IN_HOUR} from "../const.js";
import {createElement} from "../utils.js";

const DECRIPTION = {
  START: 0,
  END: 140,
  POINT_CONTINUATION: 3,
};


const createFilmCardTemplate = (film) => {

  const {
    id,
    film_info: {
      title,
      total_rating: totalRating,
      poster,
      release: {
        date,

      },
      runtime,
      genre,
      description,
    },
    comments,
  } = film;

  const fullYearDate = date.getFullYear();
  const durationHour = Math.floor(runtime / MINUTE_IN_HOUR);
  const durationMinute = runtime - durationHour * MINUTE_IN_HOUR;
  const genreFilm = genre.join(` `);
  const descriptionFilm = description.join(``).slice(DECRIPTION.START, DECRIPTION.END) + description.join(`.`).slice(DECRIPTION.END, DECRIPTION.END + DECRIPTION.POINT_CONTINUATION).replace(/./g, `.`);
  const commentsNumber = comments.length;

  return (
    `<article class="film-card" data-index="${id}">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${fullYearDate}</span>
        <span class="film-card__duration">${durationHour}h ${durationMinute}m</span>
        <span class="film-card__genre">${genreFilm}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${descriptionFilm}</p>
      <a class="film-card__comments">${commentsNumber} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
