import react, { useEffect, useState } from 'react';
import axios from 'axios';
import { useProducts } from '../context/ProductContext'; // Fixed import name

const { items } = useProducts();




// // src/data/products.js
// export const products = [
//   {
//     id: 1,
//     name: "Urban Graphic Tee",
//     price: 45.99,
//     images: [
//       "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
//       "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600",
//       "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600"
//     ],
//     category: ["tshirt"],
//     sizes: ["S", "M", "L", "XL"],
//     colors: ["black", "white", "gray"],
//     description: "Premium cotton t-shirt with exclusive urban graphic print. Features a comfortable fit with designer artwork that makes a statement.",
//     stock: 120,
//   },
//   {
//     id: 2,
//     name: "Signature Hoodie - Black",
//     price: 79.99,
//     images: [
//       "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600",
//       "https://images.unsplash.com/photo-1578763363220-8f78e4b8e359?w=600"
//     ],
//     category: ["hoodies"],
//     sizes: ["S", "M", "L", "XL", "XXL"],
//     colors: ["black", "navy", "charcoal"],
//     description: "Luxury oversized hoodie with signature embroidery and premium French terry fabric. Perfect for streetwear enthusiasts.",
//     stock: 85,
//   },
//   {
//     id: 3,
//     name: "Minimalist Logo Tee",
//     price: 32.50,
//     images: [
//       "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600",
//       "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"
//     ],
//     category: ["tshirt"],
//     sizes: ["XS", "S", "M", "L"],
//     colors: ["white", "black", "cream"],
//     description: "Clean minimalist t-shirt with subtle brand logo. Made from organic cotton for ultimate comfort and sustainability.",
//     stock: 150,
//   },
//   {
//     id: 4,
//     name: "Vintage Wash Hoodie",
//     price: 65.99,
//     images: [
//       "https://images.unsplash.com/photo-1578763363220-8f78e4b8e359?w=600"
//     ],
//     category: ["hoodies"],
//     sizes: ["M", "L", "XL"],
//     colors: ["gray", "olive", "burgundy"],
//     description: "Vintage washed hoodie with distressed details and classic fit. Features ribbed cuffs and hem for durability.",
//     stock: 75,
//   },
//   {
//     id: 5,
//     name: "Abstract Art Tee",
//     price: 42.75,
//     images: [
//       "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600"
//     ],
//     category: ["tshirt"],
//     sizes: ["S", "M", "L", "XL"],
//     colors: ["white", "black"],
//     description: "Artist collaboration t-shirt featuring exclusive abstract artwork. Limited edition design with vibrant colors.",
//     stock: 60,
//   },
//   {
//     id: 6,
//     name: "Tech Fleece Hoodie",
//     price: 89.99,
//     images: [
//       "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600"
//     ],
//     category: ["hoodies"],
//     sizes: ["S", "M", "L", "XL", "XXL"],
//     colors: ["black", "navy", "red"],
//     description: "Performance hoodie made with technical fleece fabric. Features moisture-wicking properties and modern athletic silhouette.",
//     stock: 95,
//   },
//   {
//     id: 7,
//     name: "Oversized Band Tee",
//     price: 38.50,
//     images: [
//       "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600"
//     ],
//     category: ["tshirt"],
//     sizes: ["S", "M", "L"],
//     colors: ["black", "white", "gray"],
//     description: "Oversized band-style t-shirt with vintage-inspired print and relaxed fit. Perfect for layering or wearing alone.",
//     stock: 110,
//   },
//   {
//     id: 8,
//     name: "Premium Zip Hoodie",
//     price: 85.00,
//     images: [
//       "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600"
//     ],
//     category: ["hoodies"],
//     sizes: ["S", "M", "L", "XL"],
//     colors: ["black", "charcoal", "forest green"],
//     description: "Premium zip-up hoodie with luxury details including metal zipper, custom drawstrings, and brushed interior.",
//     stock: 70,
//   }
// ];

// export const products = items && items;

// export const categories = [
//   { id: 'all', name: 'All Products' },
//   { id: 'tshirt', name: 'T-Shirts' },
//   { id: 'hoodies', name: 'Hoodies' },
//   { id: 'sneakers', name: 'Sneakers' },
//   { id: 'camo-jeans', name: 'Camo Jeans' },
//   { id: 'jersey', name: 'Jersey' }
// ];

// export const getProductById = (id) => {
//   return products.find(product => product.id === parseInt(id));
// };

// export const getFeaturedProducts = () => {
//   return products.slice(0, 4); // Or add a featured property to products
// };

// export const getProductsByCategory = (categoryId) => {
  
//   if (categoryId === 'all') {
//     return products;
//   }
  
//   const filtered = products.filter(product => {
//     const matches = product.category && product.category.includes(categoryId);
//     return matches;
//   });
  
//   return filtered;
// };

// export const getRelatedProducts = (productId, limit = 4) => {
//   const product = getProductById(productId);
//   if (!product) return [];
  
//   return products
//     .filter(p => p.id !== productId && p.category.some(cat => product.category.includes(cat)))
//     .slice(0, limit);
// };