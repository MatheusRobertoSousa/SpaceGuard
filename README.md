# SpaceGuard Climate

Plataforma de monitoramento climático com dados espaciais e meteorológicos, desenvolvida para apoiar a prevenção de enchentes, deslizamentos, tempestades, ondas de calor e seca.

## 1. Nome do projeto

**SpaceGuard Climate - Plataforma de Monitoramento Climático com Dados Espaciais**

## 2. Descrição

Aplicação web construída com Next.js para consultar dados climáticos reais, calcular um índice de risco para desastres naturais e apresentar visualizações claras com gráficos, mapa e orientações preventivas em português.

## 3. Problema abordado

Eventos climáticos extremos, como enchentes, deslizamentos e ondas de calor, afetam milhares de pessoas todos os anos. Muitas comunidades não têm acesso fácil a dados técnicos de previsão climática. O projeto busca transformar dados espaciais e meteorológicos em informações simples, visuais e úteis para prevenção.

## 4. Solução proposta

O SpaceGuard Climate permite pesquisar uma cidade ou informar coordenadas geográficas para:

- Buscar latitude e longitude automaticamente.
- Consultar dados meteorológicos da Open-Meteo.
- Complementar a análise com histórico recente da NASA POWER.
- Calcular um índice geral de risco entre 0 e 100.
- Exibir orientações preventivas para apoio à decisão.
- Manter histórico de consultas com estrutura pronta para futura integração com PostgreSQL.

## 5. Tecnologias utilizadas

- Next.js 16 com App Router
- TypeScript
- Tailwind CSS
- Componentes reutilizáveis inspirados em shadcn/ui
- React Hook Form
- Zod
- Recharts
- React Leaflet + Leaflet
- API Routes do Next.js

## 6. APIs utilizadas

- Open-Meteo Geocoding API
- Open-Meteo Forecast API
- NASA POWER API

## 7. Como executar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## 8. Prints sugeridos

- Página inicial com apresentação do projeto.
- Dashboard preenchido após uma busca por cidade.
- Cards de métricas e indicador de alerta.
- Gráficos de temperatura, chuva e vento.
- Radar de risco e mapa com marcador.
- Página Sobre com justificativa e impacto social.

## 9. Como funciona o cálculo de risco

A função [`calculateDisasterRisk`](./lib/risk/calculateDisasterRisk.ts) usa dados atuais, previsão das próximas 24 horas e histórico recente para estimar cinco frentes de risco:

- Enchente: aumenta com precipitação acumulada e umidade alta.
- Deslizamento: aumenta com chuva intensa, solo já úmido e volume acima de 50 mm.
- Tempestade: aumenta com rajadas de vento e chuva associada.
- Calor extremo: aumenta com temperatura acima de 35°C e baixa umidade.
- Seca: aumenta com umidade baixa, pouca chuva recente e calor persistente.

O índice geral é uma média ponderada desses riscos e retorna os níveis:

- `BAIXO`
- `MODERADO`
- `ALTO`
- `CRITICO`

## 10. Impacto esperado

O impacto esperado é apoiar a prevenção de desastres, facilitar a leitura de dados climáticos e ajudar cidadãos, escolas, comunidades e gestores públicos a tomarem decisões mais rápidas.

## 11. Próximos passos

- Integrar histórico e usuários com PostgreSQL.
- Criar autenticação e perfis de acesso.
- Adicionar alertas oficiais e notificações de monitoramento.
- Incluir sensores IoT e dados de defesa civil.
- Evoluir o modelo heurístico para um motor analítico mais robusto.

## 12. Integrantes do grupo

- Preencher com os nomes do grupo.

## 13. Link para vídeo de apresentação

- Inserir link do vídeo aqui.

## Roteiro sugerido para apresentação

### 0:00 - 0:40 - Problema

"Eventos climáticos extremos, como enchentes, deslizamentos e ondas de calor, afetam milhares de pessoas todos os anos. Muitas comunidades não têm acesso fácil a dados técnicos de previsão climática. O problema que nosso projeto busca resolver é transformar dados espaciais e meteorológicos em informações simples, visuais e úteis para prevenção."

### 0:40 - 1:20 - Solução

"O SpaceGuard Climate é uma plataforma web que analisa uma localização informada pelo usuário e calcula o nível de risco climático. A aplicação usa dados da Open-Meteo e NASA POWER para gerar indicadores claros, visualizações e orientações preventivas."

### 1:20 - 2:20 - Tecnologias

"O projeto foi desenvolvido com Next.js, TypeScript, Tailwind CSS, Recharts e Leaflet. A Open-Meteo é usada para previsão horária de temperatura, chuva, umidade e vento. A NASA POWER atua como fonte complementar de dados meteorológicos globais baseados em observações e modelos espaciais."

### 2:20 - 3:20 - Demonstração

"Agora vamos demonstrar a plataforma. Ao digitar uma cidade, o sistema busca as coordenadas, consulta as APIs climáticas e gera um painel com temperatura, chuva, vento, umidade e nível de alerta. Também são exibidos gráficos, mapa da região e orientações preventivas."

### 3:20 - 4:00 - Impacto

"O impacto esperado é apoiar a prevenção de desastres, facilitar a leitura de dados climáticos e ajudar cidadãos, escolas, comunidades e gestores públicos a tomarem decisões mais rápidas. Em versões futuras, o sistema poderá integrar alertas oficiais, sensores IoT e novas fontes de monitoramento."

## Estrutura do projeto

```txt
spaceguard-climate/
├── app/
├── components/
├── lib/
│   ├── api/
│   ├── repositories/
│   └── risk/
├── public/
├── types/
├── .env.example
├── README.md
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Preparação para PostgreSQL

A base já foi preparada para integração futura com PostgreSQL:

- Variáveis em `.env.example` com `DATABASE_URL`.
- Interface de repositório em [`lib/repositories/analysisRepository.ts`](./lib/repositories/analysisRepository.ts).
- Script inicial de tabela em [`lib/repositories/schema.sql`](./lib/repositories/schema.sql).

## Observações importantes

- Se uma API externa falhar, a rota `/api/analyze` mantém a visualização disponível com dados de referência temporários.
- O projeto foi estruturado para deploy simples na Vercel.
