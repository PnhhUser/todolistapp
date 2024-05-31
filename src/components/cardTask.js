import { AiFillEdit, AiFillRest, AiOutlineFileDone } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LEVEL } from "../contants";
import { remove, update } from "../service";

export default function CardTask({
  taskListId,
  taskName,
  level,
  updateDateTask,
  task,
}) {
  let colorLevel = "";
  const [done, setDone] = useState(task.isDone);

  if (level === LEVEL.normal.text) {
    colorLevel = LEVEL.normal.textColor;
  }

  if (level === LEVEL.medium.text) {
    colorLevel = LEVEL.medium.textColor;
  }

  if (level === LEVEL.important.text) {
    colorLevel = LEVEL.important.textColor;
  }
  const handleCheckDone = (id) => {
    task.isDone = !task.isDone;
    update(id, task);
    setDone(task.isDone);
  };

  return (
    <div className="flex w-full h-[auto] shadow-md border-[1px] rounded-md mb-4 py-2">
      <div className="w-[90%] rounded-s-md">
        <div className="ps-4 pe-1 mt-1">
          <p className="text-sm font-bold">
            <span className={done ? "text-green-600" : "text-gray-500"}>
              {taskName} -
            </span>
            <span
              className={`capitalize ${done ? "text-green-600" : colorLevel}`}
              style={{ marginLeft: 4 }}
            >
              {level}
            </span>
            <Link className="inline-block" to={`/edit-task/${taskListId}`}>
              <AiFillEdit className="text-gray-400 text-sm active:scale-[.6] transition-transform duration-[.3s] inline ml-2" />
            </Link>
          </p>
        </div>
        <div className="ps-4">
          <p className="text-xs text-gray-400">{updateDateTask}</p>
        </div>
        {!done ? null : (
          <div className="ps-4">
            <p className="text-sm text-green-600 font-semibold capitalize">
              mission completed
            </p>
          </div>
        )}
      </div>
      <div className="w-[10%] h-[80px] rounded-e-lg">
        <div className="flex flex-col w-full h-full rounded-e-lg">
          <div
            className="w-full h-1/2  flex justify-center items-center rounded-tr-lg"
            onClick={() => handleCheckDone(taskListId)}
          >
            <AiOutlineFileDone className="text-xl active:text-gray-400 transition-colors duration-[.3s]" />
          </div>

          <div
            className="w-full h-1/2  flex justify-center items-center rounded-br-lg"
            onClick={() => remove(taskListId)}
          >
            <AiFillRest className="text-gray-400 text-sm active:scale-[.6] transition-transform duration-[.3s]" />
          </div>
        </div>
      </div>
    </div>
  );
}
