import { SidebarProvider } from "../ui/sidebar";
import Header from "../organisms/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../organisms/Footer/Footer";
import { lazy } from "react";
const HeaderSidebar = lazy(() => import("../organisms/Header/Sidebar"));

const Layout = () => {
  const isHeaderSideBar = !window.matchMedia("(min-width: 768px)").matches

  return <SidebarProvider>
    <main className="w-full bg-backgrounds-worm-grey">
      <Header />
      {isHeaderSideBar && <HeaderSidebar />}
      <Outlet />
      <Footer />
    </main>
  </SidebarProvider>
}

export default Layout

