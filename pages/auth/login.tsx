import { submithandler } from "../../utils/submithandler";
import axios from "axios";
import { useRouter } from "next/router";

export default function Login() {
	const router = useRouter();
	const login = async (data) => {
		try {
			let res = await axios.post("/api/v1/auth", {
				action: "LOGIN",
				...data,
			});

			localStorage.setItem("session_id", res.data.info);

			router.push("/my-profile");
		} catch (error) {
			alert(error.response.data.message);
		}
	};
	return (
		<div>
			<h1>Login Here</h1>
			<form onSubmit={submithandler(login)}>
				<input type="text" placeholder="username" name="username" />
				<input type="password" placeholder="password" name="password" />
				<input type="submit" value={"Submit"} />
			</form>
		</div>
	);
}
