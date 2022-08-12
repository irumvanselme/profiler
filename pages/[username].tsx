import { connectToDatabase } from "../utils/mongodb";

function Profile({ users }) {
	console.log(users);
	return <div>hello</div>;
}

export const getServerSideProps = async ({ params }) => {
	const { db } = await connectToDatabase();

	const user = await db
		.collection("users")
		.findOne({ username: params.username });

	return {
		props: {
			users: JSON.parse(JSON.stringify(user)),
		},
	};
};

export default Profile;
