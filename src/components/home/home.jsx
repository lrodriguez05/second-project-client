import { Outlet } from "react-router";
import Aside from "./home_components/aside.jsx";
import SideMenu from "./home_components/side_menu.jsx";

function Home() {
  return (
    <section className="grid grid-cols-[auto_auto_1fr] h-screen bg-slate-100">
      <SideMenu />
      <Aside />
      <main className="bg-gray-100 overflow-hidden">
        <Outlet />
      </main>
    </section>
  );
}

export default Home;
