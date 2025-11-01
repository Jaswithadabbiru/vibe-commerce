// models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  cartItems: [
    {
      productId: Number,
      name: String,
      price: Number,
      qty: Number,
    },
  ],
  total: { type: Number, required: true },
  timestamp: { type: String, required: true },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
