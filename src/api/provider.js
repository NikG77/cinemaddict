import Movie from "../models/movie";

const isOnline = () => {
  return window.navigator.onLine;
};

const createStoreStructure = (films) => {
  return films.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
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
          const filmsForStarage = createStoreStructure(films.map((film) => film.toRAW()));

          this._store.setItems(filmsForStarage);

          return films;
        });
    }

    const storeFilms = Object.values(this._store.getItems());

    return Promise.resolve(Movie.parseMovies(storeFilms));
  }

  getComments(filmId) {
    if (isOnline()) {
      return this._api.getComments(filmId);
    }

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

    return Promise.reject(`offline logic is not implemented`);
  }

  createComment(comment, filmId) {
    if (isOnline()) {
      return this._api.createComment(comment, filmId);
    }

    return Promise.reject(`offline logic is not implemented`);
  }


  sync() {
    if (isOnline()) {
      const storeFilms = Object.values(this._store.getItems());

      return this._api.sync(storeFilms)
        .then((response) => {
          const syncFilms = response.updated;

          this._store.setItems(syncFilms);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

}
