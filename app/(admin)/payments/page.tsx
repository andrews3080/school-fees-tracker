"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  
  useEffect(() => {
    // Fetch students from your API
    fetch("/api/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => {
        console.error(err);
        setStudents([]);
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Students</h2>

      {students.length === 0 && <p>No students found.</p>}

      <ul className="space-y-3">
        {students.map((s) => (
          <li
            key={s.id}
            className="border rounded p-3 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{s.name}</p>
              <p className="text-sm text-gray-500">ID: {s.name}</p>
            </div>
            <Link
              href={`/admin/payments?studentName=${encodeURIComponent(s.name)}`}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition">
              View Payments
          </Link>

          </li>
        ))}
      </ul>
    </div>
  );
}
