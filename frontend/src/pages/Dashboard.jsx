import DashboardNavbar from "../components/DashboardNavbar";
import AddContentCard from "../components/AddContentCard";
import ContentList from "../components/ContentList";
import ShareCard from "../components/ShareCard";

export default function Dashboard() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
			<DashboardNavbar />
			<main className="flex-1 w-full px-3 sm:px-6 lg:px-8 py-6 lg:py-10">
				<div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
					<div className="lg:col-span-2 space-y-6">
						<AddContentCard />
						<ContentList />
					</div>
					<div className="lg:col-span-1">
						<ShareCard />
					</div>
				</div>
			</main>
		</div>
	);
}

