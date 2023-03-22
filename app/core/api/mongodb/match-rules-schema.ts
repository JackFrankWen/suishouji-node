import { Schema, Types } from 'mongoose'

// 1. Create an interface representing a document in MongoDB.
export interface I_MatchRuls {
  rule: string
  category: string
  account_type: string
  consumer: string
  creation_time: Date
  modification_time: Date
  abc_type: number
  cost_type: number
  tag: string
}

export const matchRuleSchema = new Schema<I_MatchRuls>(
  {
    rule: String,
    category: String,
    account_type: String,
    consumer: String,
    abc_type: Number,
    cost_type: Number,
    creation_time: { type: Date, default: Date.now },
    modification_time: { type: Date, default: Date.now },
    tag: String,
  },
  {
    collection: 'match_rules',
  }
)
