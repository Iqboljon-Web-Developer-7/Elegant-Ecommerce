import { SidebarProvider } from "../ui/sidebar";
import Header from "../organisms/Header/Header";
import { HeaderSidebar } from "../organisms/Header/Sidebar";
import { Outlet } from "react-router-dom";
import Footer from "../organisms/Footer/Footer";
import { memo } from "react";

const Layout = () => {
  console.log("Layout rendering");

  return <SidebarProvider>
    <main className="w-full bg-backgrounds-worm-grey">
      <Header />
      <HeaderSidebar />
      <Outlet />
      <Footer />
    </main>
  </SidebarProvider>
}

export default memo(Layout);

