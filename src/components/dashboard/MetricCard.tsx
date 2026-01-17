import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  status?: "success" | "warning" | "error" | "neutral";
  statusText?: string;
}

export function MetricCard({ title, value, status = "neutral", statusText }: MetricCardProps) {
  const statusStyles = {
    success: "text-success",
    warning: "text-warning",
    error: "text-destructive",
    neutral: "text-muted-foreground",
  };

  return (
    <div className="metric-card">
      <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
      <p className="text-3xl font-semibold text-foreground">{value}</p>
      {statusText && (
        <p className={cn("text-xs mt-2", statusStyles[status])}>
          {statusText}
        </p>
      )}
    </div>
  );
}
