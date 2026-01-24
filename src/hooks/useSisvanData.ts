import { useQuery } from '@tanstack/react-query';
import { FilterState, SisvanData, NutritionalMetrics } from '@/types/sisvan';

// Use environment variable for API base URL with fallback
const API_BASE = import.meta.env.VITE_SISVAN_API_URL || 'https://apidadosabertos.saude.gov.br/v1/sisvan/estado-nutricional';

// All Brazilian states by region for complete data generation
const ESTADOS_POR_REGIAO = {
  norte: ['AC', 'AM', 'AP', 'PA', 'RO', 'RR', 'TO'],
  nordeste: ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'],
  centroOeste: ['DF', 'GO', 'MT', 'MS'],
  sudeste: ['ES', 'MG', 'RJ', 'SP'],
  sul: ['PR', 'RS', 'SC'],
};

const TODOS_ESTADOS = [
  ...ESTADOS_POR_REGIAO.norte,
  ...ESTADOS_POR_REGIAO.nordeste,
  ...ESTADOS_POR_REGIAO.centroOeste,
  ...ESTADOS_POR_REGIAO.sudeste,
  ...ESTADOS_POR_REGIAO.sul,
];

// Mock data for demonstration when API is unavailable
const generateMockData = (filters: FilterState): SisvanData[] => {
  const baseData: SisvanData[] = [];
  
  // If a specific UF is selected, use only that one; otherwise use ALL states
  const ufs = filters.uf && filters.uf !== 'all' ? [filters.uf] : TODOS_ESTADOS;
  
  ufs.forEach(uf => {
    // Use seeded random based on UF to ensure consistent data per state
    const seed = uf.charCodeAt(0) + uf.charCodeAt(1);
    const seededRandom = (offset: number) => {
      const x = Math.sin(seed + offset) * 10000;
      return x - Math.floor(x);
    };
    
    const base = seededRandom(1) * 50000 + 10000;
    baseData.push({
      uf,
      cicloVida: filters.cicloVida || 'adulto',
      ano: parseInt(filters.ano) || 2023,
      totalAcompanhamentos: Math.floor(base),
      magreza: Math.floor(base * (seededRandom(2) * 0.05 + 0.02)),
      eutrofico: Math.floor(base * (seededRandom(3) * 0.3 + 0.35)),
      sobrepeso: Math.floor(base * (seededRandom(4) * 0.2 + 0.15)),
      obesidade: Math.floor(base * (seededRandom(5) * 0.15 + 0.1)),
    });
  });
  
  return baseData;
};

async function fetchSisvanData(filters: FilterState): Promise<SisvanData[]> {
  const { logger, withSpan } = await import('@/lib/telemetry');
  
  return withSpan('sisvan.fetch_data', async (span) => {
    const params = new URLSearchParams();
    
    if (filters.cicloVida) params.append('cicloVida', filters.cicloVida);
    if (filters.uf) params.append('uf', filters.uf);
    if (filters.municipio) params.append('municipio', filters.municipio);
    if (filters.ano) params.append('ano', filters.ano);

    span.setAttribute('sisvan.filters.cicloVida', filters.cicloVida || 'all');
    span.setAttribute('sisvan.filters.uf', filters.uf || 'all');
    span.setAttribute('sisvan.filters.ano', filters.ano || 'all');

    const url = `${API_BASE}?${params.toString()}`;
    span.setAttribute('http.url', url);

    try {
      logger.info('Fetching SISVAN data', { url, filters });
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        logger.warn('API unavailable, using mock data', { 
          status: response.status,
          statusText: response.statusText 
        });
        span.setAttribute('sisvan.data_source', 'mock');
        return generateMockData(filters);
      }

      const data = await response.json();
      span.setAttribute('sisvan.data_source', 'api');
      span.setAttribute('sisvan.records_count', data.length);
      
      logger.info('SISVAN data fetched successfully', { 
        recordCount: data.length,
        source: 'api'
      });
      
      return data.length > 0 ? data : generateMockData(filters);
    } catch (error) {
      logger.error('API request failed, using mock data', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      span.setAttribute('sisvan.data_source', 'mock');
      span.setAttribute('sisvan.error', true);
      return generateMockData(filters);
    }
  }, { 'sisvan.operation': 'fetch' });
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
