"use client";

import type { HistoryEntry } from "@/types";

const STORAGE_KEY = "spaceguard-climate-history";

export function listHistory(): HistoryEntry[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as HistoryEntry[];
  } catch {
    return [];
  }
}

export function saveHistory(entry: HistoryEntry) {
  if (typeof window === "undefined") {
    return;
  }

  const current = listHistory();
  const deduped = [entry, ...current.filter((item) => item.id !== entry.id)].slice(0, 8);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(deduped));
}
