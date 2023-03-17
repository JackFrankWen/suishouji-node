import { Schema, Types } from 'mongoose'

// 1. Create an interface representing a document in MongoDB.
interface I_Transaction {
  amount: Schema.Types.Decimal128
  category: string
  description: string
  account_type: number
  payment_type: number
  consumer: number
  flow_type: number
  tag: number
  abc_type: number
  cost_type: number
  creation_time: Date
  trans_time: Date
  modification_time: Date
}

export const transactionSchema = new Schema<I_Transaction>(
  {
    amount: Types.Decimal128,
    category: String,
    description: String,
    account_type: Number,
    payment_type: Number,
    consumer: Number,
    flow_type: Number,
    tag: Number,
    abc_type: Number,
    cost_type: Number,
    trans_time: Date,
    creation_time: { type: Date, default: Date.now },
    modification_time: { type: Date, default: Date.now },
  },
  { collection: 'transaction' }
)
