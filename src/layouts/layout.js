import { Link, Outlet, useLocation } from "react-router-dom";
import Header from "./header";
import { AiOutlinePlus } from "react-icons/ai";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="relative">
      <Header />
      <div className="flex overflow-x-auto">
        {false ? (
          <>
            <div className="w-[100%] bg-black h-screen fixed top-0 z-30 opacity-[.6]"></div>
            <div className="w-[80%] h-screen bg-white fixed z-50 top-0">
              <p>1</p>
            </div>
          </>
        ) : null}

        <div className="w-[100%]">
          <Outlet />
        </div>
      </div>
      {location.pathname !== "/" ? null : (
        <Link
          to="create-task"
          className="fixed bottom-10 right-5 bg-blue-400 w-[50px] h-[50px] rounded-full flex justify-center items-center active:scale-[.9] transition-transform duration-[.3s] shadow-md shadow-zinc-400"
        >
          <AiOutlinePlus className="text-white text-xl" strokeWidth={20} />
        </Link>
      )}
    </div>
  );
}
