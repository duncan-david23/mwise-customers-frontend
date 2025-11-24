// src/pages/ProductDetail.jsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck, Shield, ArrowLeft, ShoppingCart, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import whatsappIcon from '../assets/whatsapp.png';

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { getProductById, getRelatedProducts } = useProducts();

  const product = getProductById(id);



  if (!product) {
    return (
      <div className="min-h-screen bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
          <Link to="/products" className="text-black hover:text-gray-700 mt-4 inline-block">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product.id);

  const handleWhatsAppOrder = () => {
    let message = `Hello! I would like to order:\n\n*${product.product_name}*\nQuantity: ${quantity}\nPrice: GHC${product.product_price}\nTotal: GHC${(product.product_price * quantity).toFixed(2)}`;

    if (selectedSize) {
      message += `\nSize: ${selectedSize}`;
    }
    if (selectedColor) {
      message += `\nColor: ${selectedColor}`;
    }
    
    message += `\n\nPlease proceed with my order.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/233533261002?text=${encodedMessage}`, '_blank');
  };

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      size: selectedSize,
      color: selectedColor
    };
    
    for (let i = 0; i < quantity; i++) {
      addToCart(cartItem);
    }
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={20} />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div>
            <div className="mb-4">
              <img
                src={product.product_images[selectedImage]}
                alt={product.product_name}
                className="w-full h-96 object-contain rounded-lg"
              />
            </div>
            <div className="flex gap-2">
              {product.product_images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-1 h-[180px] rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-black' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.product_name} ${index + 1}`}
                    className="w-full h-[180px] object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                {product.product_categories?.[0]?.toUpperCase()}
              </span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {product.product_name}
            </h1>

            <p className="text-3xl font-bold text-gray-900 mb-6">GHC{product.product_price}</p>

            <p className="text-gray-600 mb-8 leading-relaxed">{product.product_description}</p>

            {/* Size Selector */}
            {product.product_sizes && product.product_sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.product_sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                        selectedSize === size
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {product.product_colors && product.product_colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Color
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.product_colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                        selectedColor === color
                          ? 'border-black'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color }}
                      title={color.charAt(0).toUpperCase() + color.slice(1)}
                    >
                      {selectedColor === color && (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Status */}
            <div className="mb-6">
              <span className={`text-sm font-medium ${
                product.product_stock > 10 ? 'text-green-600' : 'text-orange-600'
              }`}>
                {product.product_stock > 10 ? 'In Stock' : `Only ${product.product_stock} left`}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-l border-r border-gray-300 min-w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
                <div className="text-lg font-semibold">
                  Total: GHC{(product.product_price * quantity).toFixed(2)}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize && product.product_sizes && product.product_sizes.length > 0}
                className="flex-1 bg-black text-white py-4 px-8 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button
                onClick={handleWhatsAppOrder}
                className="flex-1 border  py-4 px-8 rounded-lg font-semibold hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <img src={whatsappIcon} alt="WhatsApp" className="w-5 h-5" />
                Buy Now via WhatsApp
              </button>
            </div>

            {/* Features Icons */}
            {/* <div className="grid grid-cols-2 gap-4 py-6 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <Truck className="w-6 h-6 text-gray-600" />
                <div>
                  <p className="font-semibold text-sm">Free Shipping</p>
                  <p className="text-xs text-gray-600">On orders over GHC250</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-gray-600" />
                <div>
                  <p className="font-semibold text-sm">Secure Payment</p>
                  <p className="text-xs text-gray-600">100% protected</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <motion.div
                  key={relatedProduct.id}
                  whileHover={{ y: -5 }}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="mb-2">
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                        {relatedProduct.category?.[0]?.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{relatedProduct.name}</h3>
                    <p className="text-xl font-bold text-gray-900 mb-4">
                      GHC{relatedProduct.price}
                    </p>
                    <Link
                      to={`/product/${relatedProduct.id}`}
                      className="w-full bg-black text-white py-2 rounded text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    >
                      View Product
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;