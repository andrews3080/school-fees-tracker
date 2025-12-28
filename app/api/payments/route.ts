import { NextResponse } from "next/server";
import pool from "@/lib/db";

/* =======================
   GET PAYMENTS (HISTORY)
   ======================= */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("studentId");

    if (!studentId) {
      return NextResponse.json([]);
    }

    const result = await pool.query(
      `
      SELECT id, student_id, amount_paid, method, note, payment_date
      FROM payments
      WHERE student_id = $1
      ORDER BY payment_date DESC
      `,
      [studentId]
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json([], { status: 500 });
  }
}

/* =======================
   ADD PAYMENT
   ======================= */
export async function POST(req: Request) {
  const {
    student_id,
    amount_paid,
    method,
    note
  } = await req.json();

  if (!student_id || amount_paid <= 0) {
    return NextResponse.json(
      { error: "Invalid payment data" },
      { status: 400 }
    );
  }

  try {
    const studentRes = await pool.query(
      "SELECT total_fees, amount_paid FROM students WHERE id = $1",
      [student_id]
    );

    if (studentRes.rows.length === 0) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    const student = studentRes.rows[0];
    const balance = student.total_fees - student.amount_paid;

    if (amount_paid > balance) {
      return NextResponse.json(
        { error: "Payment exceeds balance" },
        { status: 400 }
      );
    }

    await pool.query(
      `
      INSERT INTO payments (student_id, amount_paid, method, note)
      VALUES ($1, $2, $3, $4)
      `,
      [student_id, amount_paid, method, note]
    );

    await pool.query(
      `
      UPDATE students
      SET amount_paid = amount_paid + $1
      WHERE id = $2
      `,
      [amount_paid, student_id]
    );

    return NextResponse.json({ message: "Payment added successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}


export async function DELETE(req: Request) {
  try {
    const { paymentId } = await req.json();

    if (!paymentId) {
      return NextResponse.json(
        { error: "Payment ID is required" },
        { status: 400 }
      );
    }

    // 1. Get payment info
    const paymentRes = await pool.query(
      "SELECT student_id, amount_paid FROM payments WHERE id = $1",
      [paymentId]
    );

    if (paymentRes.rows.length === 0) {
      return NextResponse.json(
        { error: "Payment not found" },
        { status: 404 }
      );
    }

    const { student_id, amount_paid } = paymentRes.rows[0];

    // 2. Delete payment
    await pool.query(
      "DELETE FROM payments WHERE id = $1",
      [paymentId]
    );

    // 3. Update student total paid
    await pool.query(
      `
      UPDATE students
      SET amount_paid = amount_paid - $1
      WHERE id = $2
      `,
      [amount_paid, student_id]
    );

    return NextResponse.json({ message: "Payment deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete payment" },
      { status: 500 }
    );
  }
}

