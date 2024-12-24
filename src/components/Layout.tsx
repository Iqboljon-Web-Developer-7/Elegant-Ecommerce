import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import { HeaderSidebar } from "./Header/Sidebar";
import { SidebarProvider } from "./ui/sidebar";

const Layout = () => {
  return (
    <SidebarProvider>
      <main className="w-full container-xl">
        <Header />
        <HeaderSidebar />
        <div>
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
