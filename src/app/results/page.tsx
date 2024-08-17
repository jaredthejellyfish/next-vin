import React from "react";
import Image from "next/image";

import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import verifyToken from "@/utils/verifyToken";
import { unstable_cache } from "next/cache";
import getVinData from "@/utils/getVinData";
import getCarImage from "@/utils/getCarImage";
import VinLookupTable from "@/components/vin-lookup-table";
import { redirect } from "next/navigation";

type Props = { searchParams: { vin: string; token: string } };

async function VinResult({ searchParams: { vin, token } }: Props) {
  const isValidToken = await verifyToken(token);
  const bypassToken = process.env.NEXT_PUBLIC_BYPASS_TOKEN === "true";

  if (!bypassToken &&!isValidToken) {
    return redirect("/");
  }

  const getCachedVinData = unstable_cache(
    async (vin) => getVinData(vin),
    [`vin-${vin}`]
  );

  const data = await getCachedVinData(vin);
  const imageUrl = await getCarImage(data.make, data.model);

  if (data.error) {
    return { error: true, carData: null };
  }
  if (data.error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Error fetching VIN data</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="min-h-screen dark:bg-neutral-900 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-neutral-100 mb-8 text-center">
          VIN Lookup Results
        </h1>
        {imageUrl && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-neutral-100 mb-4">
              Vehicle Image
            </h2>
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src={imageUrl}
                alt="Vehicle Image"
                layout="fill"
                objectFit="cover"
                className="transition-opacity duration-300 hover:opacity-90"
              />
            </div>
          </div>
        )}
        <div className="rounded-lg overflow-hidden">
          <VinLookupTable vinData={data} />
        </div>
      </div>
    </div>
  );
}

export default VinResult;
