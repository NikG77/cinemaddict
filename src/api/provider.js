import Movie from "../models/movie";

const isOnline = () => {
  return window.navigator.onLine;
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;

  }

  getFilms() {
    if (isOnline()) {
      return this._api.getFilms()
        .then((films) => {
          films.forEach((film) => this._store.setItem(film.id, film.toRAW()));

          return films;
        });
    }

    const storeTasks = Object.values(this._store.getItems());

    return Promise.resolve(Movie.parseTasks(storeTasks));
  }

  getComments(filmId) {
    if (isOnline()) {
      return this._api.getComments(filmId);
    }

    // TODO: Реализовать логику при отсутствии интернета
    return Promise.reject(`offline logic is not implemented`);
  }

  updateFilm(id, film) {
    if (isOnline()) {
      return this._api.updateFilm(id, film)
        .then((newFilm) => {
          this._store.setItem(newFilm.id, newFilm.toRAW());

          return newFilm;
        });
    }

    const localMovie = Movie.clone(Object.assign(film, {id}));

    this._store.setItem(id, localMovie.toRAW());

    return Promise.resolve(localMovie);
  }

  deleteComment(id) {
    if (isOnline()) {
      return this._api.deleteComment(id);
    }

    // TODO: Реализовать логику при отсутствии интернета
    return Promise.reject(`offline logic is not implemented`);
  }

  createComment(comment, filmId) {
    if (isOnline()) {
      return this._api.createComment(comment, filmId);
    }

    // TODO: Реализовать логику при отсутствии интернета
    return Promise.reject(`offline logic is not implemented`);
  }

}

