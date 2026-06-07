"use client";

import "leaflet/dist/leaflet.css";

import dynamic from "next/dynamic";

import { Card } from "@/components/ui/card";
import type { SearchLocation } from "@/types";

const LazyMap = dynamic(() => import("@/components/MapCanvas").then((module) => module.MapCanvas), {
  ssr: false,
});

export function LocationMap({
  location,
  onLocationSelect,
}: {
  location: SearchLocation;
  onLocationSelect?: (coordinates: { latitude: number; longitude: number }) => void;
}) {
  return (
    <Card className="h-[320px] overflow-hidden p-2">
      <LazyMap location={location} onLocationSelect={onLocationSelect} />
    </Card>
  );
}
