import { MongoClient } from "mongodb";

let uri =
	"mongodb+srv://root:f4H7rqLp5eR16eJM@datastore.6fcxw3r.mongodb.net/profiler?retryWrites=true&w=majority";
let dbName = "profiler";

let cachedClient = null;
let cachedDb = null;

if (!uri) {
	throw new Error(
		"Please define the MONGODB_URI environment variable inside .env.local"
	);
}

if (!dbName) {
	throw new Error(
		"Please define the MONGODB_DB environment variable inside .env.local"
	);
}

export async function connectToDatabase() {
	if (cachedClient && cachedDb) {
		return { client: cachedClient, db: cachedDb };
	}

	const client = await MongoClient.connect(uri);

	const db = await client.db(dbName);

	cachedClient = client;
	cachedDb = db;

	return { client, db };
}
