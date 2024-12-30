import { FC } from "react";
import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";

interface StyledLinkTypes {
  destination: string;
  name: string;
  className?: string;
}

const StyledLink: FC<StyledLinkTypes> = ({ destination, name, className }) => {
  return (
    <Link
      to={destination}
      className={`text-base w-fit flex items-center gap-2 border-b border-b-neutral-900 ${className}`}
    >
      {name} <GoArrowRight />
    </Link>
  );
};

export default StyledLink;
