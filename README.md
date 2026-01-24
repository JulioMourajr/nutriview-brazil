# SISVAN Dashboard

Dashboard de visualização do estado nutricional brasileiro usando dados abertos do SUS.

## 🚀 Quick Start

### Desenvolvimento Local

```bash
npm install
npm run dev
```

### Docker (Apenas Aplicação)

```bash
docker build -t sisvan-dashboard .
docker run -p 3000:80 sisvan-dashboard
```

### Docker Compose (Full Stack com Observabilidade)

```bash
docker-compose up -d
```

Serviços disponíveis:
- **Aplicação**: http://localhost:3000
- **Grafana**: http://localhost:3001 (admin/admin)
- **Prometheus**: http://localhost:9090
- **Loki**: http://localhost:3100
- **Tempo**: http://localhost:3200

## 📊 Observabilidade (LGTM Stack)

A aplicação inclui uma stack completa de observabilidade:

### Componentes

| Serviço | Porta | Descrição |
|---------|-------|-----------|
| OpenTelemetry Collector | 4317/4318 | Gateway para traces e métricas |
| Prometheus | 9090 | Coleta e armazenamento de métricas |
| Loki | 3100 | Agregação de logs |
| Tempo | 3200 | Armazenamento de traces distribuídos |
| Promtail | - | Coleta de logs dos containers |
| Grafana | 3001 | Visualização unificada |

### Correlação Logs ↔ Traces

Cada log gerado pela aplicação contém `trace_id` e `span_id`, permitindo:
- Navegar de um log para o trace correspondente
- Ver o contexto completo de uma requisição
- Identificar gargalos e erros rapidamente

### Dashboard Pré-configurado

O Grafana vem com um dashboard "SISVAN - Observability Dashboard" que inclui:
- **Métricas de Saúde**: Error Rate, Request Rate, P95 Latency
- **Logs**: Visualização com link direto para traces
- **Traces**: Explorer com waterfall de requisições

## ⚙️ Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `VITE_SISVAN_API_URL` | URL base da API SISVAN | `https://apidadosabertos.saude.gov.br/v1/sisvan/estado-nutricional` |
| `VITE_OTEL_EXPORTER_ENDPOINT` | Endpoint do OTEL Collector | `http://localhost:4318/v1/traces` |

## ☸️ Kubernetes

Manifestos disponíveis em `k8s/`:

```bash
kubectl apply -k k8s/
```

## 🔧 Estrutura do Projeto

```
├── src/
│   ├── lib/telemetry.ts      # OpenTelemetry instrumentation
│   ├── hooks/useSisvanData.ts # Data fetching with tracing
│   └── components/            # React components
├── observability/
│   ├── grafana/               # Dashboards e datasources
│   ├── prometheus/            # Configuração de scraping
│   ├── loki/                  # Configuração de logs
│   ├── tempo/                 # Configuração de traces
│   ├── promtail/              # Log collection
│   └── otel-collector/        # OTEL gateway config
├── k8s/                       # Kubernetes manifests
├── docker-compose.yml         # Full observability stack
└── Dockerfile                 # Multi-stage build
```

Painel de monitoramento do estado nutricional da população brasileira, consumindo dados da API de Dados Abertos do SUS (SISVAN).

## 🚀 Funcionalidades

- **Filtros dinâmicos**: Ciclo de vida, UF e ano de referência
- **Gráficos interativos**: Distribuição nutricional, comparativo por região e evolução temporal
- **Mapa do Brasil**: Prevalência de obesidade por região
- **Exportação**: Dados em formato CSV
- **Design responsivo**: Otimizado para desktop e mobile

## 🛠️ Tecnologias

- React 18
- TypeScript
- Tailwind CSS
- Recharts
- TanStack Query
- Vite

## 📦 Instalação Local

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build de produção
npm run build
```

## 🐳 Docker

### Build e execução com Docker

```bash
# Build da imagem
docker build -t sisvan-dashboard .

# Executar container
docker run -p 3000:80 sisvan-dashboard
```

### Docker Compose (recomendado)

```bash
# Iniciar com docker-compose
docker-compose up -d

# Parar
docker-compose down
```

A aplicação estará disponível em: http://localhost:3000

### Variáveis de Ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```env
VITE_SISVAN_API_URL=https://apidadosabertos.saude.gov.br/v1/sisvan/estado-nutricional
```

## ☸️ Kubernetes

### Pré-requisitos

- Cluster Kubernetes (minikube, kind, EKS, GKE, AKS, etc.)
- kubectl configurado
- Ingress Controller (nginx-ingress recomendado)

### Deploy

```bash
# Criar namespace
kubectl create namespace sisvan

# Aplicar manifestos
kubectl apply -k k8s/

# Verificar deployment
kubectl get pods -n sisvan
kubectl get services -n sisvan
kubectl get ingress -n sisvan
```

### Configuração do Ingress

Edite `k8s/ingress.yaml` para configurar seu domínio:

```yaml
spec:
  rules:
    - host: seu-dominio.com
```

### Recursos Alocados

| Recurso | Request | Limit |
|---------|---------|-------|
| CPU     | 100m    | 500m  |
| Memória | 128Mi   | 256Mi |

## 📊 API SISVAN

A aplicação consome o endpoint:
- `GET /v1/sisvan/estado-nutricional`

Parâmetros suportados:
- `cicloVida`: crianca, adolescente, adulto, idoso, gestante
- `uf`: Sigla do estado (SP, RJ, MG, etc.)
- `ano`: Ano de referência (2018-2024)

## Lovable

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

Para deploy rápido, abra [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) e clique em Share -> Publish.

## 📝 Licença

MIT License
