import React from "react";
import { Link } from "react-router-dom";

type LinkProps = {
  to: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onClick?: any
};

const ScrollToTopLink = ({
  to,
  children,
  style,
  className,
  onClick
}: LinkProps) => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Link to={to} onClick={handleClick} style={style} className={className}>
      {children}
    </Link>
  );
};

export default ScrollToTopLink;
