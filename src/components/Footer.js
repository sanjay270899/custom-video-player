import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="bg-dark p-4">
      <Link to="/about" className="text-white px-2 text-decoration-none">
        About
      </Link>
      <Link to="/contact" className="text-white px-2 text-decoration-none">
        Contact
      </Link>
    </div>
  );
};
