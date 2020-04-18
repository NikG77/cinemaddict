import AbstractComponent from "./abstract-component";

const getProfileRating = (allFilms) => {
  const PROFILE_LEVEL = {
    NOTHING_MAX: 0,
    NOVICE_MAX: 10,
    FAN_MAX: 20,
    MOVIE_BUF_MIN: 21,
  };

  const getFilmsWatched = (films) => {
    return films.reduce((accumulator, current) => {
      return accumulator + current.user_details.already_watched;
    }, 0);
  };

  const numberWatched = getFilmsWatched(allFilms);

  let profileRating;

  switch (true) {
    case numberWatched <= PROFILE_LEVEL.NOTHING_MAX:
      profileRating = ``;
      break;
    case numberWatched <= PROFILE_LEVEL.NOVICE_MAX:
      profileRating = `Novice`;
      break;
    case numberWatched <= PROFILE_LEVEL.FAN_MAX:
      profileRating = `Fan`;
      break;
    case numberWatched >= PROFILE_LEVEL.MOVIE_BUF_MIN:
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

export default class Profile extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createProfileTemplate(this._films);
  }
}
