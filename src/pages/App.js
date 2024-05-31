import { AiOutlineSearch, AiOutlineSortAscending } from "react-icons/ai";
import CardTask from "../components/cardTask";
import { useEffect, useState } from "react";
import { collectName } from "../contants";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { debounce, searchName, sortAtoZ } from "../utils";

export default function App() {
  const [taskList, setTaskList] = useState([]);
  const [search, setSearch] = useState("");
  const [isSort, setIsSort] = useState(false);

  const handleSort = () => {
    setIsSort(!isSort);
  };

  useEffect(() => {
    let tasks = [];
    const unsubscribe = onSnapshot(
      collection(db, collectName.taskList),
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            tasks.push({ ...change.doc.data(), id: change.doc.id });
            const searchTaskList = searchName(search, tasks);

            if (isSort) {
              sortAtoZ(tasks);
            }

            if (search.length === 0) {
              setTaskList([...tasks]);
            } else {
              setTaskList(searchTaskList);
            }
          }

          if (change.type === "modified") {
          }

          if (change.type === "removed") {
            const newData = tasks.filter(
              (task) => task.taskId !== change.doc.data().taskId
            );
            tasks = [...newData];
            setTaskList(tasks);
          }
        });
      }
    );

    return () => {
      unsubscribe();
    };
  }, [search, isSort]);

  const handleSearch = (e) => {
    let value = e.target.value;
    setSearch(value);
  };

  const debouncedHandleChange = debounce(handleSearch, 500);

  return (
    <>
      <div className="px-6 relative">
        <input
          onChange={debouncedHandleChange}
          type="text"
          id="search-text"
          placeholder="Search"
          className="rounded-full w-full h-9 border-[1px] outline-0 indent-10 text-xs"
        />
        <AiOutlineSearch className="absolute top-[10px] left-10 text-gray-400 tracking-widest text-md" />
      </div>
      <div className="px-6 mt-6 flex items-center w-full h-10 justify-between">
        <p className="text-sm capitalize text-gray-500 font-semibold">Tasks</p>
        <div onClick={handleSort}>
          <AiOutlineSortAscending
            fontSize={20}
            className="text-gray-500 me-[10px]"
          />
        </div>
      </div>
      <div className="px-6">
        {taskList.length === 0 ? (
          <div className="mt-4">
            <div className="w-full flex justify-center h-[500px] items-center text-gray-300">
              <svg
                className="svg-icon"
                style={{
                  width: "10em",
                  height: "10em",
                  verticalAlign: "middle",
                  fill: "currentColor",
                  overflow: "hidden",
                }}
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M855.6 427.2H168.5c-12.7 0-24.4 6.9-30.6 18L4.4 684.7C1.5 689.9 0 695.8 0 701.8v287.1c0 19.4 15.7 35.1 35.1 35.1H989c19.4 0 35.1-15.7 35.1-35.1V701.8c0-6-1.5-11.8-4.4-17.1L886.2 445.2c-6.2-11.1-17.9-18-30.6-18zM673.4 695.6c-16.5 0-30.8 11.5-34.3 27.7-12.7 58.5-64.8 102.3-127.2 102.3s-114.5-43.8-127.2-102.3c-3.5-16.1-17.8-27.7-34.3-27.7H119c-26.4 0-43.3-28-31.1-51.4l81.7-155.8c6.1-11.6 18-18.8 31.1-18.8h622.4c13 0 25 7.2 31.1 18.8l81.7 155.8c12.2 23.4-4.7 51.4-31.1 51.4H673.4zM819.9 209.5c-1-1.8-2.1-3.7-3.2-5.5-9.8-16.6-31.1-22.2-47.8-12.6L648.5 261c-17 9.8-22.7 31.6-12.6 48.4 0.9 1.4 1.7 2.9 2.5 4.4 9.5 17 31.2 22.8 48 13L807 257.3c16.7-9.7 22.4-31 12.9-47.8zM375.4 261.1L255 191.6c-16.7-9.6-38-4-47.8 12.6-1.1 1.8-2.1 3.6-3.2 5.5-9.5 16.8-3.8 38.1 12.9 47.8L337.3 327c16.9 9.7 38.6 4 48-13.1 0.8-1.5 1.7-2.9 2.5-4.4 10.2-16.8 4.5-38.6-12.4-48.4zM512 239.3h2.5c19.5 0.3 35.5-15.5 35.5-35.1v-139c0-19.3-15.6-34.9-34.8-35.1h-6.4C489.6 30.3 474 46 474 65.2v139c0 19.5 15.9 35.4 35.5 35.1h2.5z" />
              </svg>
            </div>
          </div>
        ) : (
          <div className="mt-4">
            {taskList?.map((task) => {
              return (
                <div key={task.taskId}>
                  <CardTask
                    taskListId={task.id}
                    taskName={task.taskName}
                    level={task.level}
                    updateDateTask={task.updateDate}
                    task={task}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
