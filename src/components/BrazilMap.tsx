import { SisvanData } from '@/types/sisvan';
import { MapPin } from 'lucide-react';

interface BrazilMapProps {
  data: SisvanData[];
}

// Simplified Brazil regions with coordinates for visualization
const regions = [
  { name: 'Norte', states: ['AC', 'AP', 'AM', 'PA', 'RO', 'RR', 'TO'], x: 25, y: 20 },
  { name: 'Nordeste', states: ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'], x: 75, y: 25 },
  { name: 'Centro-Oeste', states: ['DF', 'GO', 'MT', 'MS'], x: 45, y: 45 },
  { name: 'Sudeste', states: ['ES', 'MG', 'RJ', 'SP'], x: 65, y: 60 },
  { name: 'Sul', states: ['PR', 'RS', 'SC'], x: 50, y: 80 },
];

export function BrazilMap({ data }: BrazilMapProps) {
  const getRegionData = (states: string[]) => {
    const regionData = data.filter((d) => states.includes(d.uf));
    const total = regionData.reduce((acc, d) => acc + (d.totalAcompanhamentos || 0), 0);
    const obesidade = regionData.reduce((acc, d) => acc + (d.obesidade || 0), 0);
    const percentage = total > 0 ? ((obesidade / total) * 100).toFixed(1) : '0';
    return { total, percentage };
  };

  const getColorByPercentage = (percentage: number) => {
    if (percentage > 20) return 'bg-risk/80 border-risk';
    if (percentage > 15) return 'bg-warning/80 border-warning';
    if (percentage > 10) return 'bg-warning/50 border-warning/50';
    return 'bg-success/60 border-success';
  };

  return (
    <div className="bg-card rounded-xl border border-border/50 shadow-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <MapPin className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Prevalência por Região</h3>
      </div>

      {/* Map Visualization */}
      <div className="relative aspect-square max-w-md mx-auto bg-accent/30 rounded-xl p-4">
        {/* Brazil outline approximation */}
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Simplified Brazil shape */}
          <path
            d="M20,15 Q35,5 55,10 Q75,15 85,25 Q90,40 85,55 Q80,70 70,80 Q55,90 40,85 Q25,80 20,65 Q15,50 15,35 Q15,25 20,15 Z"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            strokeDasharray="2,2"
            opacity="0.3"
          />
        </svg>

        {/* Region markers */}
        {regions.map((region) => {
          const { total, percentage } = getRegionData(region.states);
          const colorClass = getColorByPercentage(parseFloat(percentage));

          return (
            <div
              key={region.name}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${colorClass} 
                         border-2 rounded-xl p-3 min-w-[100px] text-center 
                         shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer`}
              style={{
                left: `${region.x}%`,
                top: `${region.y}%`,
              }}
            >
              <p className="text-xs font-bold text-foreground">{region.name}</p>
              <p className="text-lg font-bold text-foreground">{percentage}%</p>
              <p className="text-[10px] text-muted-foreground">
                {total.toLocaleString('pt-BR')} acomp.
              </p>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success" />
          <span className="text-muted-foreground">&lt;10% Obesidade</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-warning" />
          <span className="text-muted-foreground">10-20% Obesidade</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-risk" />
          <span className="text-muted-foreground">&gt;20% Obesidade</span>
        </div>
      </div>
    </div>
  );
}
