export type CreateConcentRequest = {
  ver?: string;
  timestamp?: Date;
  txnid?: string;
  ConsentDetail?: ConsentDetail;
};

interface ConsentDetail {
  consentStart?: Date;
  consentExpiry?: Date;
  consentMode?: string;
  fetchType?: string;
  consentTypes?: string[];
  fiTypes?: string[];
  DataConsumer?: Mer;
  Customer?: Mer;
  Purpose?: Purpose;
  FIDataRange?: FIDataRange;
  DataLife?: DataLife;
  Frequency?: DataLife;
  DataFilter?: DataFilter[];
}

interface Mer {
  id?: string;
}

interface DataFilter {
  type?: string;
  operator?: string;
  value?: string;
}

interface DataLife {
  unit?: string;
  value?: number;
}

interface FIDataRange {
  from?: Date;
  to?: Date;
}

interface Purpose {
  code?: string;
  refUri?: string;
  text?: string;
  Category?: Category;
}

interface Category {
  type?: string;
}
