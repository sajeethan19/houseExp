import React, { useMemo } from "react";
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, LineChart, Line, CartesianGrid, Legend, ResponsiveContainer
} from "recharts";
import { parseISO, format } from "date-fns";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#8dd1e1", "#d0ed57", "#a4de6c", "#ffbb28"];

function groupBy(data, key) {
  return data.reduce((acc, item) => {
    const value = item[key] || "Unknown";
    acc[value] = (acc[value] || 0) + item.Amount;
    return acc;
  }, {});
}

export default function Charts({ expenses }) {
  const workTypeData = Object.entries(groupBy(expenses, "Work type")).map(([name, value]) => ({ name, value }));
  const expenseTypeData = Object.entries(groupBy(expenses, "Expense Type")).map(([name, value]) => ({ name, value }));

  const dailyData = useMemo(() => {
    const daily = {};
    let cumulative = 2485000;

    expenses.forEach((item) => {
      if (!item.Date) return;
      const dateStr = format(parseISO(item.Date), "yyyy-MM-dd");
      daily[dateStr] = (daily[dateStr] || 0) + item.Amount;
    });

    return Object.entries(daily).sort(([a], [b]) => new Date(a) - new Date(b)).map(([date, expense]) => {
      cumulative -= expense;
      return { date, expense, cumulative };
    });
  }, [expenses]);

  return (
    <div className="grid gap-6 md:grid-cols-2 mb-6">
      {/* Pie Chart */}
      <div className="p-4 border rounded bg-white dark:bg-gray-800 dark:text-gray-100 shadow">
        <h3 className="text-lg font-semibold mb-2">Expenses by Work Type</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={workTypeData} dataKey="value" nameKey="name" outerRadius={80} label>
              {workTypeData.map((_, i) => (
                <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
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

      {/* Line Chart - Daily Expenses */}
      <div className="md:col-span-2 p-4 border rounded bg-white dark:bg-gray-800 dark:text-gray-100 shadow">
        <h3 className="text-lg font-semibold mb-2">Date vs Daily Expense and Balance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="expense" stroke="#ff7f50" name="Daily Expense" />
            <Line type="monotone" dataKey="cumulative" stroke="#8884d8" name="Cumulative Balance" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
