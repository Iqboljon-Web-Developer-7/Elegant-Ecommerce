import { Link } from "react-router-dom";
import { RegisterForm } from "./RegisterForm";

const Register = () => {
  return (
    <div>
      <h2 className="text-[2.5rem] text-neutral-50 md:text-black">Sign Up</h2>
      <p className="text-neutral-200 md:text-neutral-400 mb-4">
        Already have an account?{" "}
        <Link to={"/auth/login"} className="text-secondary-green">
          Sign in
        </Link>
      </p>

      <RegisterForm />
    </div>
  );
};

export default Register;
