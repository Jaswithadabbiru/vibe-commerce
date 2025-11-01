import { useState } from "react";
import axios from "axios";

export default function Checkout() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [receipt, setReceipt] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // ✅ Send checkout request to backend
      const res = await axios.post("http://localhost:5000/api/cart/checkout", {
        name,
        email,
      });
      setReceipt(res.data);
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Something went wrong while processing your order 😕");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <div className="bg-white dark:bg-gray-950/80 p-8 rounded-2xl shadow-lg w-[90%] max-w-md border border-gray-200 dark:border-gray-800">
        <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6 text-center">
          🧾 Checkout
        </h2>

        {!receipt ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {loading ? "Processing..." : "Confirm Order"}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-green-600 mb-2">
              ✅ Order Successful!
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-1">
              Total: ₹{receipt.total}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Time: {receipt.timestamp}
            </p>
            <button
              onClick={() => setReceipt(null)}
              className="mt-3 bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg transition-all"
            >
              Back to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
