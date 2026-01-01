"use client";

import { useEffect, useState } from "react";
import Table from "@/components/Table";

type Student = {
  id: string;
  full_name: string;
  student_type: string;
  class_name: string;
  academic_year: string;
  total_fees: number;
  amount_paid: number;
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/students")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  const filteredStudents = students.filter((s) =>
    s.full_name.toLowerCase().includes(search.toLowerCase()) ||
    s.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
<div className="min-h-screen bg-green-100 p-6 space-y-4 rounded-lg shadow-sm">
  <h2 className="text-2xl font-black text-black tracking-wide">Students</h2>

  {/* SEARCH */}
  <input
    type="text"
    placeholder="Search by name or ID..."
    aria-label="Search students"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full max-w-md border border-gray-300 px-3 py-2 rounded text-black font-black placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring focus:ring-green-200"
  />

  {filteredStudents.length === 0 ? (
    <p className="text-gray-500">No students found.</p>
  ) : (
    <div className="overflow-x-auto">
      <Table rows={filteredStudents} />
    </div>
  )}
</div>

  );
}

