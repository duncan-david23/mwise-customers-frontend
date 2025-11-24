// src/pages/Cart.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import whatsappIcon from '../assets/whatsapp.png';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();

  const handleWhatsAppOrder = () => {
    if (cart.items.length === 0) return;

    let message = "Hello! I would like to order the following items:\n\n";
    
    cart.items.forEach(item => {
      message += `*${item.product_name}*\n`;
      message += `Quantity: ${item.quantity}\n`;
      message += `Price: GHC${item.product_price} x ${item.quantity} = GHC${(item.product_price * item.quantity).toFixed(2)}\n\n`;
    });

    message += `*Total Amount: GHC${(getCartTotal() * 1.1).toFixed(2)}*\n\n`;
    message += "Please proceed with my order. Thank you!";

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/233533261002?text=${encodedMessage}`, '_blank');
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        {/* Empty Cart */}
        <section className="py-32 border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <h1 className="text-3xl font-bold mb-4 tracking-tight">
                Your cart is empty
              </h1>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Continue shopping to add items to your cart.
              </p>
              <Link
                to="/products"
                className="bg-black text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 transition-colors inline-flex items-center gap-2 group"
              >
                CONTINUE SHOPPING
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <section className="py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl font-bold mb-2 tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-gray-600">
              {cart.items.length} item{cart.items.length !== 1 ? 's' : ''}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-gray-900">
                  Cart Items
                </h2>
                <button
                  onClick={clearCart}
                  className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
                >
                  Clear all
                </button>
              </div>

              {/* Cart Items List */}
              <div className="space-y-6">
                <AnimatePresence>
                  {cart.items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-b border-gray-200 pb-6 last:border-b-0"
                    >
                      <div className="flex gap-6">
                        {/* Product Image */}
                        <Link 
                          to={`/product/${item.id}`}
                          className="flex-shrink-0 w-24 h-24 bg-gray-50 overflow-hidden"
                        >
                          <img
                            src={item.product_images ? item.product_images[0] : item.image}
                            alt={item.name}
                            className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                          />
                        </Link>

                        {/* Product Info and Controls */}
                        <div className="flex-1 flex flex-col sm:flex-row gap-4">
                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <Link 
                              to={`/product/${item.id}`}
                              className="group"
                            >
                              <h3 className="text-lg font-medium text-gray-900 mb-1 group-hover:text-gray-600 transition-colors">
                                {item.product_name}
                              </h3>
                            </Link>
                            <p className="text-lg font-bold text-gray-900 mb-3">
                              GHC{item.product_price}
                            </p>

                            {/* Color and Size if available */}
                            {item.product_color && (
                              <p className="text-sm text-gray-600 mb-1">
                                Color: <span className="capitalize">{item.product_color}</span>
                              </p>
                            )}
                            {item.product_size && (
                              <p className="text-sm text-gray-600">
                                Size: {item.product_size}
                              </p>
                            )}
                          </div>

                          {/* Desktop Controls */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-gray-300">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="w-12 text-center font-medium text-sm">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600"
                              >
                                <Plus size={16} />
                              </button>
                            </div>

                            {/* Total and Remove */}
                            <div className="text-right">
                              <p className="font-bold text-gray-900 text-lg mb-2">
                                GHC{(item.product_price * item.quantity).toFixed(2)}
                              </p>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-gray-500 hover:text-red-600 text-sm transition-colors flex items-center gap-1"
                              >
                                <Trash2 size={14} />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border border-gray-200 p-6 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>
                
                {/* Summary Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center text-gray-900">
                    <span className="text-sm">Subtotal</span>
                    <span className="font-bold">GHC{getCartTotal().toFixed(2)}</span>
                  </div>
                  {/* <div className="flex justify-between items-center text-gray-900">
                    <span className="text-sm">Delivery</span>
                    <span className="font-bold text-green-600">Free</span>
                  </div> */}
                  {/* <div className="flex justify-between items-center text-gray-900">
                    <span className="text-sm">Tax</span>
                    <span className="font-bold">GHC{(getCartTotal() * 0.1).toFixed(2)}</span>
                  </div> */}
                  <div className="border-t border-gray-300 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-xl">
                        GHC{(getCartTotal() * 1.1).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full border  cursor-pointer py-3 flex items-center text-sm font-medium hover:scale-105 transition-all justify-center gap-2"
                  >
                   <img src={whatsappIcon} alt="WhatsApp" className="w-5 h-5" />
                   Checkout via WhatsApp
                  </button>

                  <Link
                    to="/products"
                    className="block w-full border border-gray-300 text-gray-900 py-3 text-sm font-medium hover:bg-gray-50 transition-colors text-center"
                  >
                    CONTINUE SHOPPING
                  </Link>
                </div>

                {/* Trust Badges */}
                {/* <div className="mt-6 pt-6 border-t border-gray-300">
                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>Free shipping on orders over GHC250</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>Secure checkout</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>Easy returns</span>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Continue Shopping */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold mb-4">
              Continue Shopping
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-sm">
              Discover more premium streetwear and accessories.
            </p>
            <Link
              to="/products"
              className="bg-black text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 transition-colors inline-flex items-center gap-2 group"
            >
              EXPLORE COLLECTION
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Cart;