import { Link, useLocation } from "react-router-dom";
import { AiOutlineLeft, AiOutlineMenu } from "react-icons/ai";

export default function Header() {
  const location = useLocation();

  const title =
    location.pathname === "/create-task" ? "Create Task" : "List All";

  return (
    <div className="h-12 w-full flex items-center">
      <div className="w-[18%]">
        <div className="flex justify-center text-lg">
          {location.pathname === "/" ? (
            <AiOutlineMenu className="text-gray-700" />
          ) : (
            <Link to=".." relative="path">
              <AiOutlineLeft className="text-gray-700" />
            </Link>
          )}
        </div>
      </div>
      <div className="w-[82%]">
        <p className="capitalize text-md font-bold ps-20 text-gray-700">
          {title}
        </p>
      </div>
    </div>
  );
}
