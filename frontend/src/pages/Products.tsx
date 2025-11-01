import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((res) => setProducts(res.data));
  }, []);

  const addToCart = async (p: Product) => {
    await axios.post("http://localhost:5000/api/cart", {
      productId: p.id,
      name: p.name,
      price: p.price,
      qty: 1,
    });
    alert(`${p.name} added to cart!`);
  };

  return (
    <div className="container">
      <h2>🛍️ Products</h2>
      <div className="grid">
        {products.map((p) => (
          <div key={p.id} className="card">
            <img src={p.image} alt={p.name} width="150" height="150" />
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

