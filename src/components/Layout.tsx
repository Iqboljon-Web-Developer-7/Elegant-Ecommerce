import { SidebarProvider } from "./ui/sidebar";
import { HeaderSidebar } from "./Header/Sidebar";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";
import React from "react";

const Layout = React.memo(() => {
  return (
    <SidebarProvider>
      <main className="w-full bg-backgrounds-wormGrey">
        <Header />
        <HeaderSidebar />
        <Outlet />
        <Footer />
      </main>
    </SidebarProvider>
  );
});

export default Layout;