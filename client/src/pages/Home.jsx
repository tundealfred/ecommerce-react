import React, { useState, useEffect } from "react";
import { fetchProducts } from "../utils/api";
import Dashboard from "./Dashboard";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Navigation from "../components/Navigation";
import shopimg1 from "../assets/shopimg1.jpg";
import shopimg2 from "../assets/shopimg2.jpg";
import shopimg3 from "../assets/shopimg3.jpg";
import shopimg4 from "../assets/shopimg4.jpg";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      console.log("API Response:", data); // Debugging
      setProducts(data);
    };
    getProducts();
  }, []);

  const featuredProducts = [
    { id: 1, name: "Product 1", price: "£99.99", image: shopimg1 },
    { id: 2, name: "Product 2", price: "£89.99", image: shopimg2 },
    { id: 3, name: "Product 3", price: "£79.99", image: shopimg1 },
    { id: 4, name: "Product 4", price: "£69.99", image: shopimg2 },
  ];

  const heroImages = [shopimg1, shopimg2, shopimg3, shopimg4];

  return (
    <>
      <div className="bg-gray-100">
        {/* Hero Section */}
        <section className="relative h-[700px] w-full">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            className="h-full"
          >
            {heroImages.map((image, index) => (
              <div key={index} className="h-[700px] w-full">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </Carousel>
          <div className="absolute inset-0 flex items-center justify-center text-white text-center px-4 bg-black bg-opacity-30">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="p-6 rounded-lg"
            >
              <h1 className="text-5xl font-bold mb-4">Welcome to Our Store</h1>
              <p className="text-lg">
                Discover the best deals on premium products!
              </p>
              <button className="mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition">
                Shop Now
              </button>
            </motion.div>
          </div>
        </section>

        {/* Promo Section */}
        <section className="py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white shadow-lg rounded-lg text-center"
          >
            <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
            <p>On all orders over £50</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white shadow-lg rounded-lg text-center"
          >
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p>We're here to help anytime</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white shadow-lg rounded-lg text-center"
          >
            <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
            <p>100% secure payments</p>
          </motion.div>
        </section>

        {/* Featured Products */}
        <section className="py-12 px-6">
          <h2 className="text-3xl font-bold text-center mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((hmproduct) => (
              <motion.div
                key={hmproduct.id}
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-white shadow-lg rounded-lg text-center"
              >
                <img
                  src={hmproduct.image}
                  alt={hmproduct.name}
                  className="h-40 w-full object-cover rounded-lg mb-4"
                />
                <h4 className="text-lg font-semibold">{hmproduct.name}</h4>
                <p className="text-gray-600">{hmproduct.price}</p>
                <button className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition">
                  Add to Cart
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/*Product from bckn*/}
        <div className="min-h-screen bg-gray-100 p-6">
          <h2 className="text-3xl font-bold text-center mb-6">Main Products</h2>
          {products.length === 0 ? (
            <p className="text-center text-gray-500">Loading products...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => {
                const { attributes } = product || {}; // Ensure `product` exists
                return attributes ? (
                  <div
                    key={product.id}
                    className="bg-white shadow-lg rounded-lg p-4"
                  >
                    <h3 className="text-xl font-bold">{attributes.title}</h3>
                    <p className="text-gray-600">{attributes.description}</p>
                    <p className="text-lg font-semibold text-blue-600">
                      £{attributes.price}
                    </p>
                  </div>
                ) : null; // Skip rendering if attributes are missing
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
