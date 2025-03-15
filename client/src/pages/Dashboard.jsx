import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-96">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        {user ? (
          <>
            <p className="text-gray-700">Welcome, {user.username}</p>
            <button
              onClick={logout}
              className="w-full mt-4 bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <p className="text-gray-600">Please log in</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
