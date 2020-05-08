import AbstractSmartComponent from "./abstract-smart-component";
import {formatDateComment} from "../utils/common";


const createCommmentsMarkup = (comments) => {
  return comments.map((comment) => {
    const commentTimeAgo = formatDateComment(comment.data);
    return (
      `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="${comment.emotion}" width="55" height="55" alt="emoji-smile">
        </span>
        <div>
          <p class="film-details__comment-text">${comment.сomment}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${comment.author}</span>
            <span class="film-details__comment-day">${commentTimeAgo}</span>
            <button class="film-details__comment-delete" data-id="${comment.id}">Delete</button>
          </p>
        </div>
      </li>`
    );
  });
};

const createCommentsTemplate = (comments) => {

  const commentsNumber = comments.length;

  const CommmentsMarkup = createCommmentsMarkup(comments);
  return (
    `<div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsNumber}</span></h3>

        <ul class="film-details__comments-list">
          ${CommmentsMarkup}
        </ul>

      </section>
    </div>`
  );
};

export default class Comments extends AbstractSmartComponent {
  constructor(film, comments) {
    super();

    this._comments = comments;
    this._film = film;

  }

  getTemplate() {
    return createCommentsTemplate(this._comments);
  }

  recoveryListeners() {
    this.setCommentDeleteClickHandler();
  }

  rerender() {
    super.rerender();
  }

  reset() {
    this.rerender();
  }

  setCommentDeleteClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-details__comments-list`)
        .addEventListener(`click`, handler);
  }

}

