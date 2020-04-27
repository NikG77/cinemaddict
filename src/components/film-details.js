import AbstractSmartComponent from "./abstract-smart-component";
import {formatTimeHour, formatTimeMinute, formatDate, formatDateComment} from "../utils/common";


const createGenreMarkup = (genres) => {
  return genres.map((genre) => {
    return (
      `<span class="film-details__genre">${genre}</span>`
    );
  })
  .join(`\n`);
};

const createCommmentsMarkup = (comments) => {
  return comments.map((comment) => {
    const commentTimeAgo = formatDateComment(comment.data);
    return (
      `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="${comment.emotion}" width="55" height="55" alt="emoji-smile">
        </span>
        <div>
          <p class="film-details__comment-text">${comment.message}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${comment.avtor}</span>
            <span class="film-details__comment-day">${commentTimeAgo}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`
    );
  });
};


const createFilmDetailsTemplate = (film, options = {}) => {
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
    comments,
  } = film;

  const {newElementImgEmojiSrc, newElementImgEmojiAlt, resetTextariaEmojValue} = options;

  const writersDetails = writers.join(`, `);
  const actorsDetails = actors.join(`, `);

  const dateRelease = formatDate(date);

  const durationMinute = formatTimeMinute(runtime);
  const durationHour = formatTimeHour(runtime);

  const genreDeyails = genre.length > 1 ? `Genres` : `Genre`;
  const genreMarkup = createGenreMarkup(genre);
  const commentsNumber = comments.length;
  const CommmentsMarkup = createCommmentsMarkup(comments);

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

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsNumber}</span></h3>

            <ul class="film-details__comments-list">
             ${CommmentsMarkup}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">
                <img src="${newElementImgEmojiSrc}" width="55" height="55" alt="${newElementImgEmojiAlt}">
              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${resetTextariaEmojValue}</textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" checked>
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};
// <div for="add-emoji" class="film-details__add-emoji-label">
//    <img src="images/emoji/smile.png" width="55" height="55" alt="emoji-smile">
// </div>

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();

    this._film = film;
    this._submitHandler = null;

    this._newElementImgEmojiSrc = ``;
    this._newElementImgEmojiAlt = ``;
    this._resetTextariaEmojValue = ``;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film, {
      newElementImgEmojiSrc: this._newElementImgEmojiSrc,
      newElementImgEmojiAlt: this._newElementImgEmojiAlt,
      resetTextariaEmojValue: this._resetTextariaEmojValue,
    });

  }

  recoveryListeners() {
    this.setPopupCloseClickHandler(this._submitHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  reset() {
    this._clear();

    this.rerender();
  }

  setPopupCloseClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);

    this._submitHandler = handler;
  }

  _clear() {
    this._newElementImgEmojiSrc = ``;
    this._newElementImgEmojiAlt = ``;
    this._resetTextariaEmojValue = ``;
  }

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

    element.querySelector(`.film-details__emoji-list`).addEventListener(`click`, (evt) => {
      const target = evt.target;
      const elementImgEmoji = target.closest(`img`);
      // console.log(`target-`, target);
      if (target && elementImgEmoji) {
        this._newElementImgEmojiSrc = elementImgEmoji.src;
        // console.log(this._newElementImgEmojiSrc);
        this._newElementImgEmojiAlt = elementImgEmoji.alt;
      }

      this.rerender();
    });

    element.querySelector(`.film-details__comment-input`).addEventListener(`change`, (evt) => {
      this._resetTextariaEmojValue = evt.target.value;
    });


  }

}

