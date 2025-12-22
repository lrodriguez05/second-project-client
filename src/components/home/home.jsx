import { Outlet } from "react-router";
import Aside from "./home_components/aside.jsx";
import SideMenu from "./home_components/side_menu.jsx";
import { useEffect } from "react";
import { disconnectSocket, initSocket } from "../../config/socket.js";

function Home() {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const socket = initSocket(token);
      socket.on("connect", () => {
        console.log("🟢 socket conectado", socket.id);
      });
    }

    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <section className="grid grid-cols-[auto_auto_1fr] h-screen bg-slate-100 border border-gray-300">
      <SideMenu />
      <Aside />
      <main className="bg-gray-100 overflow-hidden w-full min-w-100">
        <Outlet />
      </main>
    </section>
  );
}

export default Home;
