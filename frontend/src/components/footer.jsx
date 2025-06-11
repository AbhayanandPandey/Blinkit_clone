import React from 'react';
import { FaFacebook, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="  bottom-0 left-0 w-full bg-white text-black shadow lg:h-24  z-50 pt-5 ">
      <div className="container mx-auto p-4 flex flex-col lg:flex-row justify-between items-center gap-4">
        <p>© All Rights Reserved 2025</p>
        <div className="flex items-center gap-4 text-2xl">
          <a href="#" className="text-blue-700 hover:-rotate-180 transition-transform">
            <FaFacebook />
          </a>
          <a href="#" className="text-black hover:-rotate-180 transition-transform">
            <FaGithub />
          </a>
          <a href="#" className="text-pink-500 hover:-rotate-180 transition-transform">
            <FaInstagram />
          </a>
          <a href="#" className="text-blue-600 hover:-rotate-180 transition-transform">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
