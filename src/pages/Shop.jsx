import React, { useState } from "react";
import "../Styles/Shop.css";

const Shop = () => {
  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, name: "Protein Powder", description: "High-quality whey protein.", price: 29.99 },
    { id: 2, name: "Creatine", description: "Supports muscle strength.", price: 19.99 },
    { id: 3, name: "Pre-Workout", description: "Boosts energy and focus.", price: 24.99 },
    { id: 4, name: "Multivitamins", description: "Complete daily multivitamin.", price: 15.99 },
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="shop-container">
      <h1>Supplements Shop</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>Buy Now</button>
          </div>
        ))}
      </div>
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>{item.name} - ${item.price.toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Shop;
