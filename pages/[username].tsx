import Error from "next/error";
import { PageLayout } from "../components/layouts/page";
import { connectToDatabase } from "../utils/mongodb";

import { Text } from "../components/ui/text";

function Profile({ user }) {
	if (user == null) return <Error statusCode={404} title="User Not Found" />;
	return (
		<>
			<PageLayout>
				<div className="relative">
					<div className="text-right pr-5 pb-1">
						status: Looking for a job
					</div>
					<div
						className="bg-gray-300 min-h-[250px] rounded-[40px] p-5 flex justify-center items-center bg-center bg-cover"
						style={{
							backgroundImage: "url('" + user.cover_pic + "')",
						}}
					></div>
					<div
						className="w-[250px] h-[250px] bg-gray-300 rounded-[125px] border-[15px] border-white absolute top-[125px] flex justify-center items-center bg-center bg-cover"
						style={{
							backgroundImage: "url('" + user.profile_pic + "')",
						}}
					></div>
					<div className="ml-[260px] mt-4 py-5">
						<div className="flex justify-between">
							<div>
								<h1 className="pb-5">
									<Text variant={1} color="black">
										{user.full_names}
									</Text>
								</h1>
								<h2 className="pb-5">
									<Text variant={2} color="gray">
										{user.title}
									</Text>
								</h2>
								<p className="max-w-[500px]">
									<Text>{user.bio}</Text>
								</p>
							</div>
							<div className="flex flex-col items-end">
								<div className="flex">
									<div>{user.email}</div>
									<div>icon</div>
								</div>

								<div className="flex">
									<div>{user.phone_number}</div>
									<div>icon</div>
								</div>

								<div className="flex">
									<div>{user.address}</div>
									<div>icon</div>
								</div>

								<div className="flex">
									<div>{user.website_name}</div>
									<div>icon</div>
								</div>
							</div>
						</div>
						<div className="mt-10">
							<Text variant={3} color="black">
								Proffession: {user.proffession}
							</Text>
						</div>
						<section className="__section">
							<Text capitalize>Social media links</Text>
						</section>
						<section className="__section">
							<Text capitalize>Services</Text>
						</section>
						<section className="__section">
							<Text capitalize>Reviews</Text>
						</section>
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
