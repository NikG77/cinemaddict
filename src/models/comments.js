export default class Comments {
  constructor() {
    this._comments = [];

    // this._commentChangeHandlers = [];
  }

  getComments() {
    return this._comments;
  }

  setComments(comments) {
    this._comments = Array.from(comments);
    // this._callHandlers(this._commentChangeHandlers);
  }

  removeComments(id) {
    const index = this._comments.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._comments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));

    // this._callHandlers(this._commentChangeHandlers);

    return true;
  }


  addComment(newComment) {
    this._comments.push(newComment);

    // this._callHandlers(this._commentChangeHandlers);
  }

  // setCommentChangeHandler(handler) {
  //   this._commentChangeHandlers.push(handler);
  // }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
