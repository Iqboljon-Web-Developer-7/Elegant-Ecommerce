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

import { SearchForm } from "./SidebarSearch";
import { Link, NavLink, useNavigate } from "react-router-dom";
import CartIcon from "@/assets/icons/cart.svg";
import { Button } from "../ui/button";

import UserIcon from "@/assets/icons/user.svg";
import InstagramIcon from "@/assets/icons/instagram.svg";
import FacebookIcon from "@/assets/icons/facebook.svg";
import YoutubeIcon from "@/assets/icons/youtube.svg";
import HeartIcon from "@/assets/icons/heart.svg";
import { useDispatch, useSelector } from "react-redux";
import { clearUserInfo } from "@/redux/slices/permamentData";

const items = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Shop",
    url: "/shop",
  },
  {
    title: "Product",
    url: "/product",
  },
  {
    title: "Contact Us",
    url: "/contact",
  },
];

export function HeaderSidebar() {
  const { toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const userInfo = useSelector((state: any) => state.PermanentData.userInfo);

  const dispatch = useDispatch()


  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="h-full">
          <SidebarGroupLabel className="flex items-center justify-between text-black">
            Elegant
            <span className="cursor-pointer" onClick={toggleSidebar}>
              X
            </span>
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
                  <img
                    src={HeartIcon}
                    alt="heart icon"
                    width={22}
                    height={22}
                  />
                  <p className="w-4 h-4 rounded-full bg-black text-[.6rem] font-bold text-white flex items-center justify-center">
                    2
                  </p>
                </div>
              </NavLink>
            </div>
          </div>
          {userInfo ? (
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center justify-center gap-3">
                <img src={UserIcon} alt="sidebar icon" />
                <div>
                  <h4 className="text-sm">{userInfo?.username}</h4>
                  <p className="text-xs">
                    {userInfo?.email?.length > 20
                      ? userInfo?.email.slice(0, 20)
                      : userInfo?.email}
                  </p>
                </div>
              </div>
              <Button variant={"destructive"} onClick={() => dispatch(clearUserInfo())}>
                Sign Out
              </Button>
            </div>
          ) : (
            <Button onClick={() => navigate("/auth/login")} className="my-3">
              Sign In
            </Button>
          )}
          <div className="sidebar__links flex items-center gap-3 text-xl mt-2">
            <img src={InstagramIcon} alt="sidebar icon" />
            <img src={FacebookIcon} alt="sidebar icon" />
            <img src={YoutubeIcon} alt="sidebar icon" />
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
