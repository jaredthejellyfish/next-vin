import React from "react";
import { AlertCircle } from "lucide-react";

const ContactErrorPage = () => {
  return (
    <div className="max-h-screen dark:bg-neutral-900 p-6 md:p-10 mt-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-neutral-100 mb-8 text-center">
          Message Submission Error
        </h1>

        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center justify-center mb-6">
            <AlertCircle className="h-8 w-8 text-red-500 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-neutral-100">
              Oops! Something went wrong.
            </h2>
          </div>
          <p className="text-gray-600 dark:text-neutral-300 mb-6 text-center">
            We encountered an error while sending your message. Please try again.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/contact"
              className="inline-block py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Try Again
            </a>
            <a
              href="/"
              className="inline-block py-2 px-4 border border-gray-300 dark:border-neutral-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-neutral-300 bg-white dark:bg-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Return to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactErrorPage;