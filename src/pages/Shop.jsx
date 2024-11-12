import React, { useState } from "react";
import "../Styles/Shop.css";

// Shop component definition
const Shop = () => {
  // State hook to manage the cart, initialized as an empty array
  const [cart, setCart] = useState([]);

  // Array of products available in the shop
  const products = [
    { id: 1, name: "Protein Powder", description: "High-quality whey protein.", price: 29.99 },
    { id: 2, name: "Creatine", description: "Supports muscle strength.", price: 19.99 },
    { id: 3, name: "Pre-Workout", description: "Boosts energy and focus.", price: 24.99 },
    { id: 4, name: "Multivitamins", description: "Complete daily multivitamin.", price: 15.99 },
  ];

  // Function to add a product to the cart
  const addToCart = (product) => {
    // Adds the selected product to the cart state
    setCart([...cart, product]);
    // Alert to confirm product has been added to the cart
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="shop-container">
      {/* Title of the shop */}
      <h1>Supplements Shop</h1>

      {/* List of products available for purchase */}
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            {/* Display product name */}
            <h2>{product.name}</h2>
            {/* Display product description */}
            <p>{product.description}</p>
            {/* Display product price, formatted to two decimal places */}
            <p>Price: ${product.price.toFixed(2)}</p>
            {/* Button to add the product to the cart */}
            <button onClick={() => addToCart(product)}>Buy Now</button>
          </div>
        ))}
      </div>

      {/* Title for the shopping cart section */}
      <h2>Shopping Cart</h2>

      {/* List of items in the cart */}
      <ul>
        {cart.map((item, index) => (
          // Display each item in the cart with its name and price
          <li key={index}>{item.name} - ${item.price.toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
};

// Exporting Shop component for use in other parts of the application
export default Shop;
