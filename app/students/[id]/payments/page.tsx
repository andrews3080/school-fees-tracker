"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function PaymentHistory() {
  const params = useParams();
  const id = params?.id as string;

  const [payments, setPayments] = useState<any[]>([]);
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
  fetch(`/api/students/${id}`)
    .then((res) => res.json())
    .then((data) => setStudent(data));

  fetch(`/api/payments?studentId=${id}`)
    .then((res) => res.json())
    .then((data) => setPayments(data));
}, [id]);


  return (
    <div>
      <a
        href={`/payments/add?studentId=${id}`}
        style={{
          display: "inline-block",
          marginBottom: "15px",
          background: "green",
          color: "white",
          padding: "8px 14px",
          textDecoration: "none",
          borderRadius: "4px",
        }}
      >
        + Add Payment
      </a>

     <h2>
      Payments for {""}
      <span style={{ color: "#2563eb" }}>
        {student?.full_name}
      </span>
    </h2>

    <a
      href="/students"
      style={{
        display: "inline-block",
        marginBottom: "15px",
        color: "#2563eb",
        textDecoration: "underline",
      }}
    >
      ← Back to Students
    </a>


      {payments.length === 0 ? (
        <p>No payments found</p>
      ) : (
        <table border={1} cellPadding={8} cellSpacing={0}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount Paid</th>
              <th>Method</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p) => (
              <tr key={p.id}>
                <td>{p.payment_date}</td>

                <td>
                  <input
                    type="number"
                    defaultValue={p.amount_paid}
                    onBlur={async (e) => {
                      await fetch("/api/payments", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          id: p.id,
                          amount_paid: Number(e.target.value),
                          method: p.method,
                        }),
                      });
                    }}
                  />
                </td>

                <td>{p.method}</td>

                <td>
                  <button
        style={{ color: "red" }}
        onClick={async () => {
          if (!confirm("Delete this payment?")) return;

          const res = await fetch("/api/payments", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentId: p.id }),
          });

          const data = await res.json();

          if (!res.ok) {
            alert(data.error);
            return;
          }

          // Refresh payments list
          setPayments((prev) => prev.filter(pay => pay.id !== p.id));
        }}
      >
        Delete
      </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
