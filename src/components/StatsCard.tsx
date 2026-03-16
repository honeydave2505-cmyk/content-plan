interface StatsCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  color: string;
}

export default function StatsCard({ label, value, icon, trend, color }: StatsCardProps) {
  return (
    <div className="bg-card-bg rounded-xl border border-border p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-foreground/60">{label}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {trend && (
            <p className="text-xs text-success mt-1">{trend}</p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
