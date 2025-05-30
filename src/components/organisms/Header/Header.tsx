import { useEffect, useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { SidebarTrigger } from "../../ui/sidebar";
import WebsiteLogo from "@/assets/logo.svg";
import SearchIcon from "@/assets/icons/search.svg";
import UserIcon from "@/assets/icons/user.svg";
import CartIcon from "@/assets/icons/cart.svg";
import { Button } from "../../ui/button";
import { SANITY_USER_WISHLIST } from "@/utils/Data";
import { client } from "@/utils/Client";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { clearUserInfo } from "@/redux/slices/permamentData";

interface UserInfo {
  _id: string;
  // Add other user properties here
}

interface PermanentDataState {
  userInfo: UserInfo | null;
}

interface RootState {
  PermanentData: PermanentDataState;
}

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/product", label: "Product" },
  { to: "/contact-us", label: "Contact Us" },
];

const Header = () => {
  const [userWishlist, setUserWishlist] = useState([]);
  const userInfo = useSelector((state: RootState) => state.PermanentData.userInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (userInfo) {
        try {
          // Fetch initial data
          if (!userWishlist.length) {
            const result = await client.fetch(
              SANITY_USER_WISHLIST(userInfo._id)
            );
            setUserWishlist(result?.items || []);
          }

          // real-time updates
          const realTimeWishlistUpdate = client
            .listen(SANITY_USER_WISHLIST(userInfo._id))
            .subscribe((update) => {
              if (update.result) {
                setUserWishlist(update.result.items);
              }
            });

          // Cleanup real-time updates on component unmount
          return () => realTimeWishlistUpdate.unsubscribe();
        } catch (error) {
          console.error("Error fetching or subscribing to wishlist:", error);
        }
      }
    };

    fetchData();
  }, []);

  const Links = useMemo(
    () =>
      navLinks.map(({ to, label }) => (
        <NavLink
          key={to}
          className={({ isActive }) =>
            isActive ? "text-black" : "text-neutral-400"
          }
          to={to}
        >
          {label}
        </NavLink>
      )),
    []
  );

  return (
    <header className="py-3 md:py-4 px-2 md:px-1 border-b border-neutral-200">
      <div className="container-xl flex items-center justify-between">
        <Link to={"/"}>
          <img
            src={WebsiteLogo}
            width={105}
            height={24}
            alt="website-logo"
            className="w-[4.5rem] sm:w-[6.5rem]"
          />
        </Link>
        <div className="header__links hidden md:flex items-center justify-center gap-6 lg:gap-10 text-sm">
          {Links}
        </div>
        <div className="header__icons flex items-center justify-center gap-4 md:gap-4">
          <Link to={"/search"} aria-label="Search products">
            <img
              src={SearchIcon}
              alt="Search button"
              className="hidden md:block"
            />
          </Link>
          {userInfo ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <img
                    src={UserIcon}
                    alt="user-icon"
                    className="hidden md:block"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="text-red-500 hover:!bg-red-500 hover:!text-white">
                    <AlertDialog>
                      <AlertDialogTrigger
                        className="w-full text-left"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                          e.stopPropagation()
                        }
                      >
                        Log out
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="Inter tracking-wide">
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => dispatch(clearUserInfo())}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuItem>
                  <Link to={"/user/settings"}>
                    <DropdownMenuItem className="hover:cursor-pointer">
                      Settings
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex items-center justify-center gap-1">
                <img src={CartIcon} alt="cart-icon" />
                {userWishlist?.length > 0 && (
                  <p className="w-5 h-5 rounded-full bg-black text-[.7rem] font-semibold text-white flex items-center justify-center">
                    {userWishlist.length}
                  </p>
                )}
              </div>
            </>
          ) : (
            <Link to={"/auth/login"}>
              <Button>Sign in</Button>
            </Link>
          )}
          <SidebarTrigger className="text-2xl md:hidden" />
        </div>
      </div>
    </header>
  );
};

export default Header;
