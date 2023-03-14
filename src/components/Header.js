import React from "react";
import headerImg from "../assets/header.jfif";

const Header = ({ children }) => {
  return (
    <div
      className="w-full h-[300px] flex items-center text-gray-200 text-2xl  capitalize font-semibold"
      style={{
        backgroundImage: `url(${headerImg})`,
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(0,0,0,.4)",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="container mx-auto px-6">{children}</div>
    </div>
  );
};

export default Header;
