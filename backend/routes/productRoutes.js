import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// GET mock products
router.get("/", async (req, res) => {
  const mockProducts = [
    { id: 1, name: "T-shirt", price: 499, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Sneakers", price: 2999, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Headphones", price: 1499, image: "https://via.placeholder.com/150" },
    { id: 4, name: "Backpack", price: 999, image: "https://via.placeholder.com/150" },
    { id: 5, name: "Watch", price: 1999, image: "https://via.placeholder.com/150" },
  ];
  res.json(mockProducts);
});

export default router;
