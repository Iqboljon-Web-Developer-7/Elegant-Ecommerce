import { SidebarProvider } from "./ui/sidebar";
import { HeaderSidebar } from "./Header/Sidebar";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <SidebarProvider>
      <main className="w-full">
        <Header />
        <HeaderSidebar />
        <Outlet />
        <Footer />
      </main>
    </SidebarProvider>
  );
};

export default Layout;
