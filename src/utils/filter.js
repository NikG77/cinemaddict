import {FilterType} from "../const.js";

export const getWatchListFilms = (films) => {
  return films.filter((film) => film.user_details.watchlist);
};

export const getAlreadyWatchedFilms = (films) => {
  return films.filter((film) => film.user_details.already_watched);
};


export const getFavoriteFilms = (films) => {
  return films.filter((film) => film.user_details.favorite);
};

export const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return films;
    case FilterType.FAVORITES:
      return getFavoriteFilms(films);
    case FilterType.HISTORY:
      return getAlreadyWatchedFilms(films);
    case FilterType.WATCHLIST:
      return getWatchListFilms(films);
    default:
      console.log(`что-то пошло не так с getFilmsByFilter`);
  }

  return films;
};
