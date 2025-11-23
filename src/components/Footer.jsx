// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import mWiseLogo from '../assets/mwise_logo.PNG';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className=" text-center">
          {/* Brand */}
          <div className="col-span-1 items-center mx-auto">
            <div className='flex items-center mx-auto justify-center'>
              <img src={mWiseLogo} alt="MrWiseCollection Logo" className="w-[100px] h-[100px] object-contain" />
              <h3 className="text-2xl font-thin text-black px-[15px] p-[5px] ml-[-15px] mb-[7px]">MrWiseCollection</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Premium designer tshirts, sneakers, and accessories for the fashion-forward individual.
            </p>
            <div className="flex text-center justify-center gap-[10px]">
              <div>
                <a href="#" className="text-gray-400 hover:text-black transition-colors">
                <Facebook size={20} />
              </a>
              </div>

              <div>
                <a href="#" className="text-gray-400 hover:text-black transition-colors">
                  <Twitter size={20} />
                </a>
              </div>
              <div>
                <a href="#" className="text-gray-400 hover:text-black transition-colors">
                  <Instagram size={20} />
                </a>
              </div>
              <div>
                <a href="#" className="text-gray-400 hover:text-black transition-colors">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          {/* <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div> */}

        

          {/* Newsletter */}
       
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} MrWiseCollection. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;