import { Link } from "react-router-dom";
import instagramIcon from "@/assets/icons/instagram.svg";
import facebookIcon from "@/assets/icons/facebook.svg";
import youtubeIcon from "@/assets/icons/youtube.svg";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/product", label: "Product" },
  { to: "/blog", label: "Blog" },
  { to: "/contact-us", label: "Contact Us" },
];

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-use", label: "Terms of Use" },
];

const Footer = () => {
  return (
    <footer className="bg-black text-white px-2 md:px-0 py-6 pt-10 md:pt-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between pb-0 md:pb-12 border-b border-gray-700">
        <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-2 sm:gap-4 md:gap-8 mb-4 md:mb-0">
          <p className="text-2xl font-medium text-white">3legant.</p>
          <div className="hidden md:block w-px h-6 mx-4 bg-gray-600" />
          <span className="text-sm text-gray-400">Gift & Decoration Store</span>
        </div>
        <nav
          aria-label="Footer navigation"
          className="flex flex-col sm:flex-row gap-4 md:gap-6 my-6 md:my-0 text-center"
        >
          {navLinks.map((link) => (
            <li key={link.label} className="list-none">
              <Link
                to={link.to}
                className="text-sm hover:text-gray-200 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </nav>
      </div>
      <div className="container mx-auto px-4 mb-8 pt-5 flex flex-col md:flex-row items-center justify-between gap-7 md:gap-0">
        <div className="flex flex-col md:flex-row gap-4 text-center text-xs">
          <p className="text-gray-400 mb-2 md:mb-0">
            Copyright © 2023 3legant. All rights reserved
          </p>
          {legalLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-gray-400 hover:text-gray-200"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex justify-center space-x-4 mt-4 md:mt-0">
          <Link
            to="https://instagram.com"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200"
          >
            <img
              loading="lazy"
              src={instagramIcon}
              alt="Instagram Icon"
              width="24"
              height="24"
              className="invert brightness-0 h-6 w-6"
            />
          </Link>
          <Link
            to="https://facebook.com"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200"
          >
            <img
              loading="lazy"
              src={facebookIcon}
              alt="Facebook Icon"
              width="24"
              height="24"
              className="invert brightness-0 h-6 w-6"
            />
          </Link>
          <Link
            to="https://youtube.com"
            aria-label="YouTube"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200"
          >
            <img
              loading="lazy"
              src={youtubeIcon}
              alt="YouTube Icon"
              width="24"
              height="24"
              className="invert brightness-0 h-6 w-6"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
