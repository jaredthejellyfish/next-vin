import React from "react";
import Image from "next/image";
import Head from "next/head";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import verifyToken from "@/utils/verifyToken";
import { unstable_cache } from "next/cache";
import getVinData from "@/utils/getVinData";
import getCarImage from "@/utils/getCarImage";
import VinLookupTable from "@/components/vin-lookup-table";
import { redirect } from "next/navigation";

type Props = { searchParams: { vin: string; token: string } };

export async function generateMetadata({ searchParams: { vin, token } }: Props) {
  return {
    title: `Vin Decoder - ${vin}`,
  }
}

async function VinResult({ searchParams: { vin, token } }: Props) {
  const isValidToken = await verifyToken(token);
  const bypassToken = process.env.NEXT_PUBLIC_BYPASS_TOKEN === "true";

  if (!bypassToken && !isValidToken) {
    return redirect("/");
  }

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
      <>
        <Head>
          <title>Error - VIN Lookup Results</title>
          <meta name="description" content="An error occurred while fetching VIN data." />
          <meta name="robots" content="noindex" />
        </Head>
        <div className="min-h-screen dark:bg-neutral-900 p-6 md:p-10 flex items-center justify-center">
          <Alert variant="destructive" role="alert">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Error fetching VIN data. Please try again later.</AlertDescription>
          </Alert>
        </div>
      </>
    );
  }

  const pageTitle = `VIN Lookup Results for ${data.year} ${data.make} ${data.model}`;
  const pageDescription = `Vehicle details for VIN ${vin}: ${data.year} ${data.make} ${data.model}`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        {imageUrl && <meta property="og:image" content={imageUrl} />}
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`https://yourdomain.com/vin-results?vin=${vin}`} />
      </Head>
      <div className="min-h-screen dark:bg-neutral-900 p-6 md:p-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-neutral-100 mb-8 text-center">
            VIN Lookup Results for {data.year} {data.make} {data.model}
          </h1>
          {imageUrl && (
            <section className="mb-8" aria-labelledby="vehicle-image-heading">
              <h2 id="vehicle-image-heading" className="text-2xl font-semibold text-gray-800 dark:text-neutral-100 mb-4">
                Vehicle Image
              </h2>
              <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={imageUrl}
                  alt={`${data.year} ${data.make} ${data.model}`}
                  layout="fill"
                  objectFit="contain"
                  className="transition-opacity duration-300 hover:opacity-90"
                  priority
                />
              </div>
            </section>
          )}
          <section className="rounded-lg overflow-hidden" aria-labelledby="vehicle-details-heading">
            <h2 id="vehicle-details-heading" className="sr-only">Vehicle Details</h2>
            <VinLookupTable vinData={data} />
          </section>
        </div>
      </div>
    </>
  );
}

export default VinResult;