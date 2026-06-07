import type { HistoryEntry } from "@/types";

export interface AnalysisRepository {
  save(entry: HistoryEntry): Promise<void>;
  list(): Promise<HistoryEntry[]>;
}

export interface PostgresRepositoryConfig {
  connectionString: string;
  ssl: boolean;
}

export function getPostgresRepositoryConfig(): PostgresRepositoryConfig | null {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  return {
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.POSTGRES_SSL === "true",
  };
}

export class PostgresAnalysisRepository implements AnalysisRepository {
  constructor(private readonly config: PostgresRepositoryConfig) {}

  async save(_entry: HistoryEntry) {
    void this.config;
    throw new Error("Integração PostgreSQL ainda não ativada. Use a camada localStorage no cliente por enquanto.");
  }

  async list() {
    void this.config;
    return [];
  }
}
