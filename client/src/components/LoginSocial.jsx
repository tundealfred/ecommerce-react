import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

const LoginSocial = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const { login, handleOAuth } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(identifier, password);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-center mb-4">Login</h2>

      {/* Email & Password Login */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Email or Username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md"
        >
          Login
        </button>
      </form>

      <div className="text-center my-4">OR</div>

      {/* Google OAuth Login */}
      <button
        onClick={() => handleOAuth("google")}
        className="w-full bg-red-500 text-white p-2 rounded-md"
      >
        Login with Google
      </button>
    </div>
  );
};

export default LoginSocial;
