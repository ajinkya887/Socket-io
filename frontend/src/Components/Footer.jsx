import React from "react";

const Footer = () => {
  return (
    <footer className="w-full text-center mt-6 py-4 border-t border-gray-300 bg-white shadow-inner">
      <p className="text-sm text-gray-600">
        Made with{" "}
        <span role="img" aria-label="love" className="mx-1">
          ❤️
        </span>
        by <span className="font-medium text-indigo-600">Ajinkya</span>
      </p>
      <p className="text-xs text-gray-500 mt-1">
        © {new Date().getFullYear()} Socket.io. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
