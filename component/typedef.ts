import { Liking, Alias } from "@prisma/client";
import { Prisma } from "@prisma/client";
export interface IPropsRecords {
  records: ILikingItemClient[];
}

export interface ILikingItemServer extends Liking {
  alias: Alias[];
}

export interface ILikingItemClient extends Liking {
  alias: string[];
}

export interface INewRecord {
  displayName: string;
  isAllergy: boolean;
  isLike: boolean;
  description: string | null;
  alias: string[];
}

export interface ICreatedResponse {
  result: Liking;
  records: ILikingItemClient[];
}

export interface IReadResponse {
  result: null;
  records: ILikingItemClient[];
}

export interface IDeletedResponse {
  result: Prisma.BatchPayload[];
  records: ILikingItemClient[];
}
