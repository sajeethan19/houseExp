import React from "react";

export default function RefreshButton({ onClick, loading }) {
  return (
    <div className="text-right mb-4">
      <button
        onClick={onClick}
        disabled={loading}
        className="px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
      >
        🔄 {loading ? "Refreshing..." : "Refresh"}
      </button>
    </div>
  );
}
