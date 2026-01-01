"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/students", label: "Students" },
    { href: "/payments", label: "Payments" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-gray-100 flex flex-col shadow-lg">
      {/* Logo / School Name */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-extrabold text-red-400 tracking-wide">
          DZENOT SCHOOLS
        </h1>
        <p className="text-sm text-gray-400 mt-1">Fees Management</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-2 rounded-md transition-colors duration-200 ${
              pathname === item.href
                ? "bg-green-500 text-white font-semibold"
                : "hover:bg-gray-800 hover:text-green-400"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 text-xs text-gray-500 border-t border-gray-800">
        © {new Date().getFullYear()} Dzenot Schools
      </div>
    </aside>
  );
}
