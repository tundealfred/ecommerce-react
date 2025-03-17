import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { fetchUserOrders } from "../utils/api";
import { motion } from "framer-motion";

const UserAccount = () => {
  const { user, logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      fetchUserOrders(user.id).then((data) => setOrders(data));
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-gray-600 text-lg">
            Please log in to view your account.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-4 text-center">My Account</h2>
        <div className="mb-6">
          <p className="text-lg">
            <strong>Name:</strong> {user.username}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {user.email}
          </p>
        </div>

        <h3 className="text-2xl font-semibold mb-4">My Orders</h3>
        {orders.length > 0 ? (
          <ul className="space-y-4">
            {orders.map((order) => (
              <motion.li
                key={order.id}
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-gray-50 rounded-lg shadow-md border"
              >
                <p>
                  <strong>Order ID:</strong> {order.id}
                </p>
                <p>
                  <strong>Total:</strong> ${order.totalPrice}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No orders found.</p>
        )}

        <button
          onClick={logout}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </motion.div>
    </div>
  );
};

export default UserAccount;
