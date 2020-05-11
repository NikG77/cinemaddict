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
  filterType = filterType.toLowerCase().split(` `, 1).join();
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
      // eslint-disable-next-line no-console
      console.log(`filterType-`, filterType, `что-то пошло не так с getFilmsByFilter`);
  }

  return films;
};
