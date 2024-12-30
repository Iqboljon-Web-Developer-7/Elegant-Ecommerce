import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import { HeaderSidebar } from "./Header/Sidebar";
import { SidebarProvider } from "./ui/sidebar";

const Layout = () => {
  return (
    <SidebarProvider>
      <main className="w-full">
        <div className="container-xl">
          <Header />
          <HeaderSidebar />
        </div>
        <div>
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
