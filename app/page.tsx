import Link from "next/link";
import { CloudLightning, Flame, MapPinned, Satellite, ShieldAlert, Waves } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const riskCards = [
  {
    title: "Enchente",
    icon: Waves,
    description: "Leitura de chuva acumulada e umidade para identificar regiões com potencial de alagamento.",
  },
  {
    title: "Deslizamento",
    icon: ShieldAlert,
    description: "Correlação entre solo encharcado, histórico recente e volume projetado de precipitação.",
  },
  {
    title: "Tempestade",
    icon: CloudLightning,
    description: "Monitoramento de rajadas de vento e instabilidades atmosféricas em curto prazo.",
  },
  {
    title: "Calor extremo",
    icon: Flame,
    description: "Detecção de picos de temperatura que podem comprometer conforto térmico e saúde pública.",
  },
  {
    title: "Seca",
    icon: MapPinned,
    description: "Avaliação de baixa umidade e ausência de chuva em janelas recentes de observação.",
  },
];

export default function HomePage() {
  return (
    <main className="space-y-8 pb-10">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-hero-grid px-6 py-16 shadow-glow sm:px-10 lg:px-14">
        <div className="absolute right-6 top-6 hidden rounded-full border border-white/10 bg-white/10 p-4 backdrop-blur md:block">
          <Satellite className="h-10 w-10 animate-float text-cyan-200" />
        </div>
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100">
            Plataforma de Monitoramento Climático
          </p>
          <h1 className="font-display text-5xl leading-tight text-white sm:text-6xl">
            SpaceGuard Climate transforma dados espaciais em informação estratégica.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
            A plataforma cruza previsão horária, histórico meteorológico e geolocalização para apoiar a prevenção de
            enchentes, tempestades, deslizamentos, ondas de calor e seca com leitura clara e foco em tomada de decisão.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/dashboard">
              <Button size="lg">Analisar risco climático</Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline">
                Conhecer o projeto
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-200">Problema real</p>
          <h2 className="mt-4 font-display text-3xl text-white">Eventos extremos exigem leitura rápida e acessível.</h2>
          <p className="mt-4 text-base leading-7 text-slate-300">
            Muitas comunidades, escolas e gestores públicos não têm acesso fácil a painéis meteorológicos técnicos. Em
            cenários críticos, essa barreira atrasa decisões e amplia a exposição a danos humanos, sociais e ambientais.
          </p>
        </Card>
        <Card>
          <p className="text-sm uppercase tracking-[0.24em] text-violet-200">Solução</p>
          <h2 className="mt-4 font-display text-3xl text-white">Dados espaciais convertidos em leitura operacional.</h2>
          <p className="mt-4 text-base leading-7 text-slate-300">
            O SpaceGuard Climate consulta bases públicas, calcula um índice geral de risco e apresenta orientações em
            português com gráficos, mapa interativo e histórico de análises.
          </p>
        </Card>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-200">Riscos monitorados</p>
            <h2 className="mt-3 font-display text-3xl text-white">Cinco frentes prioritárias para prevenção</h2>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {riskCards.map(({ title, icon: Icon, description }) => (
            <Card key={title} className="group transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30">
              <div className="mb-4 inline-flex rounded-3xl border border-white/10 bg-white/10 p-3">
                <Icon className="h-5 w-5 text-cyan-200 transition group-hover:scale-110" />
              </div>
              <h3 className="font-display text-xl text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
