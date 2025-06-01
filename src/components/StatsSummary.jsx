import React from "react";

export default function StatsSummary({ allocated, used }) {
  const remaining = allocated - used;
  const usedPercent = Math.min(100, (used / allocated) * 100);

  let barColor = "bg-green-500";
  if (usedPercent > 90) barColor = "bg-red-600";
  else if (usedPercent > 70) barColor = "bg-yellow-400";

  return (
    <div className="mb-6 p-4 border rounded shadow bg-gray-50 dark:bg-gray-800">
      <h2 className="text-xl font-semibold mb-2">Budget Summary</h2>
      <div className="flex justify-between mb-2">
        <div>Allocated: <strong>Rs {allocated.toLocaleString()}</strong></div>
        <div>Used: <strong>Rs {used.toLocaleString()}</strong></div>
        <div>Remaining: <strong>Rs {remaining.toLocaleString()}</strong></div>
      </div>
      <div className="w-full h-5 bg-gray-300 rounded overflow-hidden dark:bg-gray-700">
        <div className={`${barColor} h-5 rounded`} style={{ width: `${usedPercent}%` }}></div>
      </div>
      <div className="text-right text-sm mt-1">{usedPercent.toFixed(1)}% used</div>
    </div>
  );
}
