import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { DeploymentsTable } from "@/components/dashboard/DeploymentsTable";
import { ChartPlaceholder } from "@/components/dashboard/ChartPlaceholder";

const metrics = [
  { title: "Active Deployments", value: 24, status: "success" as const, statusText: "3 in progress" },
  { title: "Failed Pipelines", value: 2, status: "error" as const, statusText: "Requires attention" },
  { title: "Running Pods", value: 156, status: "success" as const, statusText: "All healthy" },
  { title: "Open Alerts", value: 5, status: "warning" as const, statusText: "2 critical, 3 warning" },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Infrastructure & Deployment Status
          </p>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              status={metric.status}
              statusText={metric.statusText}
            />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <ChartPlaceholder 
            title="CPU Usage" 
            subtitle="Average across all nodes" 
          />
          <ChartPlaceholder 
            title="Memory Usage" 
            subtitle="Average across all nodes" 
          />
        </div>

        {/* Deployments Table */}
        <DeploymentsTable />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
