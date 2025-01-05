import { SidebarProvider } from "./ui/sidebar";
import { HeaderSidebar } from "./Header/Sidebar";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";

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
