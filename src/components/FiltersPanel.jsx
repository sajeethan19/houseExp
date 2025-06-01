import React from "react";
import { format, parseISO } from "date-fns";

export default function FiltersPanel({ filters, setFilters, expenses }) {
  // Extract unique values for dropdowns
  const workTypes = Array.from(new Set(expenses.map((e) => e["Work type"]).filter(Boolean)));
  const expenseTypes = Array.from(new Set(expenses.map((e) => e["Expense Type"]).filter(Boolean)));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mb-6 p-4 border rounded shadow bg-gray-50 dark:bg-gray-800">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Date From */}
        <div>
          <label className="block mb-1 font-medium">Date From</label>
          <input
            type="date"
            name="dateFrom"
            value={filters.dateFrom}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
          />
        </div>

        {/* Date To */}
        <div>
          <label className="block mb-1 font-medium">Date To</label>
          <input
            type="date"
            name="dateTo"
            value={filters.dateTo}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
          />
        </div>

        {/* Work Type */}
        <div>
          <label className="block mb-1 font-medium">Work Type</label>
          <select
            name="workType"
            value={filters.workType}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="">All</option>
            {workTypes.map((wt) => (
              <option key={wt} value={wt}>{wt}</option>
            ))}
          </select>
        </div>

        {/* Expense Type */}
        <div>
          <label className="block mb-1 font-medium">Expense Type</label>
          <select
            name="expenseType"
            value={filters.expenseType}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="">All</option>
            {expenseTypes.map((et) => (
              <option key={et} value={et}>{et}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="sm:col-span-1">
          <label className="block mb-1 font-medium">Description</label>
          <input
            type="text"
            name="description"
            value={filters.description}
            onChange={handleChange}
            placeholder="Search description"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
          />
        </div>

        {/* Paid To */}
        <div className="sm:col-span-1">
          <label className="block mb-1 font-medium">Paid To</label>
          <input
            type="text"
            name="paidTo"
            value={filters.paidTo}
            onChange={handleChange}
            placeholder="Search paid to"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
          />
        </div>
      </div>
    </div>
  );
}
