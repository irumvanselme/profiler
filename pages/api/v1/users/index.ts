import { connectToDatabase } from "../../../../utils/mongodb";

export default async function handler(req, res) {
	const { db } = await connectToDatabase();

	const movies = await db.collection("users").find({}).toArray();

	res.status(200).json(movies);
}
