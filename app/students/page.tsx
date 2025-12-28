"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Student = {
  id: number;
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

  return (
    <>
      <h2>Students</h2>

      <input 
        type = "text"
        placeholder="🔍Search by name, ID or class"
        value = {search}
        onChange ={(e) => setSearch(e.target.value)}
        style= {{
          padding: "8px",
          width: "100%",
          maxWidth: "400px",
          marginBottom: "1rem",
          border: "1px solid #ccc",
          borderRadius: "4px",}}
      />
        
      
      
      

      {students.length === 0 && <p>No students added yet.</p>}

      {students.filter((s) => {
    const term = search.toLowerCase();
    return (
      s.full_name.toLowerCase().includes(term) ||
      s.class_name.toLowerCase().includes(term) ||
      String(s.id).includes(term)
        );
      }).map((s) => (

        <div
          key={s.id}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <p><strong>{s.full_name}</strong></p>
          <p>ID: {s.id}</p>
          <p>Type: {s.student_type}</p>
          <p>Class: {s.class_name}</p>
          <p>Academic Year: {s.academic_year}</p>
          <p>Total Fees: GHS {s.total_fees}</p>
          <p>Amount Paid: GHS {s.amount_paid}</p>
          <p>Balance: GHS {s.total_fees - s.amount_paid}</p>

          {/* DELETE BUTTON ✅ */}
          <button
     onClick={async () => {
      const res = await fetch("/api/students", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: s.id }),
    });

    if (res.ok) {
      setStudents((prev) =>
        prev.filter((stu) => stu.id !== s.id)
      );
    }
  }}
>
  Delete
</button>


  


          <a
        href={`/students/${s.id}/payments`}
        style={{
          display: "inline-block",
          marginRight: "10px",
          padding: "6px 12px",
          background: "#2563eb",
          color: "white",
          textDecoration: "none",
          borderRadius: "4px",
        }}
      >
        View Payments
      </a>

        </div>
      ))}
    </>
  );
}
