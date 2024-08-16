type Result = {
  Value: string | null;
  ValueId: string | null;
  Variable: string;
  VariableId: number;
};

type VehicleResponse = {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: Result[];
};

type VinLookupResponse = {
  error: boolean
  data: VehicleResponse["Results"] | null
  imageUrl: string | null
}

export type { Result, VehicleResponse, VinLookupResponse };