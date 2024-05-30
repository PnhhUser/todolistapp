import { Link, Outlet, useLocation } from "react-router-dom";
import Header from "./header";
import { AiOutlinePlus } from "react-icons/ai";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="relative">
      <Header />
      <Outlet />
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
