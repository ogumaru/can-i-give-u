import type { NextApiRequest, NextApiResponse } from "next";
import { getRecords, setRecord } from "../../controller/db_access";
import { ILikingItemClient, INewRecord } from "../../component/typedef";

const isNewRecord = (arg: any): arg is INewRecord => {
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
          res.status(200);
        }
      }
      default: {
        res.status(500);
      }
    }
  } catch {
    res.status(500);
  }
}
