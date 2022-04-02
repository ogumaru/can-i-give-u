import type { NextApiRequest, NextApiResponse } from "next";
import {
  getRecords,
  setRecord,
  deleteRecord,
} from "../../controller/db_access";
import { ILikingItemClient, INewRecord } from "../../component/typedef";

const isNewRecord = (arg: any): arg is INewRecord => {
  // TODO: Check
  return true;
};

const isIDList = (arg: unknown): arg is number[] => {
  // TODO: Check
  return true;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ILikingItemClient[]>
) {
  try {
    switch (req.method?.toUpperCase()) {
      case "GET": {
        const records = await getRecords();
        res.status(200).json(records);
      }
      case "POST": {
        const parsed = JSON.parse(req.body);
        if (isNewRecord(parsed)) {
          const result = await setRecord(parsed);
          res.status(200).end();
        }
      }
      case "DELETE": {
        const parsed = JSON.parse(req.body);
        if (isIDList(parsed)) {
          const result = await deleteRecord(parsed);
          res.status(200).end();
        }
      }
      default: {
        res.status(500).end();
      }
    }
  } catch {
    res.status(500).end();
  }
}
