import { LoginForm } from "./LoginForm";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <h2 className="text-[2.5rem]">Sign In</h2>
      <p className="text-neutral-400 mb-4">
        Already have an account?{" "}
        <Link to={"/auth/register"} className="text-secondary-green">
          Sign in
        </Link>
      </p>
      <LoginForm />
    </div>
  );
};

export default Login;
