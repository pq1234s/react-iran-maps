"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">
              نمونه‌های ChoroplethMap
            </h1>
          </div>
          <div className="flex space-x-4 space-x-reverse" dir="rtl">
            <Link
              href="/"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === "/"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              نمونه‌های پایه
            </Link>
            <Link
              href="/advanced"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === "/advanced"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              نمونه‌های پیشرفته
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
