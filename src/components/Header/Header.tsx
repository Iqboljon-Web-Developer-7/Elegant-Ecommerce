import { NavLink } from "react-router-dom";
import { SidebarTrigger } from "../ui/sidebar";

import WebsiteLogo from "@/assets/logo.svg";
import SearchIcon from "@/assets/icons/search.svg";
import UserIcont from "@/assets/icons/user.svg";
import CartIcon from "@/assets/icons/cart.svg";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/product", label: "Product" },
  { to: "/contact", label: "Contact Us" },
];

const Header = () => {
  const Links = navLinks.map(({ to, label }) => (
    <NavLink
      key={to}
      className={({ isActive }) =>
        isActive ? "text-black" : "text-neutral-400"
      }
      to={to}
    >
      {label}
    </NavLink>
  ));

  return (
    <header className="flex items-center justify-between py-4 px-2 md:px-0">
      <img src={WebsiteLogo} width={105} alt="website-logo" />
      <div className="header__links hidden md:flex items-center justify-center gap-6 text-sm">
        {Links}
      </div>
      <div className="header__icons flex items-center justify-center gap-2 md:gap-4">
        <img src={SearchIcon} alt="search-icon" className="hidden md:block" />
        <img src={UserIcont} alt="user-icon" className="hidden md:block" />
        <div className="flex items-center justify-center">
          <img src={CartIcon} alt="cart-icon" />
          <p className="w-5 h-5 rounded-full bg-black text-[.7rem] font-bold text-white flex items-center justify-center">
            2
          </p>
        </div>

        <SidebarTrigger className="text-2xl md:hidden" />
      </div>
    </header>
  );
};

export default Header;
