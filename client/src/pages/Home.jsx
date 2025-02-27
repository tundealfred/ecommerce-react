import React from "react";
import { motion } from "framer-motion";
import shopimg1 from "../assets/shopimg1.jpg";
import shopimg2 from "../assets/shopimg2.jpg";

const Home = () => {
  const featuredProducts = [
    { id: 1, name: "Product 1", price: "$99.99", image: shopimg1 },
    { id: 2, name: "Product 2", price: "$89.99", image: shopimg2 },
    { id: 3, name: "Product 3", price: "$79.99", image: shopimg1 },
    { id: 4, name: "Product 4", price: "$69.99", image: shopimg2 },
  ];

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section
        className="relative h-[500px] bg-cover bg-center flex items-center justify-center text-white text-center px-4"
        style={{ backgroundImage: `url(${shopimg1})` }}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-black bg-opacity-50 p-6 rounded-lg"
        >
          <h1 className="text-5xl font-bold mb-4">Welcome to Our Store</h1>
          <p className="text-lg">Discover the best deals on premium products</p>
          <button className="mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition">
            Shop Now
          </button>
        </motion.div>
      </section>

      {/* Promo Section */}
      <section className="py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-white shadow-lg rounded-lg text-center"
        >
          <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
          <p>On all orders over $50</p>
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
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.05 }}
              className="p-4 bg-white shadow-lg rounded-lg text-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-full object-cover rounded-lg mb-4"
              />
              <h4 className="text-lg font-semibold">{product.name}</h4>
              <p className="text-gray-600">{product.price}</p>
              <button className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition">
                Add to Cart
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
