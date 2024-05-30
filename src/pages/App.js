import { AiOutlineSearch } from "react-icons/ai";
import CardTask from "../components/cardTask";

export default function App() {
  return (
    <>
      <div className="px-6 relative">
        <input
          type="text"
          id="search-text"
          placeholder="Search"
          className="rounded-full w-full h-9 border-[1px] outline-0 indent-10 text-xs"
        />
        <AiOutlineSearch className="absolute top-[10px] left-10 text-gray-400 tracking-widest text-md" />
      </div>
      <div className="px-6">
        <div className="mt-6">
          <p className="text-sm capitalize text-gray-500 font-semibold">
            Tasks
          </p>
          <div className="mt-4">
            <CardTask />
          </div>
        </div>
      </div>
    </>
  );
}
