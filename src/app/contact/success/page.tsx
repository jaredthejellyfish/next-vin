import React from "react";
import { CheckCircle } from "lucide-react";

const ContactSuccessPage = () => {
  return (
    <div className="dark:bg-neutral-900 p-6 md:p-10 mt-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-neutral-100 mb-8 text-center">
          Message Sent Successfully
        </h1>

        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center justify-center mb-6">
            <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-neutral-100">
              Thank You!
            </h2>
          </div>
          <p className="text-gray-600 dark:text-neutral-300 mb-6 text-center">
            Your message has been received. We&apos;ll get back to you as soon as possible.
          </p>
          <div className="text-center">
            <a
              href="/"
              className="inline-block py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Return to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSuccessPage;