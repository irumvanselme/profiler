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
		<div className="flex justify-between mx-auto border-b py-3 items-center px-1 md:px-5 xl:px-[90px]">
			<Link href="/">
				<h1 className="cursor-pointer font-bold text-2xl">PROFILER</h1>
			</Link>
			<div className="flex gap-5">
				{isLoggedIn ? (
					<>
						<Link href="/settings/update-profile">
							<div className="text-[dodgerblue] cursor-pointer hover:underline transition">
								Settings
							</div>
						</Link>
						<Link href="/auth/logout">
							<div className="text-[dodgerblue] cursor-pointer hover:underline transition">
								Log Out
							</div>
						</Link>
					</>
				) : (
					<>
						<Link href="/auth/login">
							<div className="text-[dodgerblue] cursor-pointer hover:underline transition">
								Login
							</div>
						</Link>
						<Link href="/auth/register">
							<div className="text-[dodgerblue] cursor-pointer hover:underline transition">
								Create Your Profile
							</div>
						</Link>
					</>
				)}
			</div>
		</div>
	);
}
