import { submithandler } from "../../utils/submithandler";
import axios from "axios";
import { useRouter } from "next/router";
import { PageLayout } from "../../components/layouts/page";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState("");

	const router = useRouter();
	const login = async (data) => {
		setIsLoading(true);
		try {
			setMessage("");
			let res = await axios.post("/api/v1/auth", {
				action: "LOGIN",
				...data,
			});

			localStorage.setItem("session_id", res.data.info);

			router.push("/my-profile");

			setIsLoading(false);
		} catch (error) {
			setMessage(error.response.data.message);
			setIsLoading(false);
		}
	};
	return (
		<PageLayout>
			<div className="max-w-[400px] mx-auto">
				<h1 className="my-8 text-3xl font-bold">Login Here</h1>
				{message.length !== 0 && (
					<div className="bg-red-300 px-4 py-2 rounded-lg font-bold">
						{message}
					</div>
				)}
				<form onSubmit={submithandler(login)}>
					<Input
						type="text"
						label="username"
						placeholder="username"
						name="username"
					/>
					<Input
						label="password"
						type="password"
						placeholder="password"
						name="password"
					/>
					<Button full>{isLoading ? "Checking..." : "Submit"}</Button>
				</form>
				<div className="mt-5 text-[dodgerblue] hover:underline">
					<Link href={"/auth/register"}>
						Don't have an account ? Register
					</Link>
				</div>
			</div>
		</PageLayout>
	);
}
