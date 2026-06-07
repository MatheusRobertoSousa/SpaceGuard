import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Link from "next/link";

import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "SpaceGuard Climate",
  description: "Plataforma de monitoramento climático com dados espaciais e meteorológicos.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <div className="mx-auto min-h-screen max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <header className="mb-10 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
            <Link href="/" className="flex items-center">
              <div>
                <p className="font-display text-xl text-white">SpaceGuard Climate</p>
                <p className="text-sm text-slate-400">Monitoramento climático com dados espaciais</p>
              </div>
            </Link>
            <nav className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
              <Link href="/" className="rounded-full px-4 py-2 transition hover:bg-white/10">
                Início
              </Link>
              <Link href="/about" className="rounded-full px-4 py-2 transition hover:bg-white/10">
                Sobre
              </Link>
              <Link href="/dashboard">
                <Button size="sm">Analisar risco climático</Button>
              </Link>
            </nav>
          </header>
          <PageTransition>{children}</PageTransition>
        </div>
      </body>
    </html>
  );
}
