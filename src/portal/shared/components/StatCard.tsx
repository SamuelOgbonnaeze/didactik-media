

interface StatCardProps {
  label: string;
  value: number | string;
  accent?: 'primary' | 'secondary' | 'yellow' | 'red' | 'green';
  sublabel?: string;
  loading?: boolean;
}

const ACCENT_COLORS = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  yellow: 'text-yellow-500',
  red: 'text-red-600',
  green: 'text-green-600',
};

export function StatCard({ label, value, accent = 'primary', sublabel, loading = false }: StatCardProps) {
  const colorClass = ACCENT_COLORS[accent] ?? ACCENT_COLORS.primary;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col justify-between">
      <div>
        {loading ? (
          <div className="h-9 bg-gray-200 rounded animate-pulse w-16 mb-1"></div>
        ) : (
          <div className={`text-3xl font-bold font-serif ${colorClass}`}>
            {value}
          </div>
        )}
        <div className="text-xs uppercase tracking-wide text-gray-500 mt-1">
          {label}
        </div>
      </div>
      {sublabel && (
        <div className="text-xs text-gray-400 mt-0.5">
          {sublabel}
        </div>
      )}
    </div>
  );
}
