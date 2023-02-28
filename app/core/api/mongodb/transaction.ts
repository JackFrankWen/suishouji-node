import { getDb } from './db'
const collectionName = 'stock_list'

export async function getView() {
  const db = getDb()
  if (db) {
    const collection = db.collection(collectionName)
    const query = { industry: '银行' }
    const result = await collection.findOne(query)
    return result
  }
}
