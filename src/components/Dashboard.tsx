import { useState } from 'react';
import { Users, TrendingUp, AlertTriangle, Scale, Activity } from 'lucide-react';
import { FilterState } from '@/types/sisvan';
import { useSisvanData, calculateMetrics } from '@/hooks/useSisvanData';
import { FilterPanel } from './FilterPanel';
import { MetricCard } from './MetricCard';
import { DistributionChart, RegionalChart, TrendChart } from './NutritionCharts';
import { BrazilMap } from './BrazilMap';
import { DashboardSkeleton } from './LoadingSkeleton';
import { ErrorState } from './ErrorState';
import { ExportOptions } from './ExportOptions';

const defaultFilters: FilterState = {
  cicloVida: 'adulto',
  uf: '',
  municipio: '',
  ano: '2023',
};

export function Dashboard() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const { data, isLoading, isError, refetch } = useSisvanData(filters);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value === 'all' ? '' : value }));
  };

  const handleReset = () => {
    setFilters(defaultFilters);
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <DashboardSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container py-8">
        <ErrorState onRetry={() => refetch()} />
      </div>
    );
  }

  const metrics = calculateMetrics(data || []);

  return (
    <div className="container py-8 space-y-8">
      {/* Filters */}
      <FilterPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />

      {/* Actions Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Painel de Indicadores</h2>
        </div>
        <ExportOptions data={data || []} disabled={!data?.length} />
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total de Acompanhamentos"
          value={metrics.total.toLocaleString('pt-BR')}
          subtitle="Registros no período"
          icon={Users}
          variant="default"
        />
        <MetricCard
          title="Estado Eutrófico"
          value={`${metrics.eutroficoPercentual.toFixed(1)}%`}
          subtitle={`${metrics.eutrofico.toLocaleString('pt-BR')} indivíduos`}
          icon={TrendingUp}
          variant="success"
        />
        <MetricCard
          title="Sobrepeso"
          value={`${metrics.sobrepesoPercentual.toFixed(1)}%`}
          subtitle={`${metrics.sobrepeso.toLocaleString('pt-BR')} indivíduos`}
          icon={Scale}
          variant="warning"
        />
        <MetricCard
          title="Obesidade"
          value={`${metrics.obesidadePercentual.toFixed(1)}%`}
          subtitle={`${metrics.obesidade.toLocaleString('pt-BR')} indivíduos`}
          icon={AlertTriangle}
          variant="risk"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DistributionChart data={data || []} metrics={metrics} />
        <RegionalChart data={data || []} />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrendChart data={data || []} />
        <BrazilMap data={data || []} />
      </div>
    </div>
  );
}
