import Error from "next/error";
import { connectToDatabase } from "../utils/mongodb";

function Profile({ user }) {
	if (user == null) return <Error statusCode={404} title="User Not Found" />;
	return <div>hello</div>;
}

export const getServerSideProps = async ({ params }) => {
	const { db } = await connectToDatabase();

	const user = await db
		.collection("users")
		.findOne({ username: params.username });

	return {
		props: {
			user: JSON.parse(JSON.stringify(user)),
		},
	};
};

export default Profile;
