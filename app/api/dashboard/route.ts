import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const studentsResult = await pool.query(`
      SELECT
        COUNT(*) AS total_students,
        COALESCE(SUM(total_fees), 0) AS total_fees
      FROM students
    `);

    const paymentsResult = await pool.query(`
      SELECT
        COALESCE(SUM(amount_paid), 0) AS total_paid
      FROM payments
    `);

    const totalStudents = studentsResult.rows[0].total_students;
    const totalFees = Number(studentsResult.rows[0].total_fees);
    const totalPaid = Number(paymentsResult.rows[0].total_paid);
    const totalOutstanding = totalFees - totalPaid;

    return NextResponse.json({
      totalStudents,
      totalFees,
      totalPaid,
      totalOutstanding,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load dashboard data" },
      { status: 500 }
    );
  }
}
