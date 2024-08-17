"use client";

import { VinLookupResponse } from "@/types";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const tables = [
  { name: "Vehicle Identity", ids: [142, 26, 28, 29, 34, 38, 110, 196] },
  { name: "Manufacturer Details", ids: [27, 31, 75, 76, 77, 10] },
  {
    name: "Physical Characteristics",
    ids: [
      5, 39, 14, 115, 111, 112, 25, 190, 184, 185, 159, 54, 49, 3, 4, 119, 120,
      136, 33, 61, 78, 147, 148, 149, 150, 151, 152, 153, 154,
    ],
  },
  {
    name: "Engine & Transmission",
    ids: [
      9, 11, 12, 13, 18, 17, 71, 125, 146, 24, 66, 62, 37, 63, 15, 41, 145, 135,
      139, 67, 122, 129, 21, 64,
    ],
  },
  {
    name: "Safety Features",
    ids: [
      143, 191, 65, 107, 55, 56, 69, 86, 99, 100, 168, 104, 105, 102, 103, 88,
      101, 81, 87, 170, 171, 183, 174, 175, 176, 172, 193, 194, 192,
    ],
  },
  {
    name: "Battery & Electrical System",
    ids: [
      1, 2, 48, 57, 58, 59, 132, 133, 134, 137, 138, 72, 127, 128, 126, 73, 74,
      131,
    ],
  },
  { name: "Lighting Visibility", ids: [177, 178, 179, 180, 19, 20] },
];

const VinLookupTable = ({ vinData }: { vinData: VinLookupResponse }) => {
  const [expandedTables, setExpandedTables] = useState<string[]>([]);

  if (!vinData?.data) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>No data available.</AlertDescription>
      </Alert>
    );
  }

  const allTableIds = tables.flatMap((table) => table.ids);
  const otherResults = vinData.data.filter(
    (result) => !allTableIds.includes(result.VariableId)
  );

  const toggleTable = (title: string) => {
    setExpandedTables((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const renderTable = (results: VinLookupResponse["data"], title: string) =>
    results &&
    results.length > 0 && (
      <div key={title} className="mb-6">
        <button
          onClick={() => toggleTable(title)}
          className={cn("flex items-center justify-between w-full text-left text-lg font-semibold text-gray-800 dark:text-neutral-100 bg-gray-100 dark:bg-neutral-800 p-4 rounded-t-lg rounded-b-lg hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors", expandedTables.includes(title) && "rounded-b-none")}
        >
          {title}
          {expandedTables.includes(title) ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        {expandedTables.includes(title) && (
          <div className="dark:bg-neutral-900 shadow-md rounded-b-lg overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50 dark:bg-neutral-800 border-t-neutral-700 border-t">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-neutral-400 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-neutral-400 uppercase tracking-wider">
                    Variable
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-neutral-400 uppercase tracking-wider">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                {results.map((result, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-neutral-100">
                      {result.VariableId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-neutral-300">
                      {result.Variable ?? "N/A"}
                    </td>
                    <td
                      className={cn(
                        "px-6 py-4 whitespace-nowrap text-sm font-medium",
                        result.Value === "Optional"
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-gray-900 dark:text-neutral-100"
                      )}
                    >
                      {result.Value || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );

  return (
    <div className="space-y-6">
      {vinData &&
        vinData.data &&
        tables.map((table) =>
          renderTable(
            vinData.data!.filter((result) =>
              table.ids.includes(result.VariableId)
            ),
            table.name
          )
        )}
      {renderTable(otherResults, "Other")}
    </div>
  );
};

export default VinLookupTable;
