import React from "react";
import Image from "next/image";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { unstable_cache } from "next/cache";
import getVinData from "@/utils/getVinData";
import getCarImage from "@/utils/getCarImage";
import VinLookupTable from "@/components/vin-lookup-table";

type Props = {
  params: { vin: string };
};

export async function generateMetadata({ params: { vin } }: Props) {
  const getCachedVinData = unstable_cache(
    async (vin) => getVinData(vin),
    [`vin-${vin}`]
  );

  const vehicle = await getCachedVinData(vin);

  const imageUrl = getCarImage(
    {
      make: vehicle.make ?? "",
      model: vehicle.model ?? "",
      year: vehicle.year ?? "",
    },
    "0"
  );

  if (vehicle.error) {
    return {
      title: "Error - VIN Decode",
      description: "Error fetching VIN data. Please try again later.",
      openGraph: {
        title: "Error - VIN Decode",
        description: "Error fetching VIN data. Please try again later.",
      },
    };
  }

  return {
    title: `Vin Decoder - ${vin}`,
    description: `Detailed information for VIN ${vin}. Learn about the ${vehicle.make} ${vehicle.model} on VIN-Decode.com.`,
    openGraph: {
      title: `${vehicle.make} ${vehicle.model} - VIN Decoder`,
      description: `Detailed information for VIN ${vin}. Learn about the ${vehicle.make} ${vehicle.model} on VIN-Decode.com.`,
      url: `https://vin-decode.com/results/${vin}`,
      images: [imageUrl],
    },
  };
}

async function VinResult({ params: { vin } }: Props) {
  const getCachedVinData = unstable_cache(
    async (vin) => getVinData(vin),
    [`vin-${vin}`]
  );

  const data = await getCachedVinData(vin);
  const imageUrl = getCarImage(
    { make: data.make ?? "", model: data.model ?? "", year: data.year ?? "" },
    "0"
  );

  if (data.error) {
    return (
      <div className="min-h-screen dark:bg-neutral-900 p-6 md:p-10 flex items-center justify-center mt-16">
        <Alert variant="destructive" role="alert">
          <AlertCircle className="h-4 w-4" aria-hidden="true" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Error fetching VIN data. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-neutral-900 p-6 md:p-10 mt-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-neutral-100 mb-8 text-center">
          VIN Lookup Results for {data.year} {data.make} {data.model}
        </h1>
        {imageUrl && (
          <section className="mb-4" aria-labelledby="vehicle-image-heading">
            <h2
              id="vehicle-image-heading"
              className="text-2xl font-semibold text-gray-800 dark:text-neutral-100 mb-4"
            >
              Vehicle Image
            </h2>
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
              <Image
                src={imageUrl}
                alt={`${data.year} ${data.make} ${data.model}`}
                layout="fill"
                className="transition-opacity duration-300 hover:opacity-90 object-contain"
                priority
              />
            </div>
          </section>
        )}
        <section
          className="rounded-lg overflow-hidden"
          aria-labelledby="vehicle-details-heading"
        >
          <h2 id="vehicle-details-heading" className="sr-only">
            Vehicle Details
          </h2>
          <VinLookupTable vinData={data} />
        </section>
      </div>
    </div>
  );
}

export default VinResult;
