import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { SearchForm } from "./SidebarSearch";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import { useSelector, useDispatch } from "react-redux";
import { clearUserInfo } from "@/redux/slices/permamentData";
import { useMemo, useState, useEffect } from "react";
import CartIcon from "@/assets/icons/cart.svg";
import HeartIcon from "@/assets/icons/heart.svg";
import UserIcon from "@/assets/icons/user.svg";
import InstagramIcon from "@/assets/icons/instagram.svg";
import FacebookIcon from "@/assets/icons/facebook.svg";
import YoutubeIcon from "@/assets/icons/youtube.svg";

const items = [
  { title: "Home", url: "/" },
  { title: "Shop", url: "/shop" },
  { title: "Product", url: "/product" },
  { title: "Contact Us", url: "/contact" },
];

export function HeaderSidebar() {
  const { toggleSidebar, open } = useSidebar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state.PermanentData.userInfo, (prev, next) => prev === next); // Memoized selector
  const [loadImages, setLoadImages] = useState(false);

  // Load images only when sidebar is open for faster initial page load
  useEffect(() => {
    if (open) {
      setLoadImages(true);
    }
  }, [open]);

  // Memoize userInfo rendering to avoid unnecessary re-renders
  const userSection = useMemo(() => (
    userInfo ? (
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center justify-center gap-3">
          {loadImages && <img src={UserIcon} alt="sidebar icon" loading="lazy" width={20} height={20} />}
          <div>
            <h4 className="text-sm">{userInfo?.username}</h4>
            <p className="text-xs">{userInfo?.email?.slice(0, 20)}</p>
          </div>
        </div>
        <Button
          variant="destructive"
          className="text-xs px-2 py-1"
          onClick={() => dispatch(clearUserInfo())}
        >
          Sign Out
        </Button>
      </div>
    ) : (
      <Button
        onClick={() => navigate("/auth/login")}
        className="my-3 text-xs px-2 py-1"
      >
        Sign In
      </Button>
    )
  ), [userInfo, dispatch, navigate, loadImages]);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="h-full">
          <SidebarGroupLabel className="flex items-center justify-between text-black text-base font-semibold">
            Elegant
            <span className="cursor-pointer text-lg" onClick={toggleSidebar}>×</span>
          </SidebarGroupLabel>
          <SearchForm />
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="border-b rounded-none py-3 text-sm">
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
                  {loadImages && <img src={CartIcon} alt="cart-icon" className="max-w-5" loading="lazy" width={20} height={20} />}
                  <p className="w-4 h-4 rounded-full bg-black text-[.6rem] font-bold text-white flex items-center justify-center">2</p>
                </div>
              </NavLink>
              <NavLink
                to="/wishlist"
                className="flex items-center justify-between text-sm border-b py-2"
              >
                Wishlist
                <div className="flex items-center justify-center gap-1">
                  {loadImages && <img src={HeartIcon} alt="heart icon" loading="lazy" width={22} height={22} />}
                  <p className="w-4 h-4 rounded-full bg-black text-[.6rem] font-bold text-white flex items-center justify-center">2</p>
                </div>
              </NavLink>
            </div>
          </div>
          {userSection}
          <div className="flex items-center gap-3 mt-2">
            {loadImages && (
              <>
                <img src={InstagramIcon} alt="sidebar icon" loading="lazy" width={20} height={20} />
                <img src={FacebookIcon} alt="sidebar icon" loading="lazy" width={20} height={20} />
                <img src={YoutubeIcon} alt="sidebar icon" loading="lazy" width={20} height={20} />
              </>
            )}
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}