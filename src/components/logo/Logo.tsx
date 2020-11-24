import React from "react";
import logo from "./logo.png";
interface ILogoProps {
  className: string;
}
const Logo: React.FC<ILogoProps> = ({ className }) => {
  return <img src={logo} alt="Woozir logo" className={className} />;
};

export default Logo;
