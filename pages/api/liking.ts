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
  switch (req.method?.toUpperCase()) {
    case "GET": {
      const records = await getRecords();
      res.status(200).json(records);
    }
    case "POST": {
      if (isNewRecord(req.body)) {
        const result = await setRecord(req.body);
        res.status(200);
      }
    }
  }
}
