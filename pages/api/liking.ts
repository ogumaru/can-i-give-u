import type { NextApiRequest, NextApiResponse } from 'next'
import { getRecords } from '../../controller/db_access'
import { ILikingItemClient } from '../../component/typedef'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ILikingItemClient[]>
) {
  const records = await getRecords()
  res.status(200).json(records)
}
