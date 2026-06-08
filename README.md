# SpaceGuard Climate

Plataforma web para monitoramento climatico com dados meteorologicos e espaciais, voltada a analise preventiva de enchentes, deslizamentos, tempestades, ondas de calor e seca.

## Acesso online

Deploy em producao: [space-guard.vercel.app](https://space-guard.vercel.app/)

## Resumo

O SpaceGuard Climate centraliza previsoes, historico meteorologico e indicadores de risco em uma interface unica. A aplicacao transforma dados tecnicos em informacoes mais claras para consulta, acompanhamento e apoio a decisoes preventivas.

## Destaques

- Consulta por cidade ou coordenadas geograficas.
- Geocoding automatico para obtencao de latitude e longitude.
- Consumo de dados da Open-Meteo e da NASA POWER.
- Calculo de indice geral de risco com classificacao por severidade.
- Exibicao de metricas, graficos, mapa e orientacoes preventivas.
- Historico local de consultas com base pronta para futura integracao com PostgreSQL.

## Stack

| Camada | Tecnologias |
| --- | --- |
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS |
| Formularios e validacao | React Hook Form, Zod |
| Visualizacao | Recharts, Leaflet, React Leaflet |
| Integracoes | Open-Meteo Geocoding API, Open-Meteo Forecast API, NASA POWER API |

## Estrutura do projeto

| Diretorio | Responsabilidade |
| --- | --- |
| `app/` | Paginas, layout global e rota `api/analyze` |
| `components/` | Componentes visuais e widgets do dashboard |
| `lib/api/` | Integracoes com servicos externos |
| `lib/risk/` | Logica de calculo do indice de risco |
| `lib/repositories/` | Abstracoes de persistencia e preparacao para PostgreSQL |
| `types/` | Tipagens compartilhadas da aplicacao |

## Execucao local

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

### Desenvolvimento

```bash
npm run dev
```

A aplicacao ficara disponivel em `http://localhost:3000`.

### Producao

```bash
npm run build
npm run start
```

## Logica de risco

A funcao [`calculateDisasterRisk`](./lib/risk/calculateDisasterRisk.ts) combina dados atuais, previsao das proximas 24 horas e historico recente para estimar risco em cinco frentes:

- Enchente
- Deslizamento
- Tempestade
- Calor extremo
- Seca

O resultado e convertido em um indice geral de `0` a `100` e classificado nos niveis `BAIXO`, `MODERADO`, `ALTO` e `CRITICO`.

## Persistencia e expansao

Atualmente, o historico de consultas opera no cliente. O projeto ja possui estrutura preparada para evolucao com PostgreSQL:

- Configuracao de ambiente em `.env.example`
- Contrato de repositorio em [`lib/repositories/analysisRepository.ts`](./lib/repositories/analysisRepository.ts)
- Script inicial em [`lib/repositories/schema.sql`](./lib/repositories/schema.sql)

## Observacoes tecnicas

- A rota [`/api/analyze`](./app/api/analyze/route.ts) prioriza dados ao vivo sempre que possivel.
- Em caso de indisponibilidade de APIs externas, a aplicacao retorna dados de referencia temporarios para preservar a experiencia de uso.
- A estrutura atual e compativel com deploy em plataformas como Vercel.
