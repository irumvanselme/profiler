import axios from "axios";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useRouter } from "next/router";

import { submithandler } from "../../utils/submithandler";
import { PageLayout } from "../../components/layouts/page";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

type TService = {
	name: string;
	description: string;
};

export default function UpdateProfile() {
	const [user, setUser] = useState(null);
	const router = useRouter();

	const profilePictureRef = useRef();
	const coverPictureRef = useRef();

	const [profilePic, setProfilePic] = useState(null);
	const [coverPic, setCoverPic] = useState(null);

	const [services, setServices] = useState<TService[]>([]);

	const [serviceDto, setServiceDto] = useState<TService>({
		name: "",
		description: "",
	});

	useEffect(() => {
		(async function () {
			let user_id = localStorage.getItem("session_id");
			if (!user_id) return await router.push("/auth/login");

			let user = await axios.get("/api/v1/users/" + user_id);
			setUser(user.data);
		})();
	}, []);

	const updateProfile = async (data) => {
		// cloudinary.uploader.upload("upload", {

		// })

		// upload profile PIC
		if (profilePic != null) {
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

			delete data.profile_photo;
		}

		if (coverPic != null) {
			let formData = new FormData();
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

			delete data.cover_photo;
		}

		data.services = services;

		await axios.put("/api/v1/users/" + user._id, data);
	};

	if (user == null) return <div>Loading...</div>;

	const handlePictureChange = (type) => (event) => {
		if (type == "cover") {
			if (coverPictureRef.current) {
				setCoverPic(
					URL.createObjectURL(coverPictureRef.current.files[0])
				);
			}
		} else if (type == "profile") {
			setProfilePic(
				URL.createObjectURL(profilePictureRef?.current?.files[0])
			);
		}
	};

	const addService = () => {
		services.push(serviceDto);
		setServiceDto({
			name: "",
			description: "",
		});
	};

	return (
		<PageLayout>
			<div>
				<h1 className="font-bold text-3xl pb-10">Update Profile</h1>
				<form onSubmit={submithandler(updateProfile)}>
					<div className="grid grid-cols-3 gap-x-20">
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
								PICTURES INFORMATION
							</h1>
							<div className="mb-5 border p-3 py-2 bg-white overflow-x-hidden">
								<label
									htmlFor="profile_photo"
									className="pb-5 block"
								>
									Profile Photo
								</label>
								<input
									type="file"
									placeholder="Profile Photo"
									name="profile_photo"
									id="profile_photo"
									ref={profilePictureRef}
									onChange={handlePictureChange("profile")}
								/>
								{profilePic != null && (
									<div className="mt-3 w-[100px] h-[100px] bg-gray-200">
										<img
											src={profilePic}
											alt="The Profile PIC"
											width={100}
											height={100}
										/>
									</div>
								)}
							</div>
							<div className="border p-3 py-2 bg-white overflow-x-hidden">
								<label
									htmlFor="cover_photo"
									className="pb-2 block"
								>
									Cover Photo
								</label>
								<input
									type="file"
									placeholder="Cover Photo"
									name="cover_photo"
									id="cover_photo"
									ref={coverPictureRef}
									onChange={handlePictureChange("cover")}
								/>
								{coverPic != null && (
									<div className="mt-3 h-[80px] w-[100%] bg-gray-200">
										<img
											src={coverPic}
											alt="The Cover PIC"
											className="w-[80%]"
											height={100}
										/>
									</div>
								)}
							</div>
						</section>
						<section className="col-span-3 py-10 border-b-4 border-gray-600">
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
						<section className="col-span-3 py-10">
							<h1 className="uppercase pb-5 text-gray-600 tracking-wide">
								Service
							</h1>
							<div className="grid grid-cols-3 gap-x-20">
								<div className="bg-gray-200 rounded-3xl px-5 py-4">
									<h1>New Service</h1>
									<div className="flex justify-between">
										<div>
											<input
												type="text"
												placeholder="Input title"
												className="px-2 py-1"
												value={serviceDto.name}
												onChange={(event) => {
													setServiceDto({
														...serviceDto,
														name: event.target
															.value,
													});
												}}
											/>
											<textarea
												placeholder="Service Description"
												className="p-2 mt-2"
												value={serviceDto.description}
												onChange={(event) => {
													setServiceDto({
														...serviceDto,
														description:
															event.target.value,
													});
												}}
											></textarea>
										</div>
										<div>
											<input
												type="button"
												value="add"
												onClick={addService}
											/>
										</div>
									</div>
								</div>
								{services.map((service, i) => (
									<div
										className="bg-gray-200 rounded-3xl px-5 py-4"
										key={i}
									>
										<h1 className="font-bold pb-4 text-2xl">
											{service.name}
										</h1>
										<h2>{service.description}</h2>
									</div>
								))}
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
