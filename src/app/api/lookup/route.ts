import { NextRequest, NextResponse } from "next/server";
import type { VehicleResponse, VinLookupResponse } from "@/types";
import nhtsa from "@joshmakar/nhtsa";

const error = () =>
  NextResponse.json({
    error: true,
    data: null,
    imageUrl: null,
  } as VinLookupResponse);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const vin = searchParams.get("vin");

  if (!vin) {
    console.error("No VIN provided");
    return error();
  }

  const vindecode = (await nhtsa.decodeVinExtended(vin)) as {
    data: VehicleResponse | null;
  };

  if (!vindecode.data) {
    console.error("No data returned from NHTSA");
    return error();
  }

  const filteredResults = vindecode.data.Results.filter(
    (result) =>
      result.Value !== null &&
      result.Value !== "" &&
      result.Value !== "0" &&
      result.Value !== "Not Applicable" &&
      result.Variable !== "Error Text"
  );

  const make = filteredResults.find((item) => item.Variable === "Make")?.Value;
  const model = filteredResults.find(
    (item) => item.Variable === "Model"
  )?.Value;

  const res = await fetch(
    `https://www.carimagery.com/api.asmx/GetImageUrl?searchTerm=${make}+${model}`
  );
  const data = await res.text();
  const match = data.match(/<string[^>]*>([^<]*)<\/string>/);
  const imageUrl = match ? match[1].replace("http://", "https://") : null;

  return NextResponse.json({
    error: false,
    data: [...filteredResults],
    imageUrl,
  } as VinLookupResponse);
}
