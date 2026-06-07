import { Card } from "@/components/ui/card";

const sections = [
  {
    title: "Problema real",
    text: "O aumento da frequência de eventos climáticos extremos torna essencial o uso de tecnologia para antecipar riscos e proteger vidas. Muitas comunidades ainda recebem dados técnicos em formatos difíceis de interpretar no dia a dia.",
  },
  {
    title: "Justificativa",
    text: "Ao unir previsão meteorológica, dados espaciais e uma visualização acessível, o projeto reduz barreiras de leitura e acelera a compreensão do cenário por cidadãos, escolas, comunidades e equipes públicas.",
  },
  {
    title: "Como os dados espaciais ajudam",
    text: "Satélites, modelos atmosféricos e serviços geográficos permitem identificar padrões de chuva intensa, calor extremo, ventos fortes e condições favoráveis a enchentes, deslizamentos e períodos de seca.",
  },
  {
    title: "Tecnologias utilizadas",
    text: "Next.js, TypeScript, Tailwind CSS, componentes inspirados em shadcn/ui, React Hook Form, Zod, Recharts, React Leaflet, Open-Meteo e NASA POWER compõem a base do protótipo.",
  },
  {
    title: "Impacto social esperado",
    text: "A solução busca apoiar prevenção de desastres, leitura de risco climático e tomada de decisão mais rápida em áreas vulneráveis, com uma experiência simples e compreensível.",
  },
  {
    title: "Limitações atuais",
    text: "Esta versão depende de APIs públicas externas e usa histórico em localStorage. O cálculo é heurístico e serve como apoio visual, não como substituto de alertas oficiais.",
  },
  {
    title: "Próximos passos",
    text: "Os próximos ciclos podem incluir integração oficial com PostgreSQL, alertas automáticos, autenticação de usuários, painéis administrativos, sensores IoT e envio de notificações.",
  },
];

export default function AboutPage() {
  return (
    <main className="space-y-8 pb-10">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 px-6 py-14 shadow-glow backdrop-blur-xl sm:px-10">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-200">Sobre o projeto</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl text-white">Tecnologia climática acessível para prevenção e resposta.</h1>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-300">
          Dados obtidos por satélites, modelos meteorológicos e APIs climáticas permitem identificar padrões de chuva
          intensa, calor extremo, ventos fortes e condições favoráveis a desastres naturais. O SpaceGuard Climate
          propõe uma interface simples e acessível para transformar dados técnicos em alertas compreensíveis.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        {sections.map((section) => (
          <Card key={section.title}>
            <h2 className="font-display text-2xl text-white">{section.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">{section.text}</p>
          </Card>
        ))}
      </section>
    </main>
  );
}
