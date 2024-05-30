import { Form, redirect, useNavigation, useParams } from "react-router-dom";
import Select from "react-select";
import { create, getById } from "../utils";
import { useEffect, useState } from "react";

const freeze = (ms) =>
  new Promise((resolve) => setTimeout(() => resolve(), ms));

export const action = async function ({ param, request }) {
  let formData = await request.formData();
  let taskName = formData.get("taskName");
  let level = formData.get("level");

  if (taskName.length > 0) {
    await freeze(2000);
    create({ taskName: taskName, level: level });
    return redirect("/");
  }

  return null;
};

export const loader = async function () {
  return null;
};

const options = [
  { value: "normal", label: "normal" },
  { value: "medium", label: "medium" },
  { value: "important", label: "important" },
];

export default function EditTask() {
  const navigation = useNavigation();
  const param = useParams();
  const [data, setData] = useState([]);
  const [selectIndex, setSelectIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const taskData = await getById(param.taskId);

      setData([...taskData]);
      setSelectIndex(options.map((o) => o.value).indexOf(taskData[0].level));
    }

    fetchData();
  }, [param]);

  return (
    <div className="px-6 h-[660px] relative">
      <Form method="post" className="mt-8">
        <input
          type="text"
          name="taskName"
          placeholder="task name"
          className="capitalize text-sm border-[1px] outline-0 w-full h-10 rounded-md indent-4 mb-4"
          defaultValue={data[0]?.taskName}
        />
        <div className="mb-4">
          <p className="text-xs capitalize mb-2 text-gray-500">level task</p>
          <Select
            options={options}
            className="capitalize text-sm"
            name="level"
            defaultValue={options[selectIndex]}
          />
        </div>

        <div className="absolute bottom-10 left-0 w-full px-6">
          <button
            type="submit"
            className="w-full h-10 bg-blue-400 text-white rounded-md capitalize text-sm active:scale-[.95] transition-transform duration-[.3s]"
          >
            {navigation.state === "submitting" ? (
              <svg
                aria-hidden="true"
                role="status"
                className="inline mr-2 w-4 h-4 text-gray-200 animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#1C64F2"
                ></path>
              </svg>
            ) : (
              "edit task"
            )}
          </button>
        </div>
      </Form>
    </div>
  );
}
