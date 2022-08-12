import { useRouter } from "next/router";
import axios from "axios";
import { submithandler } from "../../utils/submithandler";

export default function Register() {
	const router = useRouter();
	const register = async (data) => {
		try {
			let res = await axios.post("/api/v1/auth", {
				action: "REGISTER",
				...data,
			});

			localStorage.setItem("session_id", res.data.info);

			router.push("/auth/login");
		} catch (error) {
			if (error.response.data.message == "Invalid Input")
				alert(Object.values(error.response.data.errors)[0][0]);
			else alert(error.response.data.message);
		}
	};
	return (
		<div>
			<h1>Register Here</h1>
			<form onSubmit={submithandler(register)}>
				<input type="text" placeholder="full names" name="full_names" />
				<input type="text" placeholder="email" name="email" />
				<input type="text" placeholder="username" name="username" />
				<input type="password" placeholder="password" name="password" />
				<input
					type="password"
					placeholder="password_confirmation"
					name="password_confirmation"
				/>
				<input type="submit" value={"Submit"} />
			</form>
		</div>
	);
}
