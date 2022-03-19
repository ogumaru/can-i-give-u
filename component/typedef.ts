import { Liking, Alias } from '@prisma/client'

export interface IPropsRecords {
  records: ILikingItemClient[]
}

export interface ILikingItemServer extends Liking {
  alias: Alias[]
}

export interface ILikingItemClient extends Liking {
  alias: string[]
}

export interface INewRecord {
  displayName: string
  isAllergy: boolean
  isLike: boolean
  description: string | null
  alias: string[]
}
