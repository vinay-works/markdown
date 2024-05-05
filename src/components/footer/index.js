// Footer.js
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center">
        <div className="text-center md:text-left mb-4 md:mb-0 text-sm font-Plus Jakarta San">
          <div className='ml-2 mr-2'>example.com is not affiliated with Google™ or any of its products</div>
          <div className="flex text-xl justify-center mt-8 md:mt-4">
            <a href="https://twitter.com/i/flow/login?redirect_after_login=%2FtypefloHQ" className="text-white hover:text-blue-500 mr-4"><FaFacebook /></a>
            <a href="https://twitter.com/typefloHQ" className="text-white hover:text-blue-500 mr-4"><FaTwitter /></a>
            <a href="#" className="text-white hover:text-blue-500"><FaInstagram /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
