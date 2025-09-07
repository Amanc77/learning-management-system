import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className=" w-full bg-gray-900 text-gray-400 border-t border-gray-800">
      <div className="py-4 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 text-sm text-gray-500 px-25">
        <p className="text-center">
          © {new Date().getFullYear()} LMS. All Rights Reserved.
        </p>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <a
            href="https://github.com/Amanc77"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/amanc77/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors duration-200"
          >
            LinkedIn
          </a>

          <Link
            to="/contact"
            className="hover:text-green-400 transition-colors duration-200"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
