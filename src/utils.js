import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  query,
  updateDoc,
  where,
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

export function getPathSegment(url, index) {
  return url.split("/")[index];
}

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

export const getById = async function (id) {
  try {
    const q = query(
      collection(db, collectName.taskList),
      where("id", "==", id)
    );
    const task = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      task.push(doc.data());
    });

    return task;
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

export const update = async function (id, data) {
  try {
    const taskListDoc = doc(db, collectName.taskList, id);

    data.isDone = !data.isDone;

    await updateDoc(taskListDoc, {
      ...data,
    });
  } catch (err) {
    console.error(err);
  }
};
