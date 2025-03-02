'use client'; // Client-side rendering

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl mb-4">Welcome to Our E-Commerce</h1>
        <p className="text-lg mb-6">Your go-to place for amazing products!</p>

        <div className="space-x-4">
          <Link href="/auth/login">
            <button className="bg-blue-500 text-white p-2 rounded">Login</button>
          </Link>
          <Link href="/products">
            <button className="bg-green-500 text-white p-2 rounded">Browse Products</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
