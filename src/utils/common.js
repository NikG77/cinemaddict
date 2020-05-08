import moment from "moment";
import {TIME} from "../const";

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

export const formatTimeMinute = (timeInMinute) => moment(timeInMinute * TIME.SECUNDS_IN_MINUTE * TIME.MILISECONDS_IN_SECOND).format(`m`);

export const formatTimeHour = (timeInMinute) => moment(timeInMinute * TIME.SECUNDS_IN_MINUTE * TIME.MILISECONDS_IN_SECOND).format(`h`);

export const formatDate = (date) => moment(date).format(`DD MMMM YYYY`);

export const formatDateComment = (date) => moment(date).fromNow();

