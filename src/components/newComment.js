import AbstractSmartComponent from "./abstract-smart-component";

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

const createNewCommentTemplate = (options) => {
  const {newElementImgEmojiSrc, newElementImgEmojiAlt, resetTextariaEmojValue} = options;

  const emojiListMarkup = emojis.map((emoji) => {
    return createEmojiListMarkup(emoji);
  }).join(`\n`);

  return (
    `<div class="film-details__new-comment">
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
    `
  );
};

export default class NeWComment extends AbstractSmartComponent {
  constructor() {
    super();

    this._newElementImgEmojiSrc = ``;
    this._newElementImgEmojiAlt = ``;
    this._resetTextariaEmojValue = ``;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createNewCommentTemplate({
      newElementImgEmojiSrc: this._newElementImgEmojiSrc,
      newElementImgEmojiAlt: this._newElementImgEmojiAlt,
      resetTextariaEmojValue: this._resetTextariaEmojValue,
    });
  }

  recoveryListeners() {
    this._subscribeOnEvents();

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


}
