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
  recalls: RecallData["results"]
  make: string | null
  model: string | null
  year: string | null
}

type RecallData = {
  Count: number;
  Message: string;
  results: Array<{
    Manufacturer: string;
    NHTSACampaignNumber: string;
    parkIt: boolean;
    parkOutSide: boolean;
    NHTSAActionNumber: string;
    ReportReceivedDate: string;
    Component: string;
    Summary: string;
    Consequence: string;
    Remedy: string;
    Notes: string;
    ModelYear: string;
    Make: string;
    Model: string;
  }>;
};


export type { Result, VehicleResponse, VinLookupResponse , RecallData};