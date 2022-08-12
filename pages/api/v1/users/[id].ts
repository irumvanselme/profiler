import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../../utils/mongodb";

export default async function handler(req, res) {
	const { db } = await connectToDatabase();
	console.log(req.query.id);
	const user = await db
		.collection("users")
		.findOne({ _id: new ObjectId(req.query.id) });

	if (!user) return res.status(404).send("User Not Found");

	res.status(200).json(JSON.parse(JSON.stringify(user)));
}
