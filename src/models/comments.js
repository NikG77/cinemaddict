export default class Comments {
  constructor() {
    this._comments = [];
  }

  getComments() {
    return this._comments;
  }

  setComments(comments) {
    this._comments = this._comments.concat(Array.from(comments));
  }

  removeComments(id) {
    const index = this._comments.findIndex((comment) => comment.id === id);

    if (index === -1) {
      return false;
    }

    this._comments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));

    return true;
  }

  addComment(newComments) {
    this._comments = this._comments.concat(newComments.filter((comment) => this._comments.indexOf(comment) < 0));
  }

}
