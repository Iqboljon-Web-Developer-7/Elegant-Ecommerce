import { NavLink } from "react-router-dom";

import WebsiteLogo from "@/assets/header/website-logo.svg";
import SearchIcon from "@/assets/header/searchIcon.svg";
import UserIcont from "@/assets/header/userIcon.svg";
import CartIcon from "@/assets/header/cartIcon.svg";
import { SidebarTrigger } from "../ui/sidebar";

const Header = () => {
  return (
    <header className="flex items-center justify-between py-5 px-2">
      <img src={WebsiteLogo} alt="website-logo" />
      <div className="header__links hidden md:flex items-center justify-center gap-6 text-sm">
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-black" : "text-grey-500"
          }
          to={"/"}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-black" : "text-grey-500"
          }
          to={"/shop"}
        >
          Shop
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-black" : "text-grey-500"
          }
          to={"/product"}
        >
          Product
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-black" : "text-grey-500"
          }
          to={"/contact"}
        >
          Contact Us
        </NavLink>
      </div>
      <div className="header__icons flex items-center justify-center gap-2 md:gap-4">
        <img src={SearchIcon} alt="search-icon" className="hidden md:block" />
        <img src={UserIcont} alt="user-icon" className="hidden md:block" />
        <div className="flex items-center justify-center">
          <img src={CartIcon} alt="cart-icon" />
          <p className="w-5 h-5 rounded-full bg-black-800 text-[.7rem] font-bold text-white flex items-center justify-center">
            2
          </p>
        </div>

        <SidebarTrigger className="text-2xl md:hidden" />
      </div>
    </header>
  );
};

export default Header;
