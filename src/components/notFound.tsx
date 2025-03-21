import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import notFoundImage from "@/assets/not-found-404.jpg"
import { useEffect, useState } from "react";

const NotFound = () => {
  const navigate = useNavigate();
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
      style={{ backgroundImage: isBgImgVisible ? `url(${notFoundImage})` : "" }}
      className={`w-full h-screen py-10 px-2 flex flex-col items-center ${isBgImgVisible ? "justify-end" : "justify-center"}  bg-gray-100 text-center bg-cover bg-center`}>
      {
        !isBgImgVisible && (
          <>
            <img
              width={768}
              height={576}
              src={notFoundImage}
              alt="404 Not Found"
              className="max-w-3xl w-full mb-8 rounded-xl"
            />
            <p className="text-lg text-gray-600 text-center">
              The page you're looking for doesn't exist or has been moved. Go back to
              the homepage and try again.
            </p>
          </>
        )
      }

      <Button onClick={() => navigate("/")} className="mt-4">
        Home page
      </Button>
    </div>
  );
};

export default NotFound;
