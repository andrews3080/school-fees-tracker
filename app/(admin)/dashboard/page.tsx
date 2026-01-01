"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  if (!data) return <p>Loading dashboard...</p>;

  return (
   <div className="p-6 min-h-screen bg-green-100 p-6 space-y-4 rounded-lg shadow-sm">
  <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
      <h3 className="text-m font-bold text-gray-500">Total Students</h3>
      <p className="text-2xl font-bold text-blue-600 mt-2">{data.totalStudents}</p>
    </div>

    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
      <h3 className="text-m font-bold text-gray-500">Total Fees (GH₵)</h3>
      <p className="text-2xl font-bold text-green-600 mt-2">{data.totalFees}</p>
    </div>

    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
      <h3 className="text-m font-bold text-gray-500">Total Paid (GH₵)</h3>
      <p className="text-2xl font-bold text-indigo-600 mt-2">{data.totalPaid}</p>
    </div>

    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
      <h3 className="text-m font-bold text-gray-500">Outstanding (GH₵)</h3>
      <p className="text-2xl font-bold text-red-600 mt-2">{data.totalOutstanding}</p>
    </div>
  </div>
</div>

  );
}
