import { Outlet } from "react-router-dom";

import AuthImg from "@/assets/auth/auth-banner.jpg";

const Auth = () => {
  return (
    <div className="h-screen w-full flex items-center justify-between flex-col md:flex-row bg-slate-50">
      <img src={AuthImg} alt="auth-img" className="h-screen w-96 lg:w-auto hidden md:block flex-shrink object-cover" />
      <div className="flex-grow flex items-center justify-center min-w-80">
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
