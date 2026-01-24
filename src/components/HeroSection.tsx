import { Activity, TrendingUp, Users, Shield } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-hero text-primary-foreground">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container relative py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 animate-fade-in">
            <Activity className="w-4 h-4" />
            <span className="text-sm font-medium">Sistema de Vigilância Alimentar e Nutricional</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-slide-up">
            Monitoramento do Estado
            <br />
            <span className="text-white/90">Nutricional Brasileiro</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Acesse dados atualizados sobre a situação nutricional da população brasileira. 
            Visualize indicadores por região, faixa etária e período para apoiar políticas públicas de saúde.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <StatCard icon={Users} value="27" label="Estados" />
            <StatCard icon={Activity} value="5.570" label="Municípios" />
            <StatCard icon={TrendingUp} value="Tempo Real" label="Dados Atualizados" />
            <StatCard icon={Shield} value="SUS" label="Dados Oficiais" />
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path 
            d="M0 50L48 45.7C96 41.3 192 32.7 288 30.2C384 27.7 480 31.3 576 38.3C672 45.3 768 55.7 864 58.2C960 60.7 1056 55.3 1152 50C1248 44.7 1344 39.3 1392 36.7L1440 34V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" 
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
}

interface StatCardProps {
  icon: React.ElementType;
  value: string;
  label: string;
}

function StatCard({ icon: Icon, value, label }: StatCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
      <Icon className="w-6 h-6 text-white/80" />
      <span className="text-2xl md:text-3xl font-bold">{value}</span>
      <span className="text-sm text-white/70">{label}</span>
    </div>
  );
}
