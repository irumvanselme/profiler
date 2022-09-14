import Head from "next/head";
import { Navbar } from "../ui/navbar";

export function PageLayout({ children }) {
	return (
		<>
			<Head>
				<title>profiler - Home</title>
				<meta
					name="description"
					content="a free profile for everyone"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />
			<div className="bg-gray-50 px-2 sm:px-4 flex justify-center">
				<div className="lg:max-w-[1245px] w-full">
					<main className="min-h-[95vh] w-full">
						<div className="mx-auto mt-5 px-2">
							<div>{children}</div>
						</div>
					</main>
					<footer className="text-center  w-full text-gray-500">
						<p>Developed by irumvanselme</p>
					</footer>
				</div>
			</div></>
	);
}
