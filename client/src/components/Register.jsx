import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import AuthContext from "../context/AuthContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    register(username, email, password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.input
            whileFocus={{ scale: 1.05 }}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 bg-white/20 text-white placeholder-gray-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <motion.input
            whileFocus={{ scale: 1.05 }}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-white/20 text-white placeholder-gray-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <motion.input
            whileFocus={{ scale: 1.05 }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-white/20 text-white placeholder-gray-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Register
          </motion.button>
        </form>
        <p className="text-center text-gray-200 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-300 hover:underline">
            Sign in
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
