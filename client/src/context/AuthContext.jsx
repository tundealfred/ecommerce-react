import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  // Fetch user details if token exists
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:1337/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => {
          logout();
        });
    }
  }, [token]);

  // Email & Password Login
  const login = async (identifier, password) => {
    try {
      const res = await axios.post("http://localhost:1337/api/auth/local", {
        identifier,
        password,
      });
      setUser(res.data.user);
      setToken(res.data.jwt);
      localStorage.setItem("token", res.data.jwt);
      setAuthToken(res.data.jwt); // <-- Set token globally
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed", err.response?.data);
      alert("Invalid credentials. Please try again.");
    }
  };

  //Register
  const register = async (username, email, password) => {
    try {
      const res = await axios.post(
        "http://localhost:1337/api/auth/local/register",
        {
          username,
          email,
          password,
        }
      );
      setUser(res.data.user);
      setToken(res.data.jwt);
      localStorage.setItem("token", res.data.jwt);
      setAuthToken(res.data.jwt); // <-- Set token globally
      navigate("/dashboard");
    } catch (err) {
      console.error("Registration failed", err.response?.data);
    }
  };

  // OAuth Login
  const handleOAuth = (provider) => {
    window.location.href = `http://localhost:1337/api/connect/${provider}`;
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, handleOAuth, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
