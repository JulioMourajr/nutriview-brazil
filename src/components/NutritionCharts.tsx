import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import { NutritionalMetrics, SisvanData } from '@/types/sisvan';
import { getChartData, getDistributionData } from '@/hooks/useSisvanData';

interface ChartsProps {
  data: SisvanData[];
  metrics: NutritionalMetrics;
}

const COLORS = {
  magreza: 'hsl(38, 92%, 50%)',
  eutrofico: 'hsl(142, 76%, 36%)',
  sobrepeso: 'hsl(25, 95%, 53%)',
  obesidade: 'hsl(0, 84%, 60%)',
};

export function DistributionChart({ data, metrics }: ChartsProps) {
  const chartData = getDistributionData(metrics);

  return (
    <div className="bg-card rounded-xl border border-border/50 shadow-card p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Distribuição do Estado Nutricional</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => value.toLocaleString('pt-BR')}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function RegionalChart({ data }: { data: SisvanData[] }) {
  const chartData = getChartData(data);

  return (
    <div className="bg-card rounded-xl border border-border/50 shadow-card p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Comparativo por Estado</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
            <Tooltip
              formatter={(value: number) => value.toLocaleString('pt-BR')}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar dataKey="eutrofico" name="Eutrófico" fill={COLORS.eutrofico} radius={[4, 4, 0, 0]} />
            <Bar dataKey="sobrepeso" name="Sobrepeso" fill={COLORS.sobrepeso} radius={[4, 4, 0, 0]} />
            <Bar dataKey="obesidade" name="Obesidade" fill={COLORS.obesidade} radius={[4, 4, 0, 0]} />
            <Bar dataKey="magreza" name="Magreza" fill={COLORS.magreza} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function TrendChart({ data }: { data: SisvanData[] }) {
  const chartData = getChartData(data);

  return (
    <div className="bg-card rounded-xl border border-border/50 shadow-card p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Evolução Temporal</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
            <Tooltip
              formatter={(value: number) => value.toLocaleString('pt-BR')}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="total"
              name="Total Acompanhamentos"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
