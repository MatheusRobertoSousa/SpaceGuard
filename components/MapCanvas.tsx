"use client";

import L from "leaflet";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";

import type { SearchLocation } from "@/types";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconAnchor: [12, 41],
});

function MapViewport({ location }: { location: SearchLocation }) {
  const map = useMap();

  useEffect(() => {
    map.setView([location.latitude, location.longitude], map.getZoom());
  }, [location, map]);

  return null;
}

function MapClickHandler({
  onLocationSelect,
}: {
  onLocationSelect?: (coordinates: { latitude: number; longitude: number }) => void;
}) {
  useMapEvents({
    click(event) {
      onLocationSelect?.({
        latitude: event.latlng.lat,
        longitude: event.latlng.lng,
      });
    },
  });

  return null;
}

export function MapCanvas({
  location,
  onLocationSelect,
}: {
  location: SearchLocation;
  onLocationSelect?: (coordinates: { latitude: number; longitude: number }) => void;
}) {
  return (
    <MapContainer center={[location.latitude, location.longitude]} zoom={10} scrollWheelZoom={false}>
      <MapViewport location={location} />
      <MapClickHandler onLocationSelect={onLocationSelect} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[location.latitude, location.longitude]} icon={icon}>
        <Popup>
          {location.city}
          <br />
          {location.latitude.toFixed(2)}, {location.longitude.toFixed(2)}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
