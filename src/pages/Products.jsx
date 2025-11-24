// src/pages/Products.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, List, Search, ChevronDown, ShoppingCart, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext'; // Fixed import name
import whatsappIcon from '../assets/whatsapp.png';

const Products = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortOpen, setSortOpen] = useState(false);
  const { addToCart } = useCart();
  const {
    categories,
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    loading,
  } = useProducts();

  const handleWhatsAppOrder = (product) => {
    const message = `Hello! I would like to order:\n\n*${product.name}*\nPrice: GHC${product.price}\n\nPlease proceed with my order.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/233533261002?text=${encodedMessage}`, '_blank');
  };

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'name', label: 'Name: A-Z' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ];

  // Debug logging
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <section className="py-8 lg:py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-3xl lg:text-5xl font-bold mb-4 tracking-tight">
              COLLECTION
            </h1>
            <p className="text-gray-600 text-sm lg:text-lg max-w-2xl mx-auto font-light">
              Premium streetwear and urban fashion essentials
            </p>
          </motion.div>
        </div>
      </section>

      {/* Minimal Controls - Mobile Optimized */}
      <section className="py-4 lg:py-8 border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-6">
            {/* Categories - Mobile Scrollable */}
            <div className="w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
              <div className="flex gap-1 min-w-max">
                {categories?.map(category => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                    }}
                    className={`px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium transition-all duration-300 border-b-2 whitespace-nowrap ${
                      selectedCategory === category.id
                        ? 'border-black text-black'
                        : 'border-transparent text-gray-500 hover:text-black'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Search and Controls - Mobile Stacked */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-6">
              {/* Search - Full width on mobile */}
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors w-full sm:w-48 lg:w-64"
                />
              </div>

              {/* Sort and View - Side by side on mobile */}
              <div className="flex items-center gap-3">
                {/* Sort Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setSortOpen(!sortOpen)}
                    className="flex items-center gap-2 text-xs lg:text-sm text-gray-600 hover:text-black transition-colors whitespace-nowrap"
                  >
                    Sort: {sortOptions.find(opt => opt.value === sortBy)?.label}
                    <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4" />
                  </button>
                  {sortOpen && (
                    <>
                      {/* Backdrop */}
                      <div 
                        className="fixed inset-0 z-40"
                        onClick={() => setSortOpen(false)}
                      />
                      <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 shadow-lg z-50 min-w-48">
                        {sortOptions?.map(option => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setSortBy(option.value);
                              setSortOpen(false);
                            }}
                            className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                              sortBy === option.value ? 'bg-black text-white hover:bg-gray-800' : 'text-gray-700'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* View Mode */}
                <div className="flex border border-gray-300">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors ${
                      viewMode === 'grid' ? 'bg-black text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Grid size={14} className="lg:w-4 lg:h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors ${
                      viewMode === 'list' ? 'bg-black text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <List size={14} className="lg:w-4 lg:h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid - Mobile Responsive */}
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence>
            <motion.div
              key={`${selectedCategory}-${viewMode}-${filteredProducts?.length}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6'
                  : 'grid grid-cols-1 gap-6 lg:gap-8'
              }
            >
                {loading && (
              <div className="col-span-4 text-center py-12">
                <p className="text-gray-500">Loading products...</p>
              </div>
            )}
              {filteredProducts?.map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  layout
                  className="group cursor-pointer bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className={`relative ${viewMode === 'list' ? 'flex flex-col lg:flex-row lg:items-center lg:gap-6' : ''}`}>
                    <div className={`relative overflow-hidden ${viewMode === 'list' ? 'lg:w-64 lg:flex-shrink-0 aspect-square' : 'aspect-[4/4]'}`}>
                      <Link to={`/product/${product.id}`} className="block w-full h-full">
                        <img
                          src={product.product_images[0]}
                          alt={product.product_name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      </Link>
                      
                      {/* Category Badge */}
                      <div className="absolute top-2 left-2">
                        <span className="bg-white text-black px-2 py-1 text-xs font-medium rounded">
                          {product.product_categories?.[0]?.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className={`p-3 lg:p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <Link to={`/product/${product.id}`} className="block group">
                        <h3 className="text-sm lg:text-base font-medium text-gray-900 mb-1 lg:mb-2 group-hover:text-gray-600 transition-colors line-clamp-2">
                          {product.product_name}
                        </h3>
                      </Link>

                      {/* Price and Stock */}
                      <div className="flex items-center justify-between mb-2 lg:mb-3">
                        <span className="text-base lg:text-lg font-bold text-gray-900">
                          GHC{product.product_price}
                        </span>
                        <span className={`text-xs ${product.product_stock > 10 ? 'text-green-600' : 'text-orange-600'}`}>
                          {product.product_stock > 10 ? 'In Stock' : 'Low Stock'}
                        </span>
                      </div>

                      {/* Colors Available */}
                      <div className="flex items-center gap-1 mb-3 lg:mb-4">
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

                      {/* Action Buttons - Stacked Layout */}
                      <div className="space-y-2">
                        {/* Add to Cart Button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart(product);
                          }}
                          className="w-full bg-black text-white py-2 lg:py-2 text-xs font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-[10px] cursor-pointer"
                        >
                          <ShoppingCart size={16} className="lg:w-4 lg:h-4" />
                           ADD TO CART
                        </button>
                        
                        {/* Quick Buy Button */}
                        <button
                          onClick={() => handleWhatsAppOrder(product)}
                          className="w-full border  py-2 lg:py-2 text-xs font-medium hover:scale-105 transition-all flex items-center justify-center gap-[10px] cursor-pointer"
                        >
                          <img src={whatsappIcon} alt="WhatsApp" className="w-5 h-5" />
                          QUICK BUY
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {(!filteredProducts || filteredProducts.length === 0) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 lg:py-24"
            >
              <div className="max-w-md mx-auto">
                <h3 className="text-lg lg:text-xl font-medium text-gray-900 mb-3 lg:mb-4">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6 lg:mb-8 text-sm lg:text-base">
                  {selectedCategory !== 'all' 
                    ? `No products found in ${categories?.find(c => c.id === selectedCategory)?.name}. Try another category.`
                    : 'Try adjusting your filters or search terms.'
                  }
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="bg-black text-white px-6 py-2 text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  CLEAR FILTERS
                </button>
              </div>
            </motion.div>
          )}

          {/* Results Count */}
          {filteredProducts && filteredProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-gray-200"
            >
              <p className="text-gray-600 text-xs lg:text-sm">
                Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                {selectedCategory !== 'all' && ` in ${categories?.find(c => c.id === selectedCategory)?.name}`}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Minimal CTA Section */}
      <section className="py-12 lg:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xl lg:text-3xl font-bold mb-3 lg:mb-4">
              NEED HELP WITH YOUR ORDER?
            </h2>
            <p className="text-gray-600 mb-6 lg:mb-8 max-w-2xl mx-auto text-xs lg:text-sm">
              Contact us for personalized styling advice or assistance with your purchase.
            </p>
            <button 
              onClick={() => handleWhatsAppOrder({ name: 'Style Consultation', price: 0 })}
              className="bg-black text-white px-6 lg:px-8 py-2 lg:py-3 text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              CHAT WITH US
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Products;