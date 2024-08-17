import { VehicleResponse, VinLookupResponse } from "@/types";
import nhtsa from "@joshmakar/nhtsa";

const error = () => {
  return {
    error: true,
    data: null,
    make: null,
    model: null,
  };
};

export default async function getVinData(
  vin: string
): Promise<VinLookupResponse> {
  try {
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

    const make = filteredResults.find(
      (item) => item.Variable === "Make"
    )?.Value;
    const model = filteredResults.find(
      (item) => item.Variable === "Model"
    )?.Value;

    return {
      error: false,
      data: [...filteredResults],
      make: make || null,
      model: model || null,
    };
  } catch (e) {
    console.error("Error fetching VIN data:", (e as Error).message);
    return error();
  }
}
