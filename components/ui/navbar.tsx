import Link from "next/link";
import { Button } from "./button";
import { useState } from "react";
import { useEffect } from "react";

export function Navbar() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const session = localStorage.getItem("session_id");
		if (session) {
			setIsLoggedIn(true);
		}
	}, []);

	return (
		<div className="flex justify-between mx-auto border-b py-3 items-center px-1">
			<Link href="/">
				<h1 className="cursor-pointer font-bold text-2xl">Profiler</h1>
			</Link>
			<div className="flex gap-2">
				{isLoggedIn ? (
					<>
						<Link href="/settings/update-profile">
							<div>
								<Button outline>Settings</Button>
							</div>
						</Link>
						<Link href="/auth/logout">
							<div>
								<Button outline>Log Out</Button>
							</div>
						</Link>
					</>
				) : (
					<>
						<Link href="/auth/login">
							<div>
								<Button outline>Login</Button>
							</div>
						</Link>
						<Link href="/auth/register">
							<div>
								<Button>Create Yours</Button>
							</div>
						</Link>
					</>
				)}
			</div>
		</div>
	);
}
