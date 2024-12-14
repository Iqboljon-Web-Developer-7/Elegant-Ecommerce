import { Link, useNavigate } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { useEffect, useState } from "react";
import { userType } from "./Register";
import { client } from "@/utils/Client";

const Login = () => {
  const [user, setUser] = useState<userType>();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setLoading(true);
      client
        .fetch(
          `*[_type == "user" && username == '${user?.name}' || email == '${user?.name}' && password == '${user?.password}']`
        )
        .then((user) => {
          setLoading(false);
          if (user?.length > 0) {
            localStorage.setItem("userInfo", JSON.stringify(user[0]));
            setUser({});
            setTimeout(() => {
              navigate("/");
            }, 0);
          }
        });
    }
  }, [user]);

  return (
    <div>
      <h2 className="text-[2.5rem]">Sign In</h2>
      <p className="text-[#6C7275] mb-4">
        Already have an account?{" "}
        <Link to={"/auth/register"} className="text-[#38CB89]">
          Sign in
        </Link>
      </p>
      <LoginForm loading={loading} setUser={setUser} />
    </div>
  );
};

export default Login;
