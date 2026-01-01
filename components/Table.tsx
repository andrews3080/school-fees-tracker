"use client";

type StudentRow = {
  id: string;
  full_name: string;
  total_fees: number;
  amount_paid: number;
  student_type  : string;
};

export default function Table({
  rows,
}: {
  rows: StudentRow[];
}) {
  return (
    <table className="w-full bg-white rounded shadow overflow-hidden">
      <thead style={{ backgroundColor: "var(--primary)" }} className="text-white">
        <tr>
          <th className="p-3 text-left">Name</th>
          <th className="p-3 text-left">ID</th>
          <th className="p-3 text-left">Type</th>
          <th className="p-3 text-left">Total Fees</th>
          <th className="p-3 text-left">Paid</th>
          <th className="p-3 text-left">Balance</th>
        </tr>
      </thead>

      <tbody>
        {rows.map((s) => (
          <tr key={s.id} className="border-b hover:bg-gray-100">
            <td className="p-3 font-medium" style={{ color: "black" }}>{s.full_name}</td>
            <td className="p-3 font-medium" style={{ color: "black" }}>{s.id}</td>
            <td className="p-3 font-medium" style={{ color: "black" }}>{s.student_type}</td>
            <td className="p-3 font-medium" style={{ color: "black" }}>GHS {s.total_fees}</td>
            <td className="p-3 font-medium" style={{ color: "black" }}>GHS {s.amount_paid}</td>
            <td className="p-3 font-medium" style={{ color: "black" }}> GHS {s.total_fees - s.amount_paid}
            </td>
          </tr>
        ))}

      </tbody>
    </table>
  );
}
