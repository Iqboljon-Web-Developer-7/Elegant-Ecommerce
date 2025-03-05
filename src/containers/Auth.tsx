import AuthImg from "@/assets/auth/authorization-bg.webp";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const Auth = () => {
  if (useLocation()?.pathname == "/auth")
    return <Navigate to={"/auth/login"} replace={true} />;

  return (
    <div style={{backgroundImage: `url(${AuthImg})`}} className="h-screen w-full flex items-center justify-between flex-col md:flex-row bg-slate-50 bg-cover bg-center">
      <img
        width={661}
        height={991}
        src={AuthImg}
        alt="auth-img"
        className="h-screen w-96 lg:w-auto hidden md:block flex-shrink object-cover
        "
      />
      <div className="flex-grow flex items-center justify-center min-w-80 w-full bg-[#00000077] md:bg-transparent">
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
