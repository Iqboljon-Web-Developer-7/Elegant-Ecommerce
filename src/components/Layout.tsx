import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import { HeaderSidebar } from "./Header/Sidebar";

const Layout = () => {
  return (
    <main className="w-full container-xl">
      <Header />
      <HeaderSidebar />
      <div>
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
