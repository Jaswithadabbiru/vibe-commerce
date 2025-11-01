// routes/cartRoutes.js
import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

let cart = []; // in-memory cart (temporary)

// ✅ Add item
router.post("/", (req, res) => {
  const { productId, name, price, qty } = req.body;
  const existing = cart.find((i) => i.productId === productId);
  if (existing) existing.qty += qty;
  else cart.push({ productId, name, price, qty });
  res.json(cart);
});

// ✅ Remove item
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  cart = cart.filter((item) => item.productId !== parseInt(id));
  res.json(cart);
});

// ✅ Update quantity
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { qty } = req.body;

  const item = cart.find((i) => i.productId === parseInt(id));
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  if (qty <= 0) {
    cart = cart.filter((i) => i.productId !== parseInt(id));
  } else {
    item.qty = qty;
  }

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  res.json({ cart, total });
});

// ✅ Get cart + total
router.get("/", (req, res) => {
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  res.json({ cart, total });
});

// ✅ Checkout route
router.post("/checkout", async (req, res) => {
  const { name, email } = req.body;

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const timestamp = new Date().toLocaleString();

  try {
    // Save order to MongoDB
    const newOrder = new Order({
      name,
      email,
      cartItems: cart,
      total,
      timestamp,
    });
    await newOrder.save();

    // Clear the cart
    cart = [];

    res.json({
      message: "Order placed successfully!",
      total,
      timestamp,
    });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ error: "Failed to save order" });
  }
});

export default router;
