import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import Lottie from "react-lottie-player";
import notFoundImage from "@/assets/404-animation.json";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in bg-backgrounds-lightGreen flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <Lottie
        loop
        animationData={notFoundImage}
        play
        className="max-w-screen-sm mb-8 w-full"
      />

      <h4 className="font-bold mb-4 sm:text-5xl text-3xl text-gray-800">
        Page Not Found
      </h4>
      <Button
        onClick={() => navigate("/")}
        className="active:translate-y-1 duration-200 ease-in-out hover:shadow-none px-6 py-2 shadow-md transition-all"
      >
        Home page
      </Button>
    </div>
  );
};

export default NotFound;
