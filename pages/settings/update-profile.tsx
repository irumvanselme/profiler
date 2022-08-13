import { submithandler } from "../../utils/submithandler";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { PageLayout } from "../../components/layouts/page";
import { Input } from "../../components/ui/input";

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
				<h1>Update Profile</h1>
				<form onSubmit={submithandler(updateProfile)}>
					<section>
						<h1>CONTACT INFORMATION</h1>
						<Input
							label="Full name"
							type="text"
							placeholder="Full Name"
							name="full_names"
							defaultValue={user.full_names}
						/>
						<Input
							label="Input"
							type="text"
							placeholder="user Name"
							name="username"
							defaultValue={user.username}
						/>
						<Input
							label="Input"
							type="text"
							placeholder="Email Name"
							name="email"
							defaultValue={user.email}
						/>
						<Input
							label="Input"
							type="text"
							placeholder="Phone"
							name="phone_number"
							defaultValue={user.phone_number}
						/>
						<Input
							label="Input"
							type="text"
							placeholder="Location Address"
							name="address"
							defaultValue={user.address}
						/>
					</section>
					<section>
						<h1>CONTACT INFORMATION</h1>
						<Input
							label="Input"
							type="file"
							placeholder="Cover Photo"
							name="cover_photo"
							id="cover_photo"
						/>
						<Input
							label="Input"
							type="file"
							placeholder="Profile Photo"
							name="profile_photo"
							id="profile_photo"
						/>
					</section>
					<section>
						<h1>OTHER INFORMATION</h1>
						<Input
							label="Input"
							type="text"
							placeholder="Website Name"
							name="website_name"
							defaultValue={user.website_name}
						/>
						<Input
							label="Input"
							type="text"
							placeholder="Title"
							name="title"
							defaultValue={user.title}
						/>
						<Input
							label="Input"
							type="text"
							placeholder="BIO"
							name="bio"
							defaultValue={user.bio}
						/>
						<Input
							label="Input"
							type="text"
							placeholder="Status"
							name="status"
							defaultValue={user.status}
						/>

						<Input
							label="Input"
							type="text"
							placeholder="Proffession"
							name="profession"
							defaultValue={user.profession}
						/>
					</section>
					<section>
						<h1>Social Media Links</h1>
						<Input
							label="Input"
							type="text"
							placeholder="Twitter Link"
							name="twitter_link"
							defaultValue={user.twitter_link}
						/>
						<Input
							label="Input"
							type="text"
							placeholder="Github Link"
							name="github_link"
							defaultValue={user.github_link}
						/>
						<Input
							label="Input"
							type="text"
							placeholder="LinkedIn Link"
							name="linkedin_link"
							defaultValue={user.linkedin_link}
						/>
						<Input
							label="Input"
							type="text"
							placeholder="Instagram Link"
							name="instagram_link"
							defaultValue={user.instagram_link}
						/>
						<Input
							label="Input"
							type="text"
							placeholder="Facebook Link"
							name="facebook_link"
							defaultValue={user.facebook_link}
						/>
					</section>
					<button>SAVE</button>
				</form>
			</div>
		</PageLayout>
	);
}
