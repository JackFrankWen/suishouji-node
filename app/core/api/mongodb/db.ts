import { MongoClient, Db } from 'mongodb'

const uri = 'mongodb://localhost:27017'
const dbName = 'test1'

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
