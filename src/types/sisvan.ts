export interface SisvanData {
  id?: number;
  uf: string;
  municipio?: string;
  codigoMunicipio?: string;
  cicloVida: string;
  ano: number;
  totalAcompanhamentos: number;
  magreza: number;
  magreza_acentuada?: number;
  eutrofico: number;
  risco_sobrepeso?: number;
  sobrepeso: number;
  obesidade: number;
  obesidade_grave?: number;
}

export interface FilterState {
  cicloVida: string;
  uf: string;
  municipio: string;
  ano: string;
}

export interface NutritionalMetrics {
  total: number;
  magreza: number;
  magrezaPercentual: number;
  eutrofico: number;
  eutroficoPercentual: number;
  sobrepeso: number;
  sobrepesoPercentual: number;
  obesidade: number;
  obesidadePercentual: number;
}

export const CICLOS_VIDA = [
  { value: 'crianca', label: 'Crianças' },
  { value: 'adolescente', label: 'Adolescentes' },
  { value: 'adulto', label: 'Adultos' },
  { value: 'idoso', label: 'Idosos' },
  { value: 'gestante', label: 'Gestantes' },
];

export const UFS = [
  { value: '', label: 'Todos os Estados' },
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
];

export const ANOS = [
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' },
  { value: '2020', label: '2020' },
  { value: '2019', label: '2019' },
  { value: '2018', label: '2018' },
];
