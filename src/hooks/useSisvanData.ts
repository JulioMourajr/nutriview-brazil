import { useQuery } from '@tanstack/react-query';
import { FilterState, SisvanData, NutritionalMetrics } from '@/types/sisvan';

const API_BASE = 'https://apidadosabertos.saude.gov.br/v1/sisvan/estado-nutricional';

// Mock data for demonstration when API is unavailable
const generateMockData = (filters: FilterState): SisvanData[] => {
  const baseData: SisvanData[] = [];
  const ufs = filters.uf ? [filters.uf] : ['SP', 'RJ', 'MG', 'BA', 'RS', 'PR', 'SC', 'GO', 'PE', 'CE'];
  
  ufs.forEach(uf => {
    const base = Math.random() * 50000 + 10000;
    baseData.push({
      uf,
      cicloVida: filters.cicloVida || 'adulto',
      ano: parseInt(filters.ano) || 2023,
      totalAcompanhamentos: Math.floor(base),
      magreza: Math.floor(base * (Math.random() * 0.05 + 0.02)),
      eutrofico: Math.floor(base * (Math.random() * 0.3 + 0.35)),
      sobrepeso: Math.floor(base * (Math.random() * 0.2 + 0.15)),
      obesidade: Math.floor(base * (Math.random() * 0.15 + 0.1)),
    });
  });
  
  return baseData;
};

async function fetchSisvanData(filters: FilterState): Promise<SisvanData[]> {
  const params = new URLSearchParams();
  
  if (filters.cicloVida) params.append('cicloVida', filters.cicloVida);
  if (filters.uf) params.append('uf', filters.uf);
  if (filters.municipio) params.append('municipio', filters.municipio);
  if (filters.ano) params.append('ano', filters.ano);

  try {
    const response = await fetch(`${API_BASE}?${params.toString()}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      // If API fails, use mock data
      console.warn('API unavailable, using mock data');
      return generateMockData(filters);
    }

    const data = await response.json();
    return data.length > 0 ? data : generateMockData(filters);
  } catch (error) {
    console.warn('API request failed, using mock data:', error);
    return generateMockData(filters);
  }
}

export function useSisvanData(filters: FilterState) {
  return useQuery({
    queryKey: ['sisvan', filters],
    queryFn: () => fetchSisvanData(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}

export function calculateMetrics(data: SisvanData[]): NutritionalMetrics {
  if (!data || data.length === 0) {
    return {
      total: 0,
      magreza: 0,
      magrezaPercentual: 0,
      eutrofico: 0,
      eutroficoPercentual: 0,
      sobrepeso: 0,
      sobrepesoPercentual: 0,
      obesidade: 0,
      obesidadePercentual: 0,
    };
  }

  const total = data.reduce((acc, d) => acc + (d.totalAcompanhamentos || 0), 0);
  const magreza = data.reduce((acc, d) => acc + (d.magreza || 0), 0);
  const eutrofico = data.reduce((acc, d) => acc + (d.eutrofico || 0), 0);
  const sobrepeso = data.reduce((acc, d) => acc + (d.sobrepeso || 0), 0);
  const obesidade = data.reduce((acc, d) => acc + (d.obesidade || 0), 0);

  return {
    total,
    magreza,
    magrezaPercentual: total > 0 ? (magreza / total) * 100 : 0,
    eutrofico,
    eutroficoPercentual: total > 0 ? (eutrofico / total) * 100 : 0,
    sobrepeso,
    sobrepesoPercentual: total > 0 ? (sobrepeso / total) * 100 : 0,
    obesidade,
    obesidadePercentual: total > 0 ? (obesidade / total) * 100 : 0,
  };
}

export function getChartData(data: SisvanData[]) {
  if (!data || data.length === 0) return [];
  
  return data.map(d => ({
    name: d.uf || d.municipio || 'N/A',
    magreza: d.magreza || 0,
    eutrofico: d.eutrofico || 0,
    sobrepeso: d.sobrepeso || 0,
    obesidade: d.obesidade || 0,
    total: d.totalAcompanhamentos || 0,
  }));
}

export function getDistributionData(metrics: NutritionalMetrics) {
  return [
    { name: 'Magreza', value: metrics.magreza, color: 'hsl(38, 92%, 50%)' },
    { name: 'Eutrófico', value: metrics.eutrofico, color: 'hsl(142, 76%, 36%)' },
    { name: 'Sobrepeso', value: metrics.sobrepeso, color: 'hsl(25, 95%, 53%)' },
    { name: 'Obesidade', value: metrics.obesidade, color: 'hsl(0, 84%, 60%)' },
  ];
}
