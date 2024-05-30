import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import uniqid from "uniqid";
import { db } from "./config/firebase";
import moment from "moment";

export const collectName = {
  taskList: "taskList",
};

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

export const create = async function (data) {
  try {
    await addDoc(collection(db, collectName.taskList), {
      taskId: generateId(),
      taskName: data.taskName,
      level: data.level,
      isDone: false,
      createDate: currentDate(),
      updateDate: currentDate(),
    });
    console.log("create data success");
  } catch (error) {
    console.log("Error:", error);
  }
};

export const getAll = async function () {
  try {
    const data = [];
    const querySnapshot = await getDocs(collection(db, collectName.taskList));
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    return data;
  } catch (error) {
    console.log("Error", error);
  }
};

export const remove = async function (taskId) {
  try {
    const taskListDoc = doc(db, collectName.taskList, taskId);

    await deleteDoc(taskListDoc);
    console.log("remove success");
  } catch (err) {
    console.error(err);
  }
};
