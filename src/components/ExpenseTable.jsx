import React from "react";
import { format, parseISO } from "date-fns";

export default function ExpenseTable({ expenses }) {
    return (
        <div className="overflow-x-auto mb-6">
            <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-700 text-sm">
                <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700">
                        <th className="border border-gray-300 dark:border-gray-600 px-2 py-1">Date</th>
                        <th className="border border-gray-300 dark:border-gray-600 px-2 py-1">Description</th>
                        <th className="border border-gray-300 dark:border-gray-600 px-2 py-1">Bill No</th>
                        <th className="border border-gray-300 dark:border-gray-600 px-2 py-1">Amount</th>
                        <th className="border border-gray-300 dark:border-gray-600 px-2 py-1">Work Type</th>
                        <th className="border border-gray-300 dark:border-gray-600 px-2 py-1">Expense Type</th>
                        <th className="border border-gray-300 dark:border-gray-600 px-2 py-1">Paid To</th>
                        <th className="border border-gray-300 dark:border-gray-600 px-2 py-1">Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="text-center p-4">
                                No expenses found.
                            </td>
                        </tr>
                    ) : (
                        expenses.map((exp, i) => (
                            <tr key={i} className="border-t dark:border-gray-600">
                                <td className="px-2 py-1">{exp.Date ? format(parseISO(exp.Date), "dd/MM/yyyy") : ""}</td>
                                <td className="px-2 py-1">{exp.Description}</td>
                                <td className="px-2 py-1">{exp["Bill No"]}</td>
                                <td className="px-2 py-1">₹{exp.Amount.toLocaleString()}</td>
                                <td className="px-2 py-1">{exp["Work type"]}</td>
                                <td className="px-2 py-1">{exp["Expense Type"]}</td>
                                <td className="px-2 py-1">{exp["Paid to"]}</td>
                                <td className="px-2 py-1">{exp.Notes}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}


