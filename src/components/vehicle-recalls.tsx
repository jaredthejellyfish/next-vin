"use client";

import { RecallData } from "@/types";
import { cn } from "@/utils/cn";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";

const VehicleRecalls = ({ recalls }: { recalls: RecallData["results"] }) => {
  const [expandedRecalls, setExpandedRecalls] = useState<string[]>([]);

  if (!recalls || recalls.length === 0) return null;

  const toggleRecall = (recallNumber: string) => {
    setExpandedRecalls((prev) =>
      prev.includes(recallNumber)
        ? prev.filter((r) => r !== recallNumber)
        : [...prev, recallNumber]
    );
  };

  return (
    <section className="mb-10" aria-labelledby="recalls-heading">
      <h2
        id="recalls-heading"
        className="text-2xl font-bold text-gray-900 dark:text-neutral-100 mb-4"
      >
        Recalls
      </h2>
      {recalls.length > 0 ? (
        <div className="space-y-6">
          {recalls.map((recall, index) => (
            <div key={index} className="mb-6">
              <button
                onClick={() => toggleRecall(recall.NHTSACampaignNumber)}
                className={cn(
                  "flex items-center justify-between w-full text-left text-lg font-semibold text-gray-800 dark:text-neutral-100 bg-gray-100 dark:bg-neutral-800 p-4 rounded-t-lg rounded-b-lg hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors",
                  expandedRecalls.includes(recall.NHTSACampaignNumber) &&
                    "rounded-b-none"
                )}
              >
                <div className="flex items-center gap-x-2">
                  <span>
                    Recall #{index + 1}: {recall.NHTSACampaignNumber}
                  </span>
                </div>
                {expandedRecalls.includes(recall.NHTSACampaignNumber) ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              {expandedRecalls.includes(recall.NHTSACampaignNumber) && (
                <div className="dark:bg-neutral-900 shadow-md rounded-b-lg overflow-hidden">
                  <table className="min-w-full">
                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                      <tr className="hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-neutral-100">
                          Component
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-neutral-300">
                          {recall.Component}
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-neutral-100">
                          Summary
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-neutral-300">
                          {recall.Summary}
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-neutral-100">
                          Consequence
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-neutral-300">
                          {recall.Consequence}
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-neutral-100">
                          Remedy
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-neutral-300">
                          {recall.Remedy}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-neutral-400">
          No recalls found for this vehicle.
        </p>
      )}
    </section>
  );
};

export default VehicleRecalls;
