import { Link, Outlet, useLocation } from "react-router-dom";
import Header from "./header";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import Navbar from "../components/navbar";

export default function Layout() {
  const location = useLocation();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [animationStyle, setAnimationStyle] = useState("animation-left");

  const onMenu = () => {
    setIsOpenMenu(true);
  };

  const handleClose = () => {
    setAnimationStyle("animation-right");

    setTimeout(() => {
      setIsOpenMenu(false);
      setAnimationStyle("animation-left");
    }, 700);
  };

  return (
    <div className="relative">
      {location.pathname === "/login" ||
      location.pathname === "/register" ? null : (
        <Header onMenu={onMenu} />
      )}
      <div className="flex overflow-x-auto">
        {isOpenMenu ? (
          <>
            <div
              className="w-[100%] bg-black h-screen fixed top-0 z-30 opacity-[.6]"
              onClick={handleClose}
            ></div>
            <div
              className={`w-[80%] h-screen bg-white fixed z-50 top-0 ${animationStyle}`}
            >
              <div className="w-full h-full flex flex-col bg-gray-50">
                <div
                  className="w-full h-8 flex justify-end items-center text-gray-400"
                  onClick={handleClose}
                >
                  <AiOutlineClose className="me-2" />
                </div>
                <div className="w-full">
                  <Navbar />
                </div>
              </div>
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
