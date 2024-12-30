import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import { HeaderSidebar } from "./Header/Sidebar";
import { SidebarProvider } from "./ui/sidebar";
import Footer from "./Footer/Footer";

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
        <div className="container-2xl">
          <Footer />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
