import React, { useState } from "react";
import { sha256 } from "js-sha256";

export default function PinPrompt({ onSuccess }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const hash = sha256(pin);
    console.log(hash)
    if (hash === process.env.REACT_APP_PIN_HASH) {
      localStorage.setItem("pin_verified", "true");
      onSuccess();
    } else {
      setError("Invalid PIN");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4 text-center">Enter PIN</h2>
        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white mb-2"
          placeholder="Enter PIN"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Unlock
        </button>
      </form>
    </div>
  );
}
