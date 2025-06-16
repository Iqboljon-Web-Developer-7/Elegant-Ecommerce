import AuthImg from "@/assets/auth/authorization-bg.webp";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const Auth = () => {
  if (useLocation()?.pathname == "/auth")
    return <Navigate to={"/auth/login"} replace={true} />;
  
  const [isBgImgVisible, setIsBgImgVisible] = useState(false);

  const checkWindowWidth = (width: number) => {
    if (width < 768) {
      setIsBgImgVisible(true);
    } else {
      setIsBgImgVisible(false);
    }
  }

  useEffect(() => {
    let windowWidth = window.innerWidth
    checkWindowWidth(windowWidth)
    window.addEventListener("resize", () => {
      checkWindowWidth(window.innerWidth)
    });
    return () => {
      window.removeEventListener("resize", () => {
        checkWindowWidth(window.innerWidth)
      });
    };
  }, []);

  return (
    <div
      style={{ backgroundImage: isBgImgVisible ? `url(${AuthImg})` : "" }}
      className="h-screen w-full flex items-center justify-between flex-col md:flex-row bg-cover bg-center bg-slate-100"
    >
      <img
        width={661}
        height={991}
        src={AuthImg}
        alt="auth-img"
        className="h-screen w-96 lg:w-auto hidden md:block flex-shrink object-cover"
      />
      <div className="flex-grow flex items-center justify-center sm:min-w-80 w-full bg-[#00000077] md:bg-transparent px-2">
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
