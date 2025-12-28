import { NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function GET() {
  const result = await pool.query(`
    SELECT
      s.id,
      s.full_name,
      s.student_type,
      s.class_name,
      s.academic_year,
      s.total_fees,
      COALESCE(SUM(p.amount_paid), 0) AS amount_paid
    FROM students s
    LEFT JOIN payments p ON s.id = p.student_id
    GROUP BY s.id
    ORDER BY s.id DESC
  `);

  return NextResponse.json(result.rows);
}


export async function POST(request: Request) {
  const body = await request.json();

  await pool.query(
    `INSERT INTO students 
    (id, full_name, student_type, class_name, academic_year, total_fees)
    VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      body.id,
      body.fullName,
      body.studentType,
      body.className,
      body.academicYear,
      body.totalFees,
    ]
  );

  return NextResponse.json(
    { message: "Student saved to database" },
    { status: 201 }
  );
}

export async function PUT(req: Request) {
  try {
    const {
      id,
      full_name,
      student_type,
      class_name,
      academic_year,
      total_fees,
    } = await req.json();

    await pool.query(
      `UPDATE students SET
        full_name = $1,
        student_type = $2,
        class_name = $3,
        academic_year = $4,
        total_fees = $5
       WHERE id = $6`,
      [
        full_name,
        student_type,
        class_name,
        academic_year,
        total_fees,
        id,
      ]
    );

    return NextResponse.json({ message: "Student updated" });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update student" },
      { status: 500 }
    );
  }
}



export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Student ID is required" },
        { status: 400 }
      );
    }

    // 1️⃣ Delete related payments first (IMPORTANT)
    await pool.query(
      "DELETE FROM payments WHERE student_id = $1",
      [id]
    );

    // 2️⃣ Delete student
    const result = await pool.query(
      "DELETE FROM students WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("DELETE STUDENT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to delete student" },
      { status: 500 }
    );
  }
}






