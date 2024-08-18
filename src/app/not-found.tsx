import React from "react";
import { FileQuestion } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen dark:bg-neutral-900 p-6 md:p-10 flex flex-col justify-center">
      <div className="max-w-3xl mx-auto w-full">
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center justify-center mb-6">
            <FileQuestion className="h-16 w-16 text-blue-500 mr-4" />
            <h1 className="text-5xl font-bold text-gray-900 dark:text-neutral-100">
              404
            </h1>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-neutral-100 text-center mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-neutral-300 mb-8 text-center">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/"
              className="inline-block py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
