import { Schema, Types } from 'mongoose'

// 1. Create an interface representing a document in MongoDB.
export interface I_MatchRuls {
  rule: string
  category: string
  description: string
  account_type: string
  consumer: string
  creation_time: Date
  modification_time: Date
  tag: string
}

export const matchRuleSchema = new Schema<I_MatchRuls>(
  {
    category: String,
    description: String,
    account_type: String,
    consumer: String,
    creation_time: { type: Date, default: Date.now },
    modification_time: { type: Date, default: Date.now },
    tag: String,
  },
  {
    collection: 'match_rules',
  }
)
