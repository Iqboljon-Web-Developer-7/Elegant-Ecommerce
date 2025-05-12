import { LoginForm } from "./LoginForm";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <div className="mb-5">
        <h2 className="text-[2.5rem] text-neutral-50 md:text-black">Sign In</h2>
        <p className="text-neutral-200 md:text-neutral-400 mb-4 flex gap-4">
          Don’t have an accout yet? Sign Up?{" "}
          <Link to={"/auth/register"} className="text-secondary-green">
            Sign up
          </Link>
        </p>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
