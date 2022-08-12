import { submithandler } from "../../utils/submithandler";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

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
		<div>
			<h1>Update Profile</h1>
			<form onSubmit={submithandler(updateProfile)}>
				<section>
					<h1>CONTACT INFORMATION</h1>
					<input
						type="text"
						placeholder="Full Name"
						className="block border"
						name="full_names"
						defaultValue={user.full_names}
					/>
					<input
						type="text"
						placeholder="user Name"
						className="block border"
						name="username"
						defaultValue={user.username}
					/>
					<input
						type="text"
						placeholder="Email Name"
						className="block border"
						name="email"
						defaultValue={user.email}
					/>
					<input
						type="text"
						placeholder="Phone"
						className="block border"
						name="phone_number"
						defaultValue={user.phone_number}
					/>
					<input
						type="text"
						placeholder="Location Address"
						className="block border"
						name="address"
						defaultValue={user.address}
					/>
				</section>
				<section>
					<h1>CONTACT INFORMATION</h1>
					<input
						type="file"
						placeholder="Cover Photo"
						className="block border"
						name="cover_photo"
						id="cover_photo"
					/>
					<input
						type="file"
						placeholder="Profile Photo"
						className="block border"
						name="profile_photo"
						id="profile_photo"
					/>
				</section>
				<section>
					<h1>OTHER INFORMATION</h1>
					<input
						type="text"
						placeholder="Website Name"
						className="block border"
						name="website_name"
						defaultValue={user.website_name}
					/>
					<input
						type="text"
						placeholder="Title"
						className="block border"
						name="title"
						defaultValue={user.title}
					/>
					<input
						type="text"
						placeholder="BIO"
						className="block border"
						name="bio"
						defaultValue={user.bio}
					/>
					<input
						type="text"
						placeholder="Status"
						className="block border"
						name="status"
						defaultValue={user.status}
					/>

					<input
						type="text"
						placeholder="Proffession"
						className="block border"
						name="profession"
						defaultValue={user.profession}
					/>
				</section>
				<section>
					<h1>Social Media Links</h1>
					<input
						type="text"
						placeholder="Twitter Link"
						className="block border"
						name="twitter_link"
						defaultValue={user.twitter_link}
					/>
					<input
						type="text"
						placeholder="Github Link"
						className="block border"
						name="github_link"
						defaultValue={user.github_link}
					/>
					<input
						type="text"
						placeholder="LinkedIn Link"
						className="block border"
						name="linkedin_link"
						defaultValue={user.linkedin_link}
					/>
					<input
						type="text"
						placeholder="Instagram Link"
						className="block border"
						name="instagram_link"
						defaultValue={user.instagram_link}
					/>
					<input
						type="text"
						placeholder="Facebook Link"
						className="block border"
						name="facebook_link"
						defaultValue={user.facebook_link}
					/>
				</section>
				<button>SAVE</button>
			</form>
		</div>
	);
}
