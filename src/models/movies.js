export default class Movies {
  constructor() {
    this._films = [];

    this._dataChangeHandlers = [];
  }

  getFilms() {
    return this.films;
  }

  setFilms(films) {
    this.films = Array.from(films);
    this._callHandlers(this._dataChangeHandlers);
  }

  updateTask(id, film) {
    const index = this.films.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this.films = [].concat(this.films.slice(0, index), film, this.films.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
