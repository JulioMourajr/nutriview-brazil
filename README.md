# SISVAN Dashboard

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
