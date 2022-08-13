import { PageLayout } from "../components/layouts/page";

export default function Home() {
	return (
		<PageLayout>
			<h1
				className="text-7xl mt-[30vh] font-bold"
				style={{
					lineHeight: 1.4,
				}}
			>
				Share your Public profile to <br /> anyone for free
			</h1>
		</PageLayout>
	);
}
