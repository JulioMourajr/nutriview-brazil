import { Filter, Calendar, MapPin, Users } from 'lucide-react';
import { FilterState, CICLOS_VIDA, UFS, ANOS } from '@/types/sisvan';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onReset: () => void;
}

export function FilterPanel({ filters, onFilterChange, onReset }: FilterPanelProps) {
  return (
    <div className="bg-card rounded-xl shadow-card border border-border/50 p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Filter className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Filtros de Pesquisa</h2>
        </div>
        <Button variant="ghost" size="sm" onClick={onReset} className="text-muted-foreground hover:text-foreground">
          Limpar
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Ciclo de Vida */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Users className="w-4 h-4 text-muted-foreground" />
            Ciclo de Vida
          </label>
          <Select
            value={filters.cicloVida}
            onValueChange={(value) => onFilterChange('cicloVida', value)}
          >
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              {CICLOS_VIDA.map((ciclo) => (
                <SelectItem key={ciclo.value} value={ciclo.value}>
                  {ciclo.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Estado (UF) */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            Estado (UF)
          </label>
          <Select
            value={filters.uf}
            onValueChange={(value) => onFilterChange('uf', value)}
          >
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50 max-h-60">
              {UFS.map((uf) => (
                <SelectItem key={uf.value} value={uf.value || 'all'}>
                  {uf.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Ano */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            Ano de Referência
          </label>
          <Select
            value={filters.ano}
            onValueChange={(value) => onFilterChange('ano', value)}
          >
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              {ANOS.map((ano) => (
                <SelectItem key={ano.value} value={ano.value}>
                  {ano.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Action Button */}
        <div className="flex items-end">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            <Filter className="w-4 h-4 mr-2" />
            Aplicar Filtros
          </Button>
        </div>
      </div>
    </div>
  );
}
