import { AiFillEdit, AiFillRest, AiOutlineFileDone } from "react-icons/ai";
import { remove } from "../utils";

const LEVEL = {
  normal: {
    textColor: "text-sky-500",
    text: "normal",
  },
  medium: {
    textColor: "text-orange-500",
    text: "medium",
  },
  important: {
    textColor: "text-red-500",
    text: "important",
  },
};

export default function CardTask({
  taskListId,
  taskName,
  level,
  updateDateTask,
}) {
  let colorLevel = "";

  if (level === LEVEL.normal.text) {
    colorLevel = LEVEL.normal.textColor;
  }

  if (level === LEVEL.medium.text) {
    colorLevel = LEVEL.medium.textColor;
  }

  if (level === LEVEL.important.text) {
    colorLevel = LEVEL.important.textColor;
  }

  return (
    <div className="flex w-full h-[80px] shadow-md border-[1px] rounded-md mb-4">
      <div className="w-[90%] rounded-s-md">
        <div className="ps-4 mt-1">
          <p className="text-sm capitalize font-bold">
            <span className="text-gray-500">{taskName} - </span>
            <span className={colorLevel}>{level}</span>
            <span>
              <AiFillEdit className="text-gray-400 text-sm active:scale-[.6] transition-transform duration-[.3s] inline ml-2" />
            </span>
          </p>
        </div>
        <div className="ps-4">
          <p className="text-xs text-gray-400">{updateDateTask}</p>
        </div>
      </div>
      <div className="w-[10%] rounded-e-lg">
        <div className="flex flex-col w-full h-full rounded-e-lg">
          <div className="w-full h-1/2  flex justify-center items-center rounded-tr-lg">
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
