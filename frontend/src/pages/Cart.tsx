import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface CartItem {
  productId: number;
  name: string;
  price: number;
  qty: number;
  image?: string;
}

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // Fetch cart data
  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/cart");
      setCart(res.data.cart);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Update quantity
  const updateQty = async (productId: number, newQty: number) => {
    if (newQty < 1) return; // prevent zero qty
    try {
      await axios.put(`http://localhost:5000/api/cart/${productId}`, {
        qty: newQty,
      });
      fetchCart();
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  // Remove item
  const removeItem = async (productId: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${productId}`);
      fetchCart();
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 py-10 px-5">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-950/70 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-800 transition-all">
        <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2 mb-8">
          🛒 Your Cart
        </h2>

        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Loading your cart...
          </p>
        ) : cart.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
            Your cart is empty 😕
          </p>
        ) : (
          <>
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item.productId}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        item.image || "https://via.placeholder.com/60?text=🛍️"
                      }
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg border border-gray-300 dark:border-gray-700"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        ₹{item.price}
                      </p>
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 mt-3 sm:mt-0">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQty(item.productId, item.qty - 1)
                        }
                        className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-md"
                      >
                        -
                      </button>
                      <span className="font-medium text-lg">{item.qty}</span>
                      <button
                        onClick={() =>
                          updateQty(item.productId, item.qty + 1)
                        }
                        className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-md"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-semibold text-green-600 dark:text-green-400">
                      ₹{item.price * item.qty}
                    </span>

                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-red-500 hover:text-red-600 text-xl"
                      title="Remove item"
                    >
                      ❌
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Total section */}
            <div className="mt-8 flex justify-between items-center border-t border-gray-300 dark:border-gray-700 pt-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                Total:
              </h3>
              <span className="text-2xl font-extrabold text-green-600 dark:text-green-400">
                ₹{total}
              </span>
            </div>

            <Link
  to="/checkout"
  className="block w-full text-center mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg"
>
  Proceed to Checkout
</Link>

          </>
        )}
      </div>
    </div>
  );
}
