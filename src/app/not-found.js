"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center p-4">
      <div className="text-[100px] md:text-[150px]">😕</div>
      <h1 className="text-3xl md:text-5xl font-bold text-[#207dff] mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-base md:text-lg text-black mb-6 max-w-md">
      We couldn’t find what you were looking for. The page or doctor profile might have been moved or doesn’t exist.

      </p>
      <Link
        href="/"
        className="bg-[#207dff] hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
      >
        Back to Home
      </Link>
    </div>
  );
}
