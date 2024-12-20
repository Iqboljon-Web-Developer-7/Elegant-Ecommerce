import { Calendar, Home, Inbox, Search } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { IoMdClose } from "react-icons/io";
import { SearchForm } from "./SidebarSearch";
import { Link, NavLink, useNavigate } from "react-router-dom";
import CartIcon from "@/assets/icons/cart.svg";
import { IoHeartOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import { CiInstagram } from "react-icons/ci";

import { FaRegCircleUser } from "react-icons/fa6";
import { RiFacebookFill } from "react-icons/ri";
import { PiYoutubeLogoLight } from "react-icons/pi";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Shop",
    url: "/shop",
    icon: Inbox,
  },
  {
    title: "Product",
    url: "/product",
    icon: Calendar,
  },
  {
    title: "Contact Us",
    url: "/contact",
    icon: Search,
  },
];

export function HeaderSidebar() {
  const { toggleSidebar } = useSidebar();

  const user = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null;

  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="h-full">
          <SidebarGroupLabel className="flex items-center justify-between text-black">
            Elegant
            <IoMdClose onClick={toggleSidebar} />
          </SidebarGroupLabel>
          <SearchForm />
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="border-b rounded-none py-5">
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <div className="h-full flex items-end">
            <div className="sidebar__links w-full flex flex-col">
              <NavLink
                to={"/cart"}
                className="flex items-center justify-between text-sm border-b py-2"
              >
                Cart
                <div className="flex items-center justify-center gap-1">
                  <img src={CartIcon} alt="cart-icon" className="max-w-5" />
                  <p className="w-4 h-4 rounded-full bg-black text-[.6rem] font-bold text-white flex items-center justify-center">
                    2
                  </p>
                </div>
              </NavLink>
              <NavLink
                to={"/wishlist"}
                className="flex items-center justify-between text-sm border-b py-2"
              >
                Wishlist
                <div className="flex items-center justify-center gap-1">
                  <IoHeartOutline className="text-xl" />
                  <p className="w-4 h-4 rounded-full bg-black text-[.6rem] font-bold text-white flex items-center justify-center">
                    2
                  </p>
                </div>
              </NavLink>
            </div>
          </div>
          {user ? (
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center justify-center gap-3">
                <FaRegCircleUser />
                <div>
                  <h4 className="text-sm">{user?.username}</h4>
                  <p className="text-xs">
                    {user?.email?.length > 20
                      ? user?.email.slice(0, 20)
                      : user?.email}
                  </p>
                </div>
              </div>
              <Button variant={"destructive"} onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          ) : (
            <Button onClick={() => navigate("/auth/login")} className="my-3">
              Sign In
            </Button>
          )}
          <div className="sidebar__links flex items-center gap-3 text-xl mt-2">
            <CiInstagram />
            <RiFacebookFill />
            <PiYoutubeLogoLight />
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
