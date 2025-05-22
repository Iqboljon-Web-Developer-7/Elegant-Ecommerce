import { FC } from "react";
import { StyledLinkTypes } from "@/lib/types";
import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";

const StyledLink: FC<StyledLinkTypes> = ({ destination, name, className }) => {
  return (
    <Link
      to={destination}
      className={`w-fit flex-center gap-2 text-base border-b border-b-neutral-900 ${className}`}
    >
      {name} <GoArrowRight />
    </Link>
  );
};

export default StyledLink;
