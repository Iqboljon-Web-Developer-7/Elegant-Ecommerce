import instagramIcon from "@/assets/icons/instagram.svg";
import facebookIcon from "@/assets/icons/facebook.svg";
import youtubeIcon from "@/assets/icons/youtube.svg";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 pt-10 md:pt-20">
      <div className="container pb-5 md:pb-12 mx-auto px-4 flex flex-col md:flex-row justify-between items-center border-b border-gray-700">
        <div className="flex gap-4 md:gap-8 flex-col md:flex-row items-center text-center md:text-left mb-4 md:mb-0">
          <p className="text-[1.5rem] font-medium text-white">3legant.</p>
          <div className="line self-stretch w-[.1px] bg-slate-600"></div>
          <span className="inter text-sm text-neutral-300">
            Gift & Decoration Store
          </span>
        </div>
        <ul className="flex-center flex-wrap gap-3 space-y-0 space-x-0 md:space-x-6 text-center inter">
          <li>
            <a href="#" className="text-sm hover:text-neutral-100">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-sm hover:text-neutral-100">
              Shop
            </a>
          </li>
          <li>
            <a href="#" className="text-sm hover:text-neutral-100">
              Product
            </a>
          </li>
          <li>
            <a href="#" className="text-sm hover:text-neutral-100">
              Blog
            </a>
          </li>
          <li>
            <a href="#" className="text-sm hover:text-neutral-100">
              Contact Us
            </a>
          </li>
        </ul>
      </div>
      <div className="container mb-8 mx-auto px-4 flex-center flex-wrap gap-7 md:justify-between items-center pt-4">
        <div className="flex-center flex-wrap gap-3 space-y-0 space-x-0 md:space-x-6 text-center">
          <p className="text-xs text-slate-300">
            © 2023 3legant. All rights reserved
          </p>
          <a href="#" className="text-sm hover:text-gray-400">
            Privacy Policy
          </a>
          <a href="#" className="text-sm hover:text-gray-400">
            Terms of Use
          </a>
        </div>
        <div className="flex space-x-4 justify-center mb-0">
          <a href="#" className="hover:text-gray-400">
            <img
              src={instagramIcon}
              alt="Instagram"
              className="w-6 h-6 invert brightness-0"
            />
          </a>
          <a href="#" className="hover:text-gray-400">
            <img
              src={facebookIcon}
              alt="Facebook"
              className="w-6 h-6 invert brightness-0"
            />
          </a>
          <a href="#" className="hover:text-gray-400">
            <img
              src={youtubeIcon}
              alt="YouTube"
              className="w-6 h-6 invert brightness-0"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
