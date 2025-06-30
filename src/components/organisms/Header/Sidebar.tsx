import { useMemo } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { SearchForm } from "./SidebarSearch";
import { Link, NavLink } from "react-router-dom";
import { Button } from "../../ui/button";
import { useSelector, useDispatch } from "react-redux";
import { clearUserInfo } from "@/redux/slices/permamentData";
import CartIcon from "@/assets/icons/cart.svg";
import HeartIcon from "@/assets/icons/heart.svg";
import UserIcon from "@/assets/icons/user.svg";
import InstagramIcon from "@/assets/icons/instagram.svg";
import FacebookIcon from "@/assets/icons/facebook.svg";
import YoutubeIcon from "@/assets/icons/youtube.svg";


export default function HeaderSidebar() {
  const userInfo = useSelector((state: any) => state.PermanentData.userInfo, (prev, next) => prev === next); // Memoized selector
  const { toggleSidebar } = useSidebar();
  const dispatch = useDispatch();

  const items = [
    { title: "Home", url: '/' },
    { title: "Shop", url: "/shop" },
    { title: "Product", url: "/product" },
    { title: "Contact Us", url: "/contact-us" },
  ];

  const MenuContents = items.map((item) => (
    <SidebarMenuItem key={item.url}>
      <SidebarMenuButton>
        <NavLink
          onClick={() => toggleSidebar()}
          to={item.url}
          className={({ isActive }) => `w-full ${isActive ? "text-black font-semibold" : "text-neutral-400"}`}
        >
          {item.title}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ))

  const userSection = useMemo(() => (
    userInfo ? (
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center justify-center gap-3">
          <img src={UserIcon} alt="sidebar icon" loading="lazy" width={24} height={24} />
          <div className="max-w-40">
            <p className="font-semibold truncate" title={userInfo?.username}>{userInfo?.username}</p>
            <p className="text-xs truncate" title={userInfo?.email}>{userInfo?.email}</p>
          </div>
        </div>
        <Button
          variant="destructive"
          className="text-xs px-3 py-1"
          onClick={() => dispatch(clearUserInfo())}
        >
          Sign Out
        </Button>
      </div>
    ) : (
      <Link
        to={"/auth/login"}
        className="bg-black rounded-md text-white px-3 py-2 text-sm text-center"
      >
        Sign In
      </Link>
    )
  ), [userInfo]);

  return (
    <Sidebar>
      <SidebarContent className="!max-w-2xs">
        <SidebarGroup className="h-full ">
          <SidebarGroupLabel className="flex items-center justify-between text-black text-base font-semibold">
            Elegant
            <span className="cursor-pointer text-lg" onClick={toggleSidebar}>×</span>
          </SidebarGroupLabel>
          <SearchForm />
          <SidebarGroupContent>
            <SidebarMenu>
              {MenuContents}
            </SidebarMenu>
          </SidebarGroupContent>
          <div className="h-full flex items-end">
            <div className="w-full flex flex-col">
              <NavLink
                to="/cart"
                className="flex items-center justify-between text-sm border-b py-2"
              >
                Cart
                <div className="flex items-center justify-center gap-1">
                  <img src={CartIcon} alt="cart-icon" className="max-w-5" loading="lazy" width={20} height={20} />
                  <p className="w-4 h-4 rounded-full bg-black text-[.6rem] font-bold text-white flex items-center justify-center">2</p>
                </div>
              </NavLink>
              <NavLink
                to="/wishlist"
                className="flex items-center justify-between text-sm border-b py-2"
              >
                Wishlist
                <div className="flex items-center justify-center gap-1">
                  <img src={HeartIcon} alt="heart icon" loading="lazy" width={22} height={22} />
                  <p className="w-4 h-4 rounded-full bg-black text-[.6rem] font-bold text-white flex items-center justify-center">2</p>
                </div>
              </NavLink>
            </div>
          </div>
          {userSection}
          <div className="flex items-center gap-3 mt-2">
            <img src={InstagramIcon} alt="sidebar icon" loading="lazy" width={20} height={20} />
            <img src={FacebookIcon} alt="sidebar icon" loading="lazy" width={20} height={20} />
            <img src={YoutubeIcon} alt="sidebar icon" loading="lazy" width={20} height={20} />
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}