import { cn } from "@/lib/utils";

interface Deployment {
  id: string;
  service: string;
  environment: string;
  status: "success" | "failed" | "in_progress";
  version: string;
  time: string;
}

const deployments: Deployment[] = [
  { id: "1", service: "api-gateway", environment: "Production", status: "success", version: "v2.4.1", time: "2 min ago" },
  { id: "2", service: "auth-service", environment: "Staging", status: "in_progress", version: "v1.8.0", time: "5 min ago" },
  { id: "3", service: "user-service", environment: "Production", status: "success", version: "v3.2.0", time: "15 min ago" },
  { id: "4", service: "payment-api", environment: "Development", status: "failed", version: "v1.0.2", time: "32 min ago" },
  { id: "5", service: "notification-svc", environment: "Production", status: "success", version: "v2.1.0", time: "1 hour ago" },
  { id: "6", service: "analytics-worker", environment: "Staging", status: "success", version: "v4.0.0", time: "2 hours ago" },
];

const statusConfig = {
  success: { label: "Deployed", className: "status-badge-success" },
  failed: { label: "Failed", className: "status-badge-error" },
  in_progress: { label: "Deploying", className: "status-badge-warning" },
};

export function DeploymentsTable() {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">Recent Deployments</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="table-header text-left px-5 py-3">Service</th>
              <th className="table-header text-left px-5 py-3">Environment</th>
              <th className="table-header text-left px-5 py-3">Status</th>
              <th className="table-header text-left px-5 py-3">Version</th>
              <th className="table-header text-left px-5 py-3">Time</th>
            </tr>
          </thead>
          <tbody>
            {deployments.map((deployment) => (
              <tr key={deployment.id} className="border-b border-border last:border-b-0 hover:bg-muted/50">
                <td className="table-cell px-5 font-medium">{deployment.service}</td>
                <td className="table-cell px-5 text-muted-foreground">{deployment.environment}</td>
                <td className="table-cell px-5">
                  <span className={cn("status-badge", statusConfig[deployment.status].className)}>
                    {statusConfig[deployment.status].label}
                  </span>
                </td>
                <td className="table-cell px-5 font-mono text-xs">{deployment.version}</td>
                <td className="table-cell px-5 text-muted-foreground">{deployment.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
