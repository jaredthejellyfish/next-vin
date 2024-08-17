"use client"

import React, { FormEvent } from 'react';
import { Mail, Phone, MessageSquare } from 'lucide-react';

const ContactPage = () => {
  // Form submission logic will be implemented later
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Form submission logic will go here
  };

  return (
    <div className="min-h-screen dark:bg-neutral-900 p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-neutral-100 mb-8 text-center">
          Contact Us
        </h1>

        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-700 dark:text-neutral-100"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-700 dark:text-neutral-100"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-700 dark:text-neutral-100"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-700 dark:text-neutral-100"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-gray-700 dark:text-neutral-300">support@vin-decode.com</span>
          </div>
          <div className="flex items-center">
            <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-gray-700 dark:text-neutral-300">(555) 123-4567</span>
          </div>
          <div className="flex items-center">
            <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-gray-700 dark:text-neutral-300">Live chat available 9am-5pm EST</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;