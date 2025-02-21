import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import notFoundImage from "@/assets/not-found-404.jpg"

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <img
        src={notFoundImage}
        alt="404 Not Found"
        className="h-auto mb-8 max-w-3xl w-full rounded-xl"
      />

      <p className="text-lg text-gray-600 text-center">
        The page you're looking for doesn't exist or has been moved. Go back to
        the homepage and try again.
      </p>
      <Button onClick={() => navigate("/")} className="mt-4">
        Home page
      </Button>
    </div>
  );
};

export default NotFound;
