import moment from "moment";
import {TIME} from "../const";

const ESC_KEYCODE = 27;

export const isEscEvent = (evt, action) => {
  if (evt.keyCode === ESC_KEYCODE) {
    action();
  }
};

export const formatTimeMinute = (timeInMinute) => moment(timeInMinute * TIME.SECUNDS_IN_MINUTE * TIME.MILISECONDS_IN_SECOND).format(`m`);

export const formatTimeHour = (timeInMinute) => moment(timeInMinute * TIME.SECUNDS_IN_MINUTE * TIME.MILISECONDS_IN_SECOND).format(`h`);

export const formatDate = (date) => moment(date).format(`DD MMMM YYYY`);

export const formatDateComment = (date) => moment(date).fromNow();


