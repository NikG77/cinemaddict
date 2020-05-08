import AbstractSmartComponent from "./abstract-smart-component";
import {formatDateComment} from "../utils/common";

const emojis = [{
  name: `smile`,
  isChecked: true,
},
{
  name: `sleeping`,
  isChecked: false,
},
{
  name: `puke`,
  isChecked: false,
},
{
  name: `angry`,
  isChecked: false,
}
];

const createEmojiListMarkup = ({name, isChecked}) => {
  const inputChecked = isChecked ? `checked` : ``;
  return (`<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${name}" value="${name}" ${inputChecked}>
  <label class="film-details__emoji-label" for="emoji-${name}">
    <img src="./images/emoji/${name}.png" width="30" height="30" alt="emoji">
  </label>`);
};

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

const createCommentsTemplate = (comments, options = {}) => {

  const commentsNumber = comments.length;
  const {newElementImgEmojiSrc, newElementImgEmojiAlt, resetTextariaEmojValue} = options;
  const CommmentsMarkup = createCommmentsMarkup(comments);
  const emojiListMarkup = emojis.map((emoji) => {
    return createEmojiListMarkup(emoji);
  }).join(`\n`);
  return (
    `<div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsNumber}</span></h3>

        <ul class="film-details__comments-list">
          ${CommmentsMarkup}
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label">
            <img src="${newElementImgEmojiSrc}" width="55" height="55" alt="${newElementImgEmojiAlt}">
          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${resetTextariaEmojValue}</textarea>
          </label>

          <div class="film-details__emoji-list">
            ${emojiListMarkup}
          </div>
        </div>
      </section>
    </div>`
  );
};

export default class Comments extends AbstractSmartComponent {
  constructor(film, comments) {
    super();

    this._comments = comments;
    this._film = film;

    this._newElementImgEmojiSrc = ``;
    this._newElementImgEmojiAlt = ``;
    this._resetTextariaEmojValue = ``;

    this._subscribeOnEvents();

  }

  getTemplate() {
    return createCommentsTemplate(this._comments, {
      newElementImgEmojiSrc: this._newElementImgEmojiSrc,
      newElementImgEmojiAlt: this._newElementImgEmojiAlt,
      resetTextariaEmojValue: this._resetTextariaEmojValue,
    });
  }

  recoveryListeners() {
    this._subscribeOnEvents();
    // this.setCommentDeleteClickHandler();
    // this.setCommentAddClickHandler();
  }

  rerender() {
    super.rerender();
  }

  reset() {
    this._clear();

    this.rerender();
  }

  _clear() {
    this._newElementImgEmojiSrc = ``;
    this._newElementImgEmojiAlt = ``;
    this._resetTextariaEmojValue = ``;
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.film-details__emoji-list`).addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `INPUT`) {
        return;
      }
      const activeEmoji = evt.target.value;
      this._newElementImgEmojiSrc = `images/emoji/${activeEmoji}.png`;
      this._newElementImgEmojiAlt = `emoji-${activeEmoji}`;

      this.rerender();
    });

    element.querySelector(`.film-details__comment-input`).addEventListener(`change`, (evt) => {
      this._resetTextariaEmojValue = evt.target.value;
    });

  }

  // getNewComment() {
  //   const newComment = {
  //     comment: this._newTextariaEmojValue,
  //     // "date": new Data(),
  //     emotion: this._newElementImgEmojiAlt,
  //   };
  //   console.log(newComment);

  //   return newComment;
  //   // return {
  //   //   comment: this._newTextariaEmojValue,
  //   //   // "date": new Data(),
  //   //   emotion: this._newElementImgEmojiAlt,
  //   // };
  // }


  setCommentDeleteClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-details__comments-list`)
        .addEventListener(`click`, handler);
  }

}

