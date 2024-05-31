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

export function searchName(str, data) {
  const resulst = data.filter((d) => {
    return d.taskName.toLowerCase().includes(str.toLowerCase());
  });

  return resulst;
}

export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

export const sortAtoZ = (data) => {
  data.sort(function (a, b) {
    var A = a.taskName.toUpperCase();
    var B = b.taskName.toUpperCase();
    return A < B ? -1 : A > B ? 1 : 0;
  });
};

export const freeze = (ms) =>
  new Promise((resolve) => setTimeout(() => resolve(), ms));
