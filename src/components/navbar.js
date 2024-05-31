import {
  AiOutlineCheck,
  AiOutlineLogout,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { NavLink } from "react-router-dom";
import Logo from "../logo.svg";

export default function Navbar() {
  return (
    <div className="">
      <div className="py-2 flex items-center w-full mb-6">
        <div className="w-[55px] h-[55px] rounded-full bg-white border-[1px] ms-6 overflow-hidden">
          <img
            src={Logo}
            alt="not alt"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ms-3">
          <p className="text-md font-semibold"> hoang </p>
          <p className="text-xs text-gray-400"> hoang@gmail.com </p>
        </div>
      </div>
      <div className="py-2 w-full px-8">
        <ul>
          <li className="mb-3 bg-gray-200 p-2 rounded-md">
            <NavLink>
              <AiOutlineUnorderedList
                className="inline-block"
                fontSize={20}
                strokeWidth={10}
              />
              <span className="ms-3 text-xs capitalize font-semibold">
                list all
              </span>
            </NavLink>
          </li>
          <li className="mb-3 p-2">
            <NavLink>
              <AiOutlineCheck
                className="inline-block"
                fontSize={20}
                strokeWidth={10}
              />
              <span className="ms-3 text-xs capitalize font-semibold">
                completed
              </span>
            </NavLink>
          </li>
          <li className="mb-3 p-2">
            <NavLink>
              <AiOutlineLogout
                className="inline-block"
                fontSize={20}
                strokeWidth={10}
              />
              <span className="ms-3 text-xs capitalize font-semibold">
                logout
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
