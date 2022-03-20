import { Prisma, PrismaClient } from "@prisma/client";
import { ILikingItemServer, ILikingItemClient } from "../component/typedef";
import { INewRecord } from "../component/typedef";

const fetchDB = async () => {
  const prisma = new PrismaClient();
  const records = await prisma.liking.findMany({
    include: { alias: true },
  });
  await prisma.$disconnect();
  return records;
};

const isILikingItemClientList = (args: any): args is ILikingItemClient[] => {
  return true;
};

export const getRecords = async () => {
  const records = await fetchDB();
  const aliasProxy: ProxyHandler<ILikingItemServer> = {
    get: function (obj, prop) {
      if (prop === "alias") {
        return obj.alias.map((alias) => alias.alias);
      } else {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          return obj[prop as keyof ILikingItemServer];
        } else {
          return undefined;
        }
      }
    },
  };
  const proxied = records.map((record) => new Proxy(record, aliasProxy));
  if (isILikingItemClientList(proxied)) return proxied as ILikingItemClient[];
  else return null as never;
};
export const setRecord = async (record: INewRecord) => {
  const prisma = new PrismaClient();
  const newRecord: Prisma.LikingCreateInput = {
    displayName: record.displayName,
    alias: {
      create: record.alias.map((alias) => ({ alias: alias })),
    },
    isAllergy: record.isAllergy,
    isLike: record.isLike,
    description: record.description,
  };
  const liking = await prisma.liking.create({
    data: newRecord,
  });
};
