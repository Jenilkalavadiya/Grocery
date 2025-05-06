// pages/404.js
"use client";
import Link from "next/link";

export default function Custom404() {

 

  return (
    <div className="min-h-screen bg-slate-600 text-white flex items-center justify-center ">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">
          Oops! The page youre looking for does not exist.
        </p>
        <div className="mt-8">
          <p className="mb-4">Let’s get you back on track.</p>
          <Link href="/" className="text-xl text-blue-500 hover:underline">
            <p> Go to Homepage </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
