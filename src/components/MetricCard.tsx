import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'success' | 'warning' | 'risk';
  className?: string;
}

const variantStyles = {
  default: {
    bg: 'bg-primary/10',
    icon: 'text-primary',
    border: 'border-primary/20',
  },
  success: {
    bg: 'bg-success/10',
    icon: 'text-success',
    border: 'border-success/20',
  },
  warning: {
    bg: 'bg-warning/10',
    icon: 'text-warning',
    border: 'border-warning/20',
  },
  risk: {
    bg: 'bg-risk/10',
    icon: 'text-risk',
    border: 'border-risk/20',
  },
};

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
  className,
}: MetricCardProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-card rounded-xl border shadow-card p-6 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1',
        styles.border,
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground">{value}</span>
            {trend && (
              <span
                className={cn(
                  'text-sm font-medium',
                  trend.isPositive ? 'text-success' : 'text-risk'
                )}
              >
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className={cn('p-3 rounded-xl', styles.bg)}>
          <Icon className={cn('w-6 h-6', styles.icon)} />
        </div>
      </div>

      {/* Decorative gradient */}
      <div
        className={cn(
          'absolute -right-10 -bottom-10 w-32 h-32 rounded-full opacity-10',
          styles.bg
        )}
      />
    </div>
  );
}
