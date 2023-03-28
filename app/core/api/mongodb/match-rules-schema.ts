import { Schema, Types } from 'mongoose'

// 1. Create an interface representing a document in MongoDB.
export interface I_MatchRuls {
  rule: string
  category: string
  consumer: string
  abc_type: number
  cost_type: number
  tag: string
  creation_time: Date
  modification_time: Date
}

export const matchRuleSchema = new Schema<I_MatchRuls>(
  {
    rule: String,
    category: String,
    consumer: String,
    abc_type: Number,
    cost_type: Number,
    tag: String,
    creation_time: { type: Date, default: Date.now },
    modification_time: { type: Date, default: Date.now },
  },
  {
    collection: 'match_rules',
  }
)
