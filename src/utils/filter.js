import {FilterType} from "../const.js";

export const getWatchListFilms = (films) => {
  return films.filter((film) => film.watchlist);
};

export const getAlreadyWatchedFilms = (films) => {
  return films.filter((film) => film.alreadyWatched);
};


export const getFavoriteFilms = (films) => {
  return films.filter((film) => film.favorite);
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
  }

  return films;
};
