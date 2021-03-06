import type { NextApiRequest, NextApiResponse } from "next";
import {
  getRecords,
  setRecord,
  deleteRecord,
} from "../../controller/db_access";
import {
  ILikingItemClient,
  INewRecord,
  ICreatedResponse,
  IDeletedResponse,
  IReadResponse,
} from "../../component/typedef";
import { Liking, Prisma } from "@prisma/client";

const isNewRecord = (arg: unknown): arg is INewRecord => {
  if (!arg) return false;
  if (typeof arg !== "object") return false;
  const { displayName, isAllergy, isLike, description, alias } =
    arg as INewRecord;
  const conditions = [
    typeof displayName === "string",
    typeof isAllergy === "boolean",
    typeof isLike === "boolean",
    description === null || typeof description === "string",
    Array.isArray(alias) &&
      alias
        .map((alias) => typeof alias === "string")
        .every((isString) => isString === true),
  ];
  return conditions.every((condition) => condition === true);
};

const isIDList = (arg: unknown): arg is number[] => {
  if (!arg) return false;
  if (Array.isArray(arg) && arg.every((v) => Number.isInteger(v))) return true;
  return false;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    IReadResponse | ICreatedResponse | IDeletedResponse | { message: string }
  >
) {
  try {
    switch (req.method?.toUpperCase()) {
      case "GET": {
        const records = await getRecords();
        res.status(200).json({ result: null, records });
      }
      case "POST": {
        const parsed = JSON.parse(req.body);
        if (isNewRecord(parsed)) {
          const result = await setRecord(parsed);
          const records = await getRecords();
          res.status(200).json({ result, records });
        } else {
          res.status(400).json({ message: "Invalid format" });
        }
      }
      case "DELETE": {
        const parsed = JSON.parse(req.body);
        if (isIDList(parsed)) {
          const result = await deleteRecord(parsed);
          const records = await getRecords();
          res.status(200).json({ result, records });
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
