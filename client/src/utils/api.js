import axios from "axios";

const API_URL = "http://localhost:1337/api";

//fetch user order
export const fetchUserOrders = async (userId) => {
  try {
    const response = await api.get(`/orders?filters[user][id][$eq]=${userId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to set Authorization token dynamically
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Fetch all products
export const fetchProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Fetch all categories
export const fetchCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// Add a new product
export const addProduct = async (productData) => {
  try {
    const response = await api.post("/products", { data: productData });
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

// Update a product
export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/products/${id}`, { data: productData });
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

// Delete a product
export const deleteProduct = async (id) => {
  try {
    await api.delete(`/products/${id}`);
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};

export default api;
