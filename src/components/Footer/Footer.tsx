import instagramIcon from "@/assets/icons/instagram.svg";
import facebookIcon from "@/assets/icons/facebook.svg";
import youtubeIcon from "@/assets/icons/youtube.svg";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-[2%] md:px-0 py-6 pt-10 md:pt-20">
      <div className="container pb-0 md:pb-12 mx-auto px-4 flex flex-col md:flex-row justify-between items-center border-b border-gray-700">
        <div className="flex gap-2 sm:gap-4 md:gap-8 flex-col md:flex-row items-center text-center md:text-left md:mb-0">
          <p className="text-[1.5rem] font-medium text-white">3legant.</p>
          <div className="mb-2 md:mb-0 line self-stretch h-[.1px] md:h-auto md:w-[.1px] w-6 mx-auto bg-slate-600"></div>
          <span className="inter text-xs sm:text-sm text-neutral-300">
            Gift & Decoration Store
          </span>
        </div>
        <ul className="text-center inter my-8 md:my-0 flex-center flex-wrap flex-col sm:flex-row gap-6 space-y-0 space-x-0 md:space-x-6">
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
      <div className="container mb-8 mx-auto px-4 flex-center flex-wrap flex-col-reverse md:flex-row gap-7 md:justify-between items-center pt-5">
        <div className="flex-center flex-wrap gap-y-7 gap-x-[7%] md:gap-x-0 md:gap-y-0 space-y-0 space-x-0 md:space-x-6 text-center text-xs">
          <p className="text-slate-300 order-1 md:order-[0]">
            Copyright © 2023 3legant. All rights reserved
          </p>
          <a href="#" className="hover:text-gray-400">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-400">
            Terms of Use
          </a>
        </div>
        <div className="flex space-x-4 justify-center">
          <a href="#" className="hover:text-gray-400">
            <img
              loading="lazy"
              src={instagramIcon}
              alt="Instagram"
              className="w-6 h-6 invert brightness-0"
            />
          </a>
          <a href="#" className="hover:text-gray-400">
            <img
              loading="lazy"
              src={facebookIcon}
              alt="Facebook"
              className="w-6 h-6 invert brightness-0"
            />
          </a>
          <a href="#" className="hover:text-gray-400">
            <img
              loading="lazy"
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
