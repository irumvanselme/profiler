import { connectToDatabase } from "../../../utils/mongodb";
import bcrypt from "bcrypt";
import { validate } from "../../../utils/validator";

export default async function handler(req, res) {
	let { action } = req.body;

	const { db } = await connectToDatabase();

	if (action == "REGISTER") {
		let [passes, info] = validate(req.body, {
			full_names: "required|string|min:3|max:20",
			email: "required|email",
			username: "required|min:3",
			password: "required|string|min:6|max:20|confirmed",
		});

		if (!passes)
			return res.status(400).json({
				message: "Invalid Input",
				errors: info,
			});

		let user = await db.collection("users").findOne({
			$or: [{ email: info.email }, { username: info.username }],
		});

		if (user)
			return res.status(400).send({
				message:
					user.email == info.email
						? "Email Already taken"
						: "Username Already taken",
			});

		delete info.action;
		delete info.password_confirmation;

		info.password = await bcrypt.hash(info.password, 10);

		await db.collection("users").insertOne(info);
		return res.status(201).json({ message: "SUCCESS" });
	} else if (action == "LOGIN") {
		const { username, password } = req.body;

		let user = await db.collection("users").findOne({
			$or: [{ email: username }, { username: username }],
		});

		if (!user)
			return res.status(400).send({
				message: "Invalid Credentials",
			});

		let isValid = await bcrypt.compare(password, user.password);
		if (!isValid)
			return res.status(400).send({ message: "Invalid Credentials" });

		return res.status(200).json({ message: "SUCCESS", info: user._id });
	} else {
		return res.status(404).json({ message: "Endpoint Not Found" });
	}
}
