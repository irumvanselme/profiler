import { useRouter } from "next/router";
import axios from "axios";
import { submithandler } from "../../utils/submithandler";
import { PageLayout } from "../../components/layouts/page";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { Input } from "../../components/ui/input";

export default function Register() {
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState("");
	const router = useRouter();

	const register = async (data) => {
		setIsLoading(true);
		try {
			setMessage("");
			let res = await axios.post("/api/v1/auth", {
				action: "REGISTER",
				...data,
			});

			localStorage.setItem("session_id", res.data.info);

			setIsLoading(false);
			router.push("/auth/login");
		} catch (error) {
			if (error.response.data.message == "Invalid Input")
				setMessage(Object.values(error.response.data.errors)[0][0]);
			else setMessage(error.response.data.message);

			setIsLoading(false);
		}
	};
	return (
		<PageLayout>
			<div className="max-w-[400px] mx-auto">
				<h1 className="my-8 text-3xl font-bold">Register Here</h1>
				{message.length !== 0 && (
					<div className="bg-red-300 px-4 py-2 rounded-lg font-bold">
						{message}
					</div>
				)}
				<form onSubmit={submithandler(register)}>
					<Input
						label={"Full Name"}
						type="text"
						placeholder="full names"
						name="full_names"
					/>
					<Input
						label={"Email"}
						type="text"
						placeholder="email"
						name="email"
					/>
					<Input
						label={"Username"}
						type="text"
						placeholder="username"
						name="username"
					/>
					<Input
						label={"Password"}
						type="password"
						placeholder="password"
						name="password"
					/>
					<Input
						label={"Confirm Password"}
						type="password"
						placeholder="password_confirmation"
						name="password_confirmation"
					/>
					<Button full>{isLoading ? "Checking..." : "Submit"}</Button>
				</form>
				<div className="mt-5 text-[dodgerblue] hover:underline">
					<Link href={"/auth/login"}>
						Already have an account ? Login
					</Link>
				</div>
			</div>
		</PageLayout>
	);
}
