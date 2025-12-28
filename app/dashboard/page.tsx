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
    <div>
      <h1>Admin Dashboard</h1>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div className="card">
          <h3>Total Students</h3>
          <p>{data.totalStudents}</p>
        </div>

        <div className="card">
          <h3>Total Fees (GHS)</h3>
          <p>{data.totalFees}</p>
        </div>

        <div className="card">
          <h3>Total Paid (GHS)</h3>
          <p>{data.totalPaid}</p>
        </div>

        <div className="card">
          <h3>Outstanding (GHS)</h3>
          <p>{data.totalOutstanding}</p>
        </div>
      </div>
    </div>
  );
}
