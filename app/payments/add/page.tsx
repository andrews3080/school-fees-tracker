"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function PaymentsPage() {
  const searchParams = useSearchParams();
  const studentId = searchParams.get("studentId");

  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("Cash");
  const [note, setNote] = useState("");
  const [payments, setPayments] = useState<any[]>([]);

  async function handleSubmit() {
  if (!studentId) return alert("No student selected");

  const res = await fetch("/api/payments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      student_id: studentId,
      amount_paid: Number(amount),
      method,
      note,
    }),
  });

  const data = await res.json();
  alert(data.message || data.error);

  if (!res.ok) return;

  // Clear form
  setAmount("");
  setNote("");

  // 🔄 Fetch updated payments AFTER successful payment
  const paymentsRes = await fetch(`/api/payments?studentId=${studentId}`);
  const paymentsData = await paymentsRes.json();
  setPayments(paymentsData);
}


  useEffect(() => {
  if (!studentId) return;

  fetch(`/api/payments?studentId=${studentId}`)
  .then(async (res) => {
    if (!res.ok) {
      console.error("Failed to fetch payments");
      return [];
    }

    const text = await res.text();
    return text ? JSON.parse(text) : [];
  })
  .then((data) => setPayments(data))
  .catch((err) => {
    console.error(err);
    setPayments([]);
  });

  }, [studentId]);


  function printReceipt(payment: any){
    const receiptWindow = window.open("","_blank");

    receiptWindow!.document.write(`
    <html>
      <head>
        <title>Payment Receipt</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          h2 { text-align: center; }
          .row { margin-bottom: 6px; }
          .label { font-weight: bold; }
          hr { margin: 15px 0; }
        </style>
      </head>
      <body>
        <h2>ABC BASIC & SECONDARY SCHOOL</h2>
        <p style="text-align:center;">OFFICIAL RECEIPT</p>

        <hr />

        <div class="row"><span class="label">Student ID:</span> ${studentId}</div>
        <div class="row"><span class="label">Receipt No:</span> ${payment.id}</div>
        <div class="row"><span class="label">Amount Paid:</span> GHS ${payment.amount_paid}</div>
        <div class="row"><span class="label">Method:</span> ${payment.method}</div>
        <div class="row"><span class="label">Date:</span> ${new Date(payment.payment_date).toLocaleString()}</div>

        <hr />

        <p>Thank you for your payment.</p>

        <script>
          window.print();
          window.onafterprint = () => window.close();
        </script>
      </body>
    </html>
  `);

  receiptWindow!.document.close();
  }


  return (
    <div>
      <h2>Payments</h2>

      {studentId ? (
        <>
          <p>
            <strong>Student ID:</strong> {studentId}
          </p>

          {/* Add Payment Form */}
          <input
            type="number"
            placeholder="Amount Paid"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option>Cash</option>
            <option>Mobile Money</option>
            <option>Bank Transfer</option>
          </select>

          <textarea
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <button onClick={handleSubmit}>
            Add Payment
          </button>

          <h3>Payment History</h3>

        {payments.length === 0 && <p>No payments yet.</p>}

        {payments.map((p) => (
          <div key={p.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <p>Amount: GHS {p.amount_paid}</p>
            <p>Method: {p.method}</p>
            <p>Date: {new Date(p.payment_date).toLocaleDateString()}</p>

            <button onClick={() => printReceipt(p)}>
              Print Receipt
            </button>
          </div>
        ))}


        </>
      ) : (
        <p>Select a student to view payments</p>
      )}

      
    </div>
  );
}
