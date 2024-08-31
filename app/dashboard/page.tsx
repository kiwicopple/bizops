import { AppSidebar } from "@/components/app-sidebar";
import { SidebarLayout, SidebarTrigger } from "@/components/ui/sidebar";
import { WbrChart } from "@/components/wbr-chart";
import { Navbar } from "@/components/navbar-dashboard";
import { FakeChart } from "@/components/fake-chart";
import { FakePanel } from "@/components/fake-panel";
// Sample data with added variation and included title and y-axis labels
const metricsData = [
  {
    title: "Forum Pageviews",
    yAxisLabel: "Pageviews",
    data: [
      { date: "2023-01-01", value: 1200 },
      { date: "2023-02-01", value: 1350 },
      { date: "2023-03-01", value: 1550 },
      { date: "2023-04-01", value: 1450 },
      { date: "2023-05-01", value: 1600 },
      { date: "2023-06-01", value: 1750 },
      { date: "2023-07-01", value: 1650 },
      { date: "2023-08-01", value: 1800 },
      { date: "2023-09-01", value: 1950 },
      { date: "2023-10-01", value: 1850 },
      { date: "2023-11-01", value: 2000 },
      { date: "2023-12-01", value: 2200 },
    ],
  },
  {
    title: "User Signups",
    yAxisLabel: "Signups",
    data: [
      { date: "2023-01-01", value: 100 },
      { date: "2023-02-01", value: 110 },
      { date: "2023-03-01", value: 130 },
      { date: "2023-04-01", value: 120 },
      { date: "2023-05-01", value: 140 },
      { date: "2023-06-01", value: 150 },
      { date: "2023-07-01", value: 160 },
      { date: "2023-08-01", value: 180 },
      { date: "2023-09-01", value: 170 },
      { date: "2023-10-01", value: 190 },
      { date: "2023-11-01", value: 200 },
      { date: "2023-12-01", value: 220 },
    ],
  },
  {
    title: "Revenue Growth",
    yAxisLabel: "Revenue ($)",
    data: [
      { date: "2023-01-01", value: 6200 },
      { date: "2023-02-01", value: 6200 },
      { date: "2023-03-01", value: 3000 },
      { date: "2023-04-01", value: 6200 },
      { date: "2023-05-01", value: 7200 },
      { date: "2023-06-01", value: 7200 },
      { date: "2023-07-01", value: 7000 },
      { date: "2023-08-01", value: 8000 },
      { date: "2023-09-01", value: 7200 },
      { date: "2023-10-01", value: 7200 },
      { date: "2023-11-01", value: 7200 },
      { date: "2023-12-01", value: 7200 },
    ],
  },
];

export default async function Page() {
  const { cookies } = await import("next/headers");
  return (
    <>
      <SidebarLayout
        defaultOpen={cookies().get("sidebar:state")?.value === "true"}
      >
        <AppSidebar />

        <div className="flex flex-col w-full">
          <Navbar />

          <main className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
            <div className="flex flex-1 gap-2 mb-2">
              <div className="flex-grow">
                <FakeChart />
              </div>
              <div className="w-1/3">
                <FakePanel />
              </div>
            </div>
            <div className="h-full rounded-md border-2 border-dashed p-2">
              {metricsData.map((metric, index) => (
                <WbrChart
                  key={index}
                  data={metric.data}
                  title={metric.title}
                  yAxisLabel={metric.yAxisLabel}
                />
              ))}
            </div>
          </main>
        </div>
      </SidebarLayout>
    </>
  );
}
