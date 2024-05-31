import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "./config/firebase";
import { collectName } from "./contants";
import { currentDate, generateId } from "./utils";

export const create = async function (data) {
  try {
    await addDoc(collection(db, collectName.taskList), {
      taskId: generateId(),
      taskName: data.taskName,
      level: data.level,
      isDone: false,
      indexLevel: data.indexLevel,
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
    const task = [];
    const querySnapshot = await getDocs(collection(db, collectName.taskList));

    querySnapshot.forEach((doc) => {
      if (doc.id === id) {
        task.push(doc.data());
      }
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

    await updateDoc(taskListDoc, {
      ...data,
    });
  } catch (err) {
    console.error(err);
  }
};
