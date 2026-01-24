import { Download, FileText, Table } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SisvanData } from '@/types/sisvan';
import { toast } from 'sonner';

interface ExportOptionsProps {
  data: SisvanData[];
  disabled?: boolean;
}

export function ExportOptions({ data, disabled }: ExportOptionsProps) {
  const exportToCSV = () => {
    if (!data || data.length === 0) {
      toast.error('Não há dados para exportar');
      return;
    }

    const headers = ['UF', 'Ciclo de Vida', 'Ano', 'Total', 'Magreza', 'Eutrófico', 'Sobrepeso', 'Obesidade'];
    const rows = data.map((d) => [
      d.uf,
      d.cicloVida,
      d.ano,
      d.totalAcompanhamentos,
      d.magreza,
      d.eutrofico,
      d.sobrepeso,
      d.obesidade,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `sisvan_dados_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    toast.success('Arquivo CSV exportado com sucesso!');
  };

  const exportToPDF = () => {
    toast.info('Funcionalidade de PDF será implementada em breve');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={disabled} className="gap-2">
          <Download className="w-4 h-4" />
          Exportar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover z-50">
        <DropdownMenuItem onClick={exportToCSV} className="gap-2 cursor-pointer">
          <Table className="w-4 h-4" />
          Exportar CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToPDF} className="gap-2 cursor-pointer">
          <FileText className="w-4 h-4" />
          Exportar PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
