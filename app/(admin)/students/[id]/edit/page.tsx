"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditStudent() {
  const { id } = useParams();
  const router = useRouter();
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/students/${id}`)
      .then((res) => res.json())
      .then((data) => setStudent(data));
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("/api/students", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...student, id }),
    });

    router.push("/students");
  };

  if (!student) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={student.full_name}
        onChange={(e) =>
          setStudent({ ...student, full_name: e.target.value })
        }
      />

      <input
        value={student.class_name}
        onChange={(e) =>
          setStudent({ ...student, class_name: e.target.value })
        }
      />

      <input
        value={student.total_fees}
        onChange={(e) =>
          setStudent({ ...student, total_fees: e.target.value })
        }
      />

      <button>Update Student</button>
    </form>
  );
}
