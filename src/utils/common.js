import moment from "moment";
import {Timeout} from "../const";

const MINUTES_IN_HOUR = 60;

const KEYCODE = {
  ESC: 27,
  ENTER: 13,
};

export const isEscEvent = (evt, action) => {
  if (evt.keyCode === KEYCODE.ESC) {
    action();
  }
};

export const isCtrlOrCommandAndEnterEvent = (evt) => evt.ctrlKey && evt.keyCode === 13 || evt.metaKey && evt.keyCode === 13;

export const formatDate = (date) => moment(date).format(`DD MMMM YYYY`);

export const formatDateComment = (date) => moment(date).fromNow();

export const transformDuration = (minutes) => {
  const hour = Math.floor(minutes / MINUTES_IN_HOUR);
  const minute = minutes - MINUTES_IN_HOUR * hour;
  return [hour, minute];
};

export const shake = (element) => {
  element.style.animation = `shake ${Timeout.SHAKE_ANIMATION / 1000}s`;

  setTimeout(() => {
    element.style.animation = ``;
  }, Timeout.SHAKE_ANIMATION);
};

