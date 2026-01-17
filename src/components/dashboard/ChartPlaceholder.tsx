interface ChartPlaceholderProps {
  title: string;
  subtitle?: string;
}

export function ChartPlaceholder({ title, subtitle }: ChartPlaceholderProps) {
  // Generate simple placeholder data points for visual representation
  const dataPoints = [40, 65, 45, 70, 55, 80, 60, 75, 50, 85, 65, 70];
  
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>
      
      <div className="h-40 flex items-end justify-between gap-1">
        {dataPoints.map((height, index) => (
          <div
            key={index}
            className="flex-1 bg-muted rounded-t transition-all hover:bg-muted-foreground/20"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      
      <div className="flex justify-between mt-3 text-xs text-muted-foreground">
        <span>12:00</span>
        <span>14:00</span>
        <span>16:00</span>
        <span>18:00</span>
        <span>20:00</span>
        <span>Now</span>
      </div>
    </div>
  );
}
