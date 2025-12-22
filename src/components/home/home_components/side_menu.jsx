import {
  ChartArea,
  MessageCircle,
  MessageSquare,
  MessageSquareText,
  Settings,
  UserIcon,
} from "lucide-react";
import { Link } from "react-router";

function SideMenu() {
  return (
    <section className="">
      <div className="flex flex-col justify-between h-screen p-2 bg-white shadow-lg border-r border-gray-300">
        <Link
          to={"/chats"}
          className="rounded-full hover:bg-gray-200 p-3 cursor-pointer"
        >
          <MessageSquareText size={25} />
        </Link>
        <div className="flex flex-col items-center">
          <Link
            to={"/settings"}
            className="rounded-full hover:bg-gray-200 p-3 cursor-pointer"
          >
            <Settings size={25} />
          </Link>
          <Link
            to={"/profile"}
            className="rounded-full hover:bg-gray-200 p-3 cursor-pointer"
          >
            <UserIcon size={25} />
          </Link>
        </div>
      </div>
    </section>
  );
}
export default SideMenu;
