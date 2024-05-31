import uniqid from "uniqid";
import moment from "moment";

export const generateId = () => {
  return `${uniqid()}-${uniqid()}`;
};

export const currentDate = () => {
  const year = moment().get("year");
  const month = moment().get("month") + 1;
  const date = moment().get("date");
  const hour = moment().get("hour");
  const minute = moment().get("minute");

  return `${date}/${month}/${year} - ${hour}:${minute}`;
};

export function getPathSegment(url, index) {
  return url.split("/")[index];
}
