export default class Provider {
  constructor(api) {
    this._api = api;
  }

  getFilms() {
    return this._api.getFilms();
  }

  getComments(filmId) {
    return this._api.getComments(filmId);
  }

  updateFilm(id, data) {
    return this._api.updateFilm(id, data);
  }

  deleteComment(id) {
    return this._api.deleteComment(id);
  }

  createComment(comment, filmId) {
    return this._api.createComment(comment, filmId);
  }

  // _load({url, method = Method.GET, body = null, headers = new Headers()}) {
  //   headers.append(`Authorization`, this._authorization);

  //   return fetch(`${this._endPoint}/${url}`, {method, body, headers})
  //     .then(checkStatus)
  //     .catch((err) => {
  //       throw err;
  //     });
  // }

};

