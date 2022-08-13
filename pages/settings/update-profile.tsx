import { submithandler } from "../../utils/submithandler";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { PageLayout } from "../../components/layouts/page";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

export default function UpdateProfile() {
	const [user, setUser] = useState(null);
	const router = useRouter();
	useEffect(() => {
		(async function () {
			let user_id = localStorage.getItem("session_id");
			if (!user_id) return await router.push("/auth/login");

			let user = await axios.get("/api/v1/users/" + user_id);
			setUser(user.data);
		})();
	}, []);

	const updateProfile = async (data) => {
		console.log(data);

		// cloudinary.uploader.upload("upload", {

		// })

		// upload profile PIC
		let formData = new FormData();
		formData.append("file", data.profile_photo);
		formData.append("upload_preset", "emk5bdxz");

		let uploadedProfilePic = await axios.post(
			"https://api.cloudinary.com/v1_1/dgjjz9499/upload",
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);

		data.profile_pic = uploadedProfilePic.data.secure_url;

		formData = new FormData();
		formData.append("file", data.cover_photo);
		formData.append("upload_preset", "emk5bdxz");

		let uploadedCoverPic = await axios.post(
			"https://api.cloudinary.com/v1_1/dgjjz9499/upload",
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);

		data.cover_pic = uploadedCoverPic.data.secure_url;

		console.log(uploadedProfilePic);

		delete data.profile_photo;
		delete data.cover_photo;
		let updated = await axios.put("/api/v1/users/" + user._id, data);

		console.log(updated);
	};

	if (user == null) return <div>Loading...</div>;

	return (
		<PageLayout>
			<div>
				<h1 className="font-bold text-3xl pb-10">Update Profile</h1>
				<form onSubmit={submithandler(updateProfile)}>
					<div className="grid grid-cols-3 gap-20">
						<section className="py-10 border-b-4 border-gray-600">
							<h1 className="uppercase pb-5 text-gray-600 tracking-wide">
								CONTACT INFORMATION
							</h1>
							<Input
								label="Full name"
								type="text"
								placeholder="Full Name"
								name="full_names"
								defaultValue={user.full_names}
							/>
							<Input
								label="User name"
								type="text"
								placeholder="user Name"
								name="username"
								defaultValue={user.username}
							/>
							<Input
								label="Email"
								type="text"
								placeholder="Email Name"
								name="email"
								defaultValue={user.email}
							/>
							<Input
								label="Phone number"
								type="text"
								placeholder="Phone"
								name="phone_number"
								defaultValue={user.phone_number}
							/>
							<Input
								label="Location Address"
								type="text"
								placeholder="Location Address"
								name="address"
								defaultValue={user.address}
							/>
						</section>

						<section className="py-10 border-b-4 border-gray-600">
							<h1 className="uppercase pb-5 text-gray-600 tracking-wide">
								OTHER INFORMATION
							</h1>
							<Input
								label="Website"
								type="url"
								placeholder="Website"
								name="website_name"
								defaultValue={user.website_name}
							/>
							<Input
								label="Title"
								type="text"
								placeholder="Title"
								name="title"
								defaultValue={user.title}
							/>
							<Input
								label="Bio"
								type="text"
								placeholder="BIO"
								name="bio"
								defaultValue={user.bio}
							/>
							<Input
								label="Status"
								type="text"
								placeholder="Status"
								name="status"
								defaultValue={user.status}
							/>

							<Input
								label="Proffession"
								type="text"
								placeholder="eg: Teacher, Developer, etc"
								name="profession"
								defaultValue={user.profession}
							/>
						</section>
						<section className="py-10 border-b-4 border-gray-600">
							<h1 className="uppercase pb-5 text-gray-600 tracking-wide">
								CONTACT INFORMATION
							</h1>
							<Input
								label="Cover Picture"
								type="file"
								placeholder="Cover Photo"
								name="cover_photo"
								id="cover_photo"
							/>
							<Input
								label="Profile Picture"
								type="file"
								placeholder="Profile Photo"
								name="profile_photo"
								id="profile_photo"
							/>
						</section>
						<section className="col-span-3">
							<h1 className="uppercase pb-5 text-gray-600 tracking-wide">
								Social Media Links
							</h1>
							<div className="grid grid-cols-3 gap-x-20">
								<Input
									label="Twitter Link"
									type="text"
									placeholder="Twitter Link"
									name="twitter_link"
									defaultValue={user.twitter_link}
								/>
								<Input
									label="Github Link"
									type="text"
									placeholder="Github Link"
									name="github_link"
									defaultValue={user.github_link}
								/>
								<Input
									label="LinkedIn Link"
									type="text"
									placeholder="LinkedIn Link"
									name="linkedin_link"
									defaultValue={user.linkedin_link}
								/>
								<Input
									label="Instagra Link"
									type="text"
									placeholder="Instagram Link"
									name="instagram_link"
									defaultValue={user.instagram_link}
								/>
								<Input
									label="Facebook Link"
									type="text"
									placeholder="Facebook Link"
									name="facebook_link"
									defaultValue={user.facebook_link}
								/>
							</div>
						</section>
					</div>
					<div className="mt-10">
						<Button>SAVE</Button>
					</div>
				</form>
			</div>
		</PageLayout>
	);
}
