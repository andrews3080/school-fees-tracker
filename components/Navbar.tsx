import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{
      padding: "1rem",
      borderBottom: "1px solid #ccc",
      display: "flex",
      gap: "1rem"
    }}>
      <Link href="/">Home</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/students">Students</Link>
      <Link href="/students/add">Add Student</Link>
    </nav>
  );
}
