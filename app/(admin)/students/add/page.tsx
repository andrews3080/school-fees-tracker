"use client";
import { useState } from "react";
import { students } from "../../../lib/studentsStore";
import { useRouter } from "next/navigation";

const REGULAR_CLASSES = [
  "Nursery 1", "Nursery 2",
  "KG 1", "KG 2",
  "Class 1", "Class 2", "Class 3",
  "Class 4", "Class 5", "Class 6"
];

const NON_REGULAR_CLASSES = ["Form 1", "Form 2", "Form 3"];

export default function AddStudentPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentType, setStudentType] = useState("");
  const [className, setClassName] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [totalFees, setTotalFees] = useState("");

  const classes =
    studentType === "Regular" ? REGULAR_CLASSES :
    studentType === "Non-Regular" ? NON_REGULAR_CLASSES :
    [];

 async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  await fetch("/api/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: studentId,
      fullName,
      studentType,
      className,
      academicYear,
      totalFees: Number(totalFees),
    }),
  });

  router.push("/students");
}

  return (
    <>
      <h2>Add Student</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Full Name" onChange={(e) => setFullName(e.target.value)} /><br /><br />
        <input placeholder="Student ID" onChange={(e) => setStudentId(e.target.value)} /><br /><br />

        <select onChange={(e) => setStudentType(e.target.value)}>
          <option value="">Select Student Type</option>
          <option value="Regular">Regular</option>
          <option value="Non-Regular">Non-Regular</option>
        </select><br /><br />

        <select disabled={!studentType} onChange={(e) => setClassName(e.target.value)}>
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls}>{cls}</option>
          ))}
        </select><br /><br />

        <input
          placeholder="Academic Year (e.g. 2024/2025)"
          onChange={(e) => setAcademicYear(e.target.value)}
        /><br /><br />

        <input
          type="number"
          placeholder="Total Fees"
          onChange={(e) => setTotalFees(e.target.value)}
        /><br /><br />

        <button type="submit">Add Student</button>
      </form>
    </>
  );
}
