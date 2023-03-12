import { Schema, model, connect, Types } from 'mongoose'

// 1. Create an interface representing a document in MongoDB.
interface I_Transaction {
  amount: Schema.Types.Decimal128
  category: string
  description: string
  account_type: string
  payment_type: string
  consumer: string
  flow_type: string
  creation_time: Date
  trans_time: Date
  modification_time: Date
  tag: string
}

export const transactionSchema = new Schema<I_Transaction>({
  amount: Schema.Types.Decimal128,
  category: String,
  description: String,
  account_type: String,
  payment_type: String,
  consumer: String,
  flow_type: String,
  trans_time: Date,
  creation_time: { type: Date, default: Date.now },
  modification_time: { type: Date, default: Date.now },
  tag: String,
})
