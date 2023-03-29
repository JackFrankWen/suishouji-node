import { Schema, Types } from 'mongoose'

// 1. Create an interface representing a document in MongoDB.
export interface I_MatchRuls {
  rule: string
  category: string
  consumer: number
  abc_type: number
  cost_type: number
  tag: number
  creation_time: Date
  modification_time: Date
}

export const matchRuleSchema = new Schema<I_MatchRuls>(
  {
    rule: String,
    category: String,
    consumer: Number,
    abc_type: Number,
    cost_type: Number,
    tag: Number,
    creation_time: { type: Date, default: Date.now },
    modification_time: { type: Date, default: Date.now },
  },
  {
    collection: 'match_rules',
  }
)
