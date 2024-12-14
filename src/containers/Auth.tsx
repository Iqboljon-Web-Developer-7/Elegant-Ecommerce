import { Outlet } from "react-router-dom";

import AuthImg from "@/assets/auth/auth-banner.jpg";

const Auth = () => {
  return (
    <div className="h-screen w-full flex items-center justify-between flex-col md:flex-row">
      <img src={AuthImg} alt="auth-img" className="h-screen hidden md:block" />
      <div className="flex-grow flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
