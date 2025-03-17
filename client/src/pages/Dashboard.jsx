import React, { useState, useEffect, useContext } from "react";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../utils/api";
import AuthContext from "../context/AuthContext";

const Dashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

  if (!user || user.role !== "admin") {
    return <p className="text-center text-red-500">Access Denied</p>;
  }

  // Handle Add Product
  const handleAddProduct = async () => {
    const res = await addProduct(newProduct, token);
    setProducts([...products, res.data.data]);
    setNewProduct({ title: "", price: "", description: "" });
  };

  // Handle Delete Product
  const handleDelete = async (id) => {
    await deleteProduct(id, token);
    setProducts(products.filter((product) => product.id !== id));
  };

  // Handle Edit Product
  const handleEditProduct = async (id, updatedData) => {
    const updatedProduct = await updateProduct(id, updatedData);
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, attributes: updatedProduct.data.attributes }
          : product
      )
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-4">Admin Dashboard</h2>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Add New Product</h3>
        <input
          type="text"
          placeholder="Title"
          value={newProduct.title}
          onChange={(e) =>
            setNewProduct({ ...newProduct, title: e.target.value })
          }
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          className="border p-2 w-full rounded mt-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          className="border p-2 w-full rounded mt-2"
        />
        <button
          onClick={handleAddProduct}
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </div>

      <h3 className="text-xl font-bold mt-6">Manage Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold">
              {product.attributes.title}
            </h4>
            <p>{product.attributes.description}</p>
            <p className="text-blue-600 font-bold">
              £{product.attributes.price}
            </p>
            <button
              onClick={() => handleDelete(product.id)}
              className="bg-red-500 text-white px-3 py-1 rounded mt-2 hover:bg-red-600"
            >
              Delete
            </button>

            <button
              onClick={() => handleEditProduct(product.id)}
              className="bg-blue-500 text-white px-3 py-1 rounded mt-2 hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
