# SpaceGuard Climate

Plataforma web para monitoramento climatico com dados meteorologicos e espaciais, voltada a analise preventiva de eventos como enchentes, deslizamentos, tempestades, ondas de calor e seca.

## Visao geral

O projeto consolida dados de previsao e historico meteorologico em um painel unico, com indicadores de risco, graficos, mapa e orientacoes preventivas. A aplicacao foi desenvolvida para transformar informacoes tecnicas em uma leitura mais clara e operacional.

## Principais funcionalidades

- Consulta por cidade ou coordenadas geograficas.
- Obtencao automatica de latitude e longitude via geocoding.
- Consumo de previsao meteorologica da Open-Meteo.
- Complemento analitico com historico recente da NASA POWER.
- Calculo de indice geral de risco com classificacao por severidade.
- Exibicao de metricas, graficos, mapa e recomendacoes preventivas.
- Historico local de consultas com estrutura preparada para futura integracao com PostgreSQL.

## Tecnologias utilizadas

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- Recharts
- Leaflet e React Leaflet

## APIs integradas

- Open-Meteo Geocoding API
- Open-Meteo Forecast API
- NASA POWER API

## Estrutura da aplicacao

- `app/`: paginas, layout global e rota `api/analyze`
- `components/`: componentes visuais e widgets do dashboard
- `lib/api/`: integracoes com servicos externos
- `lib/risk/`: regra de calculo do indice de risco
- `lib/repositories/`: base para persistencia e futura integracao com PostgreSQL
- `types/`: contratos de tipos da aplicacao

## Como executar localmente

### Requisitos

- Node.js 20 ou superior
- npm

### Instalacao

```bash
npm install
```

### Variaveis de ambiente

Use o arquivo `.env.example` como referencia:

```env
NEXT_PUBLIC_APP_NAME=SpaceGuard Climate
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/spaceguard_climate
POSTGRES_SSL=false
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

Aplicacao disponivel em `http://localhost:3000`.

### Build de producao

```bash
npm run build
npm run start
```

## Logica de risco

A funcao [`calculateDisasterRisk`](./lib/risk/calculateDisasterRisk.ts) combina dados atuais, previsao das proximas 24 horas e historico recente para estimar risco em cinco frentes:

- enchente
- deslizamento
- tempestade
- calor extremo
- seca

O resultado e convertido em um indice geral de 0 a 100 e classificado nos niveis `BAIXO`, `MODERADO`, `ALTO` e `CRITICO`.

## Persistencia e expansao

O projeto opera atualmente com historico no cliente e possui preparacao para evolucao com PostgreSQL:

- configuracao de ambiente em `.env.example`
- contrato de repositorio em [`lib/repositories/analysisRepository.ts`](./lib/repositories/analysisRepository.ts)
- script inicial em [`lib/repositories/schema.sql`](./lib/repositories/schema.sql)

## Observacoes tecnicas

- A rota [`/api/analyze`](./app/api/analyze/route.ts) utiliza dados ao vivo sempre que possivel.
- Em caso de indisponibilidade de APIs externas, a aplicacao retorna dados de referencia temporarios para preservar a experiencia de uso.
- A estrutura do projeto e compativel com deploy em plataformas como Vercel.
