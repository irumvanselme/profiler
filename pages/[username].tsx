import Error from "next/error";
import { PageLayout } from "../components/layouts/page";
import { connectToDatabase } from "../utils/mongodb";

function Profile({ user }) {
	if (user == null) return <Error statusCode={404} title="User Not Found" />;
	return (
		<>
			<PageLayout>
				<div className="relative">
					<div className="text-right pr-5 pb-1">
						status: Looking for a job
					</div>
					<div className="bg-gray-300 min-h-[250px] rounded-[40px] p-5 flex justify-center items-center">
						Cover Image
					</div>
					<div className="w-[250px] h-[250px] bg-gray-300 rounded-[125px] border-[15px] border-white absolute top-[125px] flex justify-center items-center">
						profile image
					</div>
					<div className="ml-[260px] mt-4">
						<div className="flex justify-between">
							<div>name and title</div>
							<div>contact information</div>
						</div>
						<div className="mt-5">
							proffession: Software Engineer
						</div>
						<div>Social media links</div>
						<div>Services</div>
						<div>Reviews</div>
					</div>
				</div>
			</PageLayout>
		</>
	);
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
