// lib/mongodb.ts
import { MongoClient, MongoClientOptions, Collection, Db, Document } from "mongodb"

const uri = process.env.MONGODB_URI
if (!uri) throw new Error('Missing env "MONGODB_URI"')

const options: MongoClientOptions = {
  appName: "mei-app",
  // some sane defaults; ajuste conforme necessidade
  maxPoolSize: 10,
  minPoolSize: 0,
  retryWrites: true,
  // serverSelectionTimeoutMS: 5000,
  // heartbeatFrequencyMS: 10000,
  // serverApi: { version: "1", strict: true, deprecationErrors: true },
}

// Cache do client para dev (HMR) **e** para serverless
let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise!
} else {
  // em produção, crie e conecte uma vez por instância
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Helpers de conveniência
export async function getClient(): Promise<MongoClient> {
  return clientPromise
}

export async function getDb(dbName = "MEI"): Promise<Db> {
  const c = await getClient()
  return c.db(dbName)
}

export async function getCollection<TSchema extends Document = Document>(
  name: string,
  dbName = "MEI"
): Promise<Collection<TSchema>> {
  const db = await getDb(dbName)
  return db.collection<TSchema>(name)
}
