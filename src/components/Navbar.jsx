// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import mWiseLogo from '../assets/mwise_logo.PNG';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartItemsCount } = useCart();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-pink-600"
            >
             <div className='flex items-center mx-auto justify-center'>
                           <img src={mWiseLogo} alt="MrWiseCollection Logo" className="w-[60px] h-[60px] object-contain" />
                           <h3 className="text-xl font-thin text-black px-[15px] p-[5px] ml-[-20px] ">MrWiseCollection</h3>
              </div>
            </motion.div>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {/* <Link to="/" className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium transition-colors">
                Home
              </Link> */}
              {/* <Link to="/products" className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium transition-colors">
                Products
              </Link> */}
              {/* <Link to="/" className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium transition-colors">
                Brands
              </Link>
              <Link to="/" className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium transition-colors">
                About
              </Link> */}
            </div>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-pink-600 p-2">
              <Search size={20} />
            </button>
            {/* <button className="text-gray-700 hover:text-pink-600 p-2">
              <User size={20} />
            </button> */}
            <Link to="/cart" className="relative text-gray-700 hover:text-pink-600 p-2">
              <ShoppingBag size={20} />
              {getCartItemsCount() > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-pink-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                >
                  {getCartItemsCount()}
                </motion.span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Link to="/cart" className="relative text-gray-700 p-2">
              <ShoppingBag size={20} />
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>
            {/* <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button> */}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="block text-gray-700 hover:text-pink-600 px-3 py-2 text-base font-medium">
              Home
            </Link>
            <Link to="/products" className="block text-gray-700 hover:text-pink-600 px-3 py-2 text-base font-medium">
              Products
            </Link>
            <Link to="/" className="block text-gray-700 hover:text-pink-600 px-3 py-2 text-base font-medium">
              Brands
            </Link>
            <Link to="/" className="block text-gray-700 hover:text-pink-600 px-3 py-2 text-base font-medium">
              About
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;