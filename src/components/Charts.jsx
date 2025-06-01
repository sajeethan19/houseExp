import React from "react";
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#8dd1e1", "#d0ed57", "#a4de6c", "#ffbb28"];

function groupBy(data, key) {
  return data.reduce((acc, item) => {
    const value = item[key] || "Unknown";
    acc[value] = (acc[value] || 0) + item.Amount;
    return acc;
  }, {});
}

export default function Charts({ expenses }) {
  const workTypeData = Object.entries(groupBy(expenses, "Work type")).map(([name, value]) => ({
    name,
    value,
  }));

  const expenseTypeData = Object.entries(groupBy(expenses, "Expense Type")).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="mb-6 grid gap-6 md:grid-cols-2">
      {/* Pie Chart: Expense by Work Type */}
      <div className="p-4 border rounded bg-white dark:bg-gray-800 dark:text-gray-100 shadow">
        <h3 className="text-lg font-semibold mb-2">Expenses by Work Type</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={workTypeData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label
            >
              {workTypeData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart: Expense by Expense Type */}
      <div className="p-4 border rounded bg-white dark:bg-gray-800 dark:text-gray-100 shadow">
        <h3 className="text-lg font-semibold mb-2">Expenses by Type</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={expenseTypeData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
