import React, { useEffect, useState, useMemo } from "react";
import { format, parseISO, isWithinInterval } from "date-fns";
import StatsSummary from "./components/StatsSummary";
import FiltersPanel from "./components/FiltersPanel";
import ExpenseTable from "./components/ExpenseTable";
import Charts from "./components/Charts";
import DarkModeToggle from "./components/DarkModeToggle";
import RefreshButton from "./components/RefreshButton";
import PinPrompt from "./components/PinPrompt";

const ALLOCATED_AMOUNT = 2485000;

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(
    localStorage.getItem("pin_verified") === "true"
  );
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    workType: "",
    expenseType: "",
    description: "",
    paidTo: "",
  });
  const [darkMode, setDarkMode] = useState(true);
  const [error, setError] = useState("");

  const fetchData = () => {
    setLoading(true);
    const url = `https://script.google.com/macros/s/AKfycbwfIPkOJ7x5haIHSaDSfHTv2L5-cdDVReTNDnHp-wbR7oiKWgFNJDLDGinc_Bq5vWnPSQ/exec`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError("Invalid PIN. Please try again.");
          setLoading(false);
          return;
        }

        const parsedData = data.map((item) => ({
          ...item,
          Date: item.Date,
          Amount: Number(item.Amount) || 0,
        }));
        setExpenses(parsedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Error fetching data");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isVerified) {
      fetchData();
    }
  }, [isVerified]);

  const filteredExpenses = useMemo(() => {
    return expenses.filter((item) => {
      if (filters.dateFrom && filters.dateTo) {
        if (!item.Date) return false;
        if (
          !isWithinInterval(parseISO(item.Date), {
            start: parseISO(filters.dateFrom),
            end: parseISO(filters.dateTo),
          })
        )
          return false;
      }
      if (
        filters.workType &&
        item["Work type"]?.toLowerCase() !== filters.workType.toLowerCase()
      )
        return false;
      if (
        filters.expenseType &&
        item["Expense Type"]?.toLowerCase() !== filters.expenseType.toLowerCase()
      )
        return false;
      if (
        filters.description &&
        !item.Description?.toLowerCase().includes(filters.description.toLowerCase())
      )
        return false;
      if (
        filters.paidTo &&
        !item["Paid to"]?.toLowerCase().includes(filters.paidTo.toLowerCase())
      )
        return false;
      return true;
    });
  }, [expenses, filters]);

  const totalUsed = useMemo(() => {
    return filteredExpenses.reduce((sum, item) => sum + item.Amount, 0);
  }, [filteredExpenses]);

  // ⛔️ Block app until PIN is verified
  if (!isVerified) {
    return <PinPrompt onSuccess={() => setIsVerified(true)} />;
  }

  return (
    <div
      className={
        darkMode
          ? "dark bg-gray-900 text-gray-100 min-h-screen"
          : "bg-white text-gray-900 min-h-screen"
      }
    >
      <div className="max-w-4xl mx-auto p-4">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">House Construction Expenses</h1>
          <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </header>

        <StatsSummary allocated={ALLOCATED_AMOUNT} used={totalUsed} />
        <FiltersPanel
          filters={filters}
          setFilters={setFilters}
          expenses={expenses}
        />
        <RefreshButton onClick={() => fetchData()} loading={loading} />

        {loading ? (
          <div className="text-center mt-8">Loading data...</div>
        ) : (
          <>
            <Charts expenses={filteredExpenses} />
            <ExpenseTable expenses={filteredExpenses} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
