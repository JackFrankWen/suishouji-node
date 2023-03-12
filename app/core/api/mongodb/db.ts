import { model, connect } from 'mongoose'
import { transactionSchema } from './transaction-schema'

const Transaction = model('Transaction', transactionSchema)

export function getCollection(): any {
  return Transaction
}

export async function runMongodb() {
  // 4. Connect to MongoDB
  await connect('mongodb://127.0.0.1:27017/bookkeepprop2')
}
