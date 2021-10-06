import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { randomUUID } from "crypto";
import { Request, Response } from "express";
import rs, { KJUR } from "jsrsasign";
import { CreateConcentRequest } from "../types/CreateConcentRequest";
import { CreateConcentResponse } from "../types/CreateConcentResponse";

var rsu = require("jsrsasign-util");
var pem = rsu.readFile("signing.pem");
var prvKey = rs.KEYUTIL.getKey(pem, "passwd");

let base_url = "https://aa-sandbox.setu.co";

export async function getConcent(req: Request, res: Response) {
  // STEP 1 :: Create a consent
  let date: Date = new Date();
  let expDate: Date = new Date();
  expDate.setFullYear(2022);
  let FUIStartDate: Date = new Date();
  FUIStartDate.setFullYear(2019);
  let FUIEndDate: Date = new Date();
  FUIEndDate.setFullYear(2020);

  let phone: String = req.body["phone_no"];
  const header = { alg: "RS256", typ: "JWT" };
  let data: CreateConcentRequest = {
    ver: "1.0",
    timestamp: date,
    txnid: randomUUID(),
    ConsentDetail: {
      consentStart: date,
      consentExpiry: expDate,
      consentMode: "VIEW",
      fetchType: "ONETIME",
      consentTypes: ["TRANSACTIONS", "PROFILE", "SUMMARY"],
      fiTypes: ["DEPOSIT", "BONDS", "INSURANCE_POLICIES", "PPF"],
      DataConsumer: {
        id: "FUIAA",
      },
      Customer: {
        id: `${phone}@setu-aa`,
      },
      Purpose: {
        code: "101",
        refUri: "https://api.rebit.org.in/aa/purpose/101.xml",
        text: "Wealth management service",
        Category: {
          type: "string",
        },
      },
      FIDataRange: {
        from: FUIStartDate,
        to: FUIEndDate,
      },
      DataLife: {
        unit: "MONTH",
        value: 0,
      },
      Frequency: {
        unit: "MONTH",
        value: 3,
      },
      DataFilter: [
        {
          type: "TRANSACTIONAMOUNT",
          operator: ">=",
          value: "10",
        },
      ],
    },
  };

  let config: AxiosRequestConfig<typeof data> = {
    headers: {
      client_api_key: "a4b6d681-9a1a-491a-993a-6e52d4ad4241",
      "x-jws-signature": _getJWS(header, data, pem),
    },
  };
  try {
    let resp = await axios.post(`${base_url}/Consent`, data, config);
    res.send(resp.data);
    console.log(resp?.data);
  } catch (e: any) {
    console.error(e);
  }
}

// =============================================================

type JWSheader = { alg: string; typ: string };
type JWSdata = string | object;
type JWSpem = string | undefined | { [type: string]: string };
// generate JWS Encryption
function _getJWS(header: JWSheader, data: JWSdata, pem: JWSpem): string {
  var jws = KJUR.jws.JWS.sign(null, header, data, pem);
  let splittedJWS = jws.split(".");
  //console.log(splittedJWS);

  splittedJWS[1] = "";
  jws = splittedJWS.join(".");
  return jws;
}
