import AbstractSmartComponent from "./abstract-smart-component";
import {encode} from "he";

const BORDER_ERROR_TIMEOUT = 3000;

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

const createNewCommentTemplate = (activeEmoji, newTextariaEmojValue) => {

  const emojiListMarkup = emojis.map((emoji) => {
    return createEmojiListMarkup(emoji);
  }).join(`\n`);

  const createEmojiImgMarkup = activeEmoji ? `<img src="images/emoji/${activeEmoji}.png" width="55" height="55" alt="emoji-${activeEmoji}">` : ``;


  return (
    `<div class="film-details__new-comment">
      <div for="add-emoji" class="film-details__add-emoji-label">
        ${createEmojiImgMarkup}
      </div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${newTextariaEmojValue}</textarea>
      </label>

      <div class="film-details__emoji-list">
        ${emojiListMarkup}
      </div>
    </div>
    `
  );
};

export default class NeWComment extends AbstractSmartComponent {
  constructor() {
    super();

    this._newTextariaEmojValue = ``;
    this._activeEmoji = ``;

    this._subscribeOnEvents();

    this._commentAddClickHandler = null;
  }

  getTemplate() {
    return createNewCommentTemplate(this._activeEmoji, this._newTextariaEmojValue);
  }

  recoveryListeners() {
    this._subscribeOnEvents();

    this.setCommentAddClickHandler(this._commentAddClickHandler);
  }

  rerender() {
    super.rerender();
  }

  reset() {
    this.clear();

    this.rerender();
  }

  clear() {
    this._newTextariaEmojValue = ``;
    this._activeEmoji = ``;
    emojis[0].isChecked = true;

  }

  showErrorBorder() {
    this.getElement().querySelector(`.film-details__comment-input`).style.border = `2px solid red`;
    setTimeout(() => {
      this.getElement().querySelector(`.film-details__comment-input`).style.border = 0;
    }, BORDER_ERROR_TIMEOUT);
  }

  setCommentAddClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`keydown`, handler);

    this._commentAddClickHandler = handler;
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    const emojisListElement = element.querySelector(`.film-details__emoji-list`);

    emojisListElement.addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `INPUT`) {
        return;
      }

      const clickedEmojiIndex = emojis.findIndex((emoji) => emoji.name === evt.target.value);

      emojis.map((emoji, index) => {
        if (clickedEmojiIndex === index) {
          emoji.isChecked = !emoji.isChecked;
          return emoji;
        } else {
          emoji.isChecked = false;
          return emoji;
        }
      });

      this._activeEmoji = evt.target.value;
      this._newTextariaEmojValue = encode(element.querySelector(`.film-details__comment-input`).value);

      this.rerender();
    });
  }

}

