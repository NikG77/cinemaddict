/* eslint-disable indent */
import {createElement} from "../utils.js";

const getProfileRating = (allFilms) => {
  const PROFILE_LEVEL = {
    NOTHING: 0,
    NOVICE: 1,
    FAN: 11,
    MOVIE_BUF: 21
  };

  const getFilmsWatched = (films) => {
    return films.reduce((accumulator, current) => {
      return accumulator + current.user_details.already_watched;
    }, 0);
  };

  const numberWatched = getFilmsWatched(allFilms);

  let profileRating;

  switch (true) {
    case numberWatched < PROFILE_LEVEL.NOTHING:
      profileRating = ``;
      break;
    case numberWatched < PROFILE_LEVEL.NOVICE:
      profileRating = `Novice`;
      break;
    case numberWatched < PROFILE_LEVEL.FAN:
      profileRating = `Fan`;
      break;
    case numberWatched >= PROFILE_LEVEL.MOVIE_BUF:
      profileRating = `Movie Buff`;
      break;
    default:
      profileRating = `Что то пошло не так`;
  }
  return profileRating;
};


const createProfileTemplate = (allFilms) => {

  const profileRating = getProfileRating(allFilms);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${profileRating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class Profile {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createProfileTemplate(this._films);
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
