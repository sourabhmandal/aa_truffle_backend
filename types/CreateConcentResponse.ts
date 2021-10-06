export type CreateConcentResponse = {
  ConsentHandle?: string;
  Customer?: Customer;
  timestamp?: Date;
  txnid?: string;
  ver?: string;
};

interface Customer {
  id?: string;
}
