import Head from "next/head";
import { Navbar } from "../ui/navbar";

export function PageLayout({ children }) {
	return (
		<div className="bg-gray-50 px-2 sm:px-4 flex justify-center">
			<div className="lg:max-w-[1245px]">
				<Head>
					<title>Create Next App</title>
					<meta
						name="description"
						content="Generated by create next app"
					/>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<main className="min-h-[95vh]">
					<Navbar />
					<div className="mx-auto mt-5 px-2">
						<div>{children}</div>
					</div>
				</main>
				<footer className="text-center  w-full text-gray-500">
					<p>Developed by irumvanselme</p>
				</footer>
			</div>
		</div>
	);
}
