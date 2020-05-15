import AbstractComponent from "./abstract-component";
import {transformDuration} from "../utils/common";

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
    user_details: {
      watchlist,
      already_watched: alreadyWatched,
      favorite,
    },
    comments,
  } = film;

  const fullYearDate = date.getFullYear();

  const [hours, minutes] = transformDuration(runtime);

  // const durationMinute = formatTimeMinute(runtime);
  // console.log(runtime, `минуты`, durationMinute);
  // const durationHour = formatTimeHour(runtime);
  // console.log(runtime, `часы`, durationHour);

  const genreFilm = genre.join(` `);
  const descriptionFilm = description.join(``).slice(DECRIPTION.START, DECRIPTION.END) + description.join(`.`).slice(DECRIPTION.END, DECRIPTION.END + DECRIPTION.POINT_CONTINUATION).replace(/./g, `.`);
  const commentsNumber = comments.length;

  return (
    `<article class="film-card" data-index="${id}">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${fullYearDate}</span>
        <span class="film-card__duration">${hours}h ${minutes}m</span>
        <span class="film-card__genre">${genreFilm}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${descriptionFilm}</p>
      <a class="film-card__comments">${commentsNumber} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${alreadyWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${favorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  setWatchListButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setHistoryButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }


}
