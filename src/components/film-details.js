import AbstractSmartComponent from "./abstract-smart-component";
import {formatTimeHour, formatTimeMinute, formatDate} from "../utils/common";

const createGenreMarkup = (genres) => {
  return genres.map((genre) => {
    return (
      `<span class="film-details__genre">${genre}</span>`
    );
  })
  .join(`\n`);
};

const createFilmDetailsTemplate = (film) => {
  const {
    film_info: {
      title,
      alternative_title: alternativeTitle,
      total_rating: totalRating,
      poster,
      age_rating: ageRating,
      director,
      writers,
      actors,
      release: {
        date,
        release_country: releaseCountry,
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
  } = film;

  const writersDetails = writers.join(`, `);
  const actorsDetails = actors.join(`, `);

  const dateRelease = formatDate(date);

  const durationMinute = formatTimeMinute(runtime);
  const durationHour = formatTimeHour(runtime);

  const genreDeyails = genre.length > 1 ? `Genres` : `Genre`;
  const genreMarkup = createGenreMarkup(genre);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">

              <p class="film-details__age">${ageRating}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${alternativeTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${totalRating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writersDetails}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actorsDetails}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${dateRelease}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${durationHour}h ${durationMinute}m</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${releaseCountry}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${genreDeyails}</td>
                  <td class="film-details__cell">
                    ${genreMarkup}
                  </td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${watchlist ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${alreadyWatched ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${favorite ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>


      </form>
    </section>`
  );
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();

    this._film = film;
    this._submitHandler = null;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film);
  }

  recoveryListeners() {
    this.setPopupCloseClickHandler(this._submitHandler);

    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  reset() {
    this.rerender();
  }

  setPopupCloseClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);

    this._submitHandler = handler;
  }

  // setCommentAddClickHandler(handler) {
  //   this.getElement().querySelector(`form`).addEventListener(`keydown`, handler);
  // }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`#watchlist`).addEventListener(`click`, () => {
      this._film[`user_details`][`watchlist`] = !this._film[`user_details`][`watchlist`];

      // this.rerender();
    });

    element.querySelector(`#watched`).addEventListener(`click`, () => {
      this._film[`user_details`][`already_watched`] = !this._film[`user_details`][`already_watched`];
      // this.rerender();
    });

    element.querySelector(`#favorite`).addEventListener(`click`, () => {
      this._film[`user_details`][`favorite`] = !this._film[`user_details`][`favorite`];
      // this.rerender();
    });

  }

}

