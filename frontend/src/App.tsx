import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import "./styles.css";

export default function App() {
  return (
    <Router>
      <header>
        <h1>🛒 Vibe Commerce</h1>
        <nav>
          <Link to="/">Products</Link> | <Link to="/cart">Cart</Link> |{" "}
          <Link to="/checkout">Checkout</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}
