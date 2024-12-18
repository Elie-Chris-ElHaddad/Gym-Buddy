import React, { useEffect, useState } from "react";
import "../Styles/Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
  });

  // Fetch products from the backend
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const addProduct = (e) => {
    e.preventDefault();
    console.log("Payload being sent:", newProduct); // Log the payload

    fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct), // Convert newProduct to JSON
    })
      .then((response) => response.json())
      .then((createdProduct) => {
        console.log("Product added successfully:", createdProduct); // Log the response
        setProducts([...products, createdProduct]);
        setShowAddProductForm(false);
        setNewProduct({ name: "", description: "", price: "" });
      })
      .catch((error) => console.error("Error adding product:", error));
  };

  return (
    <div className="shop-container">
      <h1>Supplements Shop</h1>

      <button
        className="add-product-button"
        onClick={() => setShowAddProductForm(!showAddProductForm)}
      >
        {showAddProductForm ? "Close Form" : "Add Product"}
      </button>

      {showAddProductForm && (
        <form className="add-product-form" onSubmit={addProduct}>
          <h2>Add a New Product</h2>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Product Description"
            value={newProduct.description}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Add Product</button>
        </form>
      )}

      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <button onClick={() => alert(`${product.name} added to cart!`)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
