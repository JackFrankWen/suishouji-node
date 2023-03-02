import { MongoClient, Db, Collection } from 'mongodb'

const uri = 'mongodb://localhost:27017'
const dbName = 'bookkeepprop2'

let client: MongoClient | null = null
let db: Db | null = null

export async function connect(): Promise<void> {
  if (!client) {
    client = new MongoClient(uri)
    await client.connect()
    db = client.db(dbName)
  }
}

export function getDb(): Db | null {
  return db
}
export function getCollection(name: string): Collection | null {
  const db = getDb()
  if (db) {
    return db.collection(name)
  }
  return null
}
