import React from "react";
import Image from "next/image";
import { VinLookupResponse } from "@/types";
import getVinData from "@/utils/getVinData";
import { cn } from "@/utils/cn";
import { unstable_cache } from "next/cache";

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

async function verifyToken(token: string) {
  const form = new FormData();
  form.append("secret", process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY ?? "");
  form.append("response", token);

  const result = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body: form }
  );

  const outcome = await result.json();

  return outcome.success;
}

const VinLookupTable: React.FC<{ vinData: VinLookupResponse }> = ({
  vinData,
}) => {
  if (!vinData?.data)
    return <p className="text-center text-gray-500">No data available.</p>;

  const allTableIds = tables.flatMap((table) => table.ids);
  const otherResults = vinData.data.filter(
    (result) => !allTableIds.includes(result.VariableId)
  );

  const renderTable = (results: VinLookupResponse["data"], title: string) =>
    results &&
    results.length > 0 && (
      <div key={title} className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-neutral-100 mb-4">
          {title}
        </h2>
        <table className="min-w-full bg-white shadow rounded-md overflow-hidden">
          <thead className="bg-gray-50 dark:bg-neutral-700">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-neutral-200 uppercase tracking-wider"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-neutral-200 uppercase tracking-wider"
              >
                Variable
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-neutral-200 uppercase tracking-wider"
              >
                Value
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-neutral-800">
            {results.map((result, index) => (
              <tr
                key={index}
                className="odd:bg-gray-50 even:bg-white dark:odd:bg-neutral-900 dark:even:bg-neutral-800"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                  {result.VariableId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                  {result.Variable ?? "N/A"}
                </td>
                <td
                  className={cn(
                    "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200",
                    result.Value === "Optional" &&
                      "text-red-600 dark:text-red-400"
                  )}
                >
                  {result.Value || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

  return (
    <div className="bg-gray-100 dark:bg-neutral-900 min-h-screen p-8">
      {tables.map((table) =>
        renderTable(
          vinData.data &&
            vinData.data.filter((result) =>
              table.ids.includes(result.VariableId)
            ),
          table.name
        )
      )}
      {renderTable(otherResults, "Other")}
    </div>
  );
};

type Props = { searchParams: { vin: string; token: string } };

async function VinResult({ searchParams: { vin, token } }: Props) {
  const isValidToken = await verifyToken(token);

  if (!isValidToken) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-neutral-900 p-10">
        <p className="text-red-500">CAPTCHA verification failed</p>
      </main>
    );
  }
  
  const getCachedVinData = unstable_cache(
    async (vin) => getVinData(vin),
    [`vin-${vin}`]
  );

  const data = await getCachedVinData(vin);

  if (data.error) {
    return { error: true, carData: null };
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-neutral-900 p-10">
      {data.error && <p className="text-red-500">Error fetching VIN data</p>}

      {data && data.data && (
        <div className="w-full max-w-4xl mt-8 bg-white dark:bg-neutral-800 shadow-lg rounded-lg p-6">
          {data.imageUrl && (
            <div className="mb-8 text-center">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-100 mb-4">
                Car Image
              </h2>
              <Image
                src={data.imageUrl}
                alt="Car Image"
                width={400}
                height={300}
                className="rounded-md shadow-lg"
              />
            </div>
          )}
          <VinLookupTable vinData={data} />
        </div>
      )}
    </main>
  );
}

export default VinResult;
