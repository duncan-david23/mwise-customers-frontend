// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Motorbike, Shield, TrendingUp, Instagram, Facebook, ShoppingCart, MessageCircle } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import imgWise from '../assets/wise_heroImage.webp';
import whatsappIcon from '../assets/whatsapp.png';
import tikTokIcon from '../assets/tiktok.png';

const Home = () => {
  const { getFeaturedProducts } = useProducts();
  const { addToCart } = useCart();
  const featuredProducts = getFeaturedProducts();

  const handleWhatsAppOrder = (product) => {
    const message = `Hello! I would like to order:\n\n*${product.product_name}*\nPrice: GHC${product.product_price}\n\nPlease proceed with my order.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/233556664343?text=${encodedMessage}`, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Streetwear Style */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0">
          <img
            src={imgWise}
            alt="Urban Fashion Background"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/50"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-6xl lg:text-8xl font-bold mb-6 tracking-tighter"
            >
              MrWise
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">
                STREETWEAR
              </span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl lg:text-2xl text-gray-300 mb-8 font-light tracking-wider max-w-2xl mx-auto"
            >
              Premium designer t-shirts, hoodies and urban accessories crafted for the modern streetwear enthusiast.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/products"
                className="group bg-white text-black px-12 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 border-2 border-transparent hover:border-black"
              >
                SHOP THE DROP
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              {/* <Link
                to="/products?category=hoodies"
                className="group border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-3"
              >
                NEW HOODIES
              </Link> */}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Products - Streetwear Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tighter">
              FRESH DROPS
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light tracking-wide">
              Latest arrivals from our urban collection. Limited quantities available.
            </p>
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer bg-white border border-gray-200  rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 "
              >
                <div className="relative overflow-hidden  aspect-[3/4] ">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.product_images[0]}
                      alt={product.product_name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out md:mt-[1px] mt-[30px]"
                    />
                  </Link>
                  
                  {/* Category Badge */}
                  <div className="absolute top-2 left-2">
                    <span className="bg-white text-black px-2 py-1 text-xs font-medium rounded">
                      {product.product_categories?.[0]?.toUpperCase()}
                    </span>
                  </div>

                  {/* Stock Badge */}
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      product.product_stock > 10 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {product.product_stock > 10 ? 'In Stock' : 'Low Stock'}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <Link to={`/product/${product.id}`} className="block group">
                    <h3 className="text-sm lg:text-base font-medium text-gray-900 mb-2 group-hover:text-gray-600 transition-colors line-clamp-2">
                      {product.product_name}
                    </h3>
                  </Link>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-gray-900">
                      GHC{product.product_price}
                    </span>
                  </div>

                  {/* Colors Preview */}
                  <div className="flex items-center gap-1 mb-3">
                    <span className="text-xs text-gray-500">Colors:</span>
                    <div className="flex gap-1">
                      {product.product_colors?.slice(0, 3).map((color, index) => (
                        <div
                          key={index}
                          className="w-3 h-3 rounded-full border border-gray-300"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                      {product.product_colors?.length > 3 && (
                        <span className="text-xs text-gray-500">+{product.product_colors.length - 3}</span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="w-full bg-black text-white py-2 text-xs font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-1"
                    >
                      <ShoppingCart size={14} />
                      ADD TO CART
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleWhatsAppOrder(product);
                      }}
                      className="w-full  border cursor-pointer py-2 text-xs font-medium hover:scale-105 transition-all flex items-center justify-center gap-[10px]"
                    >
                      <img src={whatsappIcon} alt="WhatsApp" className="w-5 h-5" />
                      QUICK BUY
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 group"
            >
              VIEW ALL COLLECTIONS
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl lg:text-6xl font-bold mb-8 tracking-tighter">
                URBAN
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">
                  CULTURE
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 font-light tracking-wide leading-relaxed">
                Born from the streets, built for the bold. MrWise Collection represents the fusion of 
                urban culture and premium fashion. Every piece tells a story of authenticity, creativity, 
                and uncompromising quality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* <Link
                  to="/about"
                  className="border-2 border-white text-white px-8 py-3 font-bold text-sm hover:bg-white hover:text-black transition-all duration-300 rounded-lg text-center"
                >
                  OUR STORY
                </Link> */}
                <Link
                  to="/products"
                  className="border-2 border-red-500 text-red-500 px-8 py-3 font-bold text-sm hover:bg-red-500 hover:text-white transition-all duration-300 rounded-lg text-center"
                >
                  SHOP NOW
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="aspect-square bg-gradient-to-br from-red-500 to-yellow-500 rounded-lg"></div>
                <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg"></div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="aspect-square bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg"></div>
                <div className="aspect-square bg-gradient-to-br from-yellow-500 to-red-500 rounded-lg"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section - Streetwear Focused */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-4 tracking-tighter">
              WHY WE STAND OUT
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <TrendingUp className="w-12 h-12" />,
                title: "Limited Drops",
                description: "Exclusive designs released in limited quantities. Wear something truly unique and collectible."
              },
              {
                icon: <Shield className="w-12 h-12" />,
                title: "Premium Materials",
                description: "Only the finest fabrics and printing techniques. Built to last and maintain their quality."
              },
              {
                icon: <Motorbike className="w-12 h-12" />,
                title: "Fast Delivery",
                description: "Quick delivery across Ghana. Get your fresh gear when you need it most."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center group"
              >
                <div className="text-red-500 mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-light tracking-wide">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-4 tracking-tighter">
              SHOP BY STYLE
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "T-SHIRTS", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", href: "/products?category=tshirt" },
              { name: "HOODIES", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400", href: "/products?category=hoodies" },
              { name: "SNEAKERS", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", href: "/products?category=sneakers" },
              { name: "JEANS", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400", href: "/products?category=camo-jeans" }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer"
              >
                <Link to={category.href}>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold tracking-tight text-center">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-red-500 to-yellow-500 text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-5xl lg:text-6xl font-bold mb-6 tracking-tighter">
            JOIN THE
            <span className="block text-black">
              MOVEMENT
            </span>
          </h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto font-light tracking-wide">
            Be part of the urban fashion revolution. Limited drops, exclusive designs, and a community that sets trends.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="bg-black text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-white"
            >
              SHOP NOW
            </Link>
            {/* <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 border-2 border-transparent hover:border-black">
              NEWSLETTER
            </button> */}
          </div>
        </motion.div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-lg text-gray-300 mb-8 font-light tracking-wide">
              FOLLOW THE MOVEMENT • LATEST DROPS • EXCLUSIVE CONTENT
            </p>
            <div className="flex justify-center gap-8">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <img src={tikTokIcon} alt="Social Icon" className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <img src={whatsappIcon} alt="Social Icon" className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;