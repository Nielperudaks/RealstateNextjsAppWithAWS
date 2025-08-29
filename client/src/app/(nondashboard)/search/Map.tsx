"use client";
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useAppSelector } from "@/state/redux";
import { useGetPropertiesQuery } from "@/state/api";
import { Property } from "@/types/prismaTypes";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

const Map = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const filters = useAppSelector((state) => state.global.filters);

  const {
    data: properties,
    isLoading,
    isError,
  } = useGetPropertiesQuery(filters);

  /**
   * 1. Initialize map ONCE with safe fallback center
   */
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/nielperuda/cmeu5qa4j00hv01si2dfia413",
      center: [-74.5, 40], // ✅ fallback (always valid)
      zoom: 10,
    });

    mapRef.current.on("load", () => {
      setTimeout(() => mapRef.current?.resize(), 200);
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  /**
   * 2. Fly to filters.coordinates AFTER Redux hydration
   */
  useEffect(() => {
    if (!mapRef.current || !filters.coordinates) return;

    mapRef.current.flyTo({
      center: filters.coordinates,
      zoom: 10,
      essential: true,
    });

    // Ensure tiles actually rerender
    setTimeout(() => mapRef.current?.resize(), 200);
  }, [filters.coordinates]); // runs after hydration

  /**
   * 3. Update property markers when API data changes
   */
  useEffect(() => {
    if (!mapRef.current || isLoading || isError || !properties) return;

    // Clear old markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add new markers
    properties.forEach((property) => {
      const marker = createPropertyMarker(property, mapRef.current!);
      markersRef.current.push(marker);

      // Optional: adjust default Mapbox marker color
      const markerElement = marker.getElement();
      const path = markerElement.querySelector("path[fill='#3fb1ce']");
      if (path) path.setAttribute("fill", "#000000");
    });
  }, [properties, isLoading, isError]);

  return (
    <div className="basis-5/12 grow relative rounded-xl">
      <div
        className="map-container rounded-xl"
        ref={mapContainerRef}
        style={{ height: "100%", width: "100%" }}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-xl z-10">
          Loading...
        </div>
      )}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-100 text-red-600 rounded-xl z-10">
          Failed to fetch properties
        </div>
      )}
    </div>
  );
};

const createPropertyMarker = (property: Property, map: mapboxgl.Map) => {
  const marker = new mapboxgl.Marker()
    .setLngLat([
      property.location.coordinates.longitude,
      property.location.coordinates.latitude,
    ])
    .setPopup(
      new mapboxgl.Popup().setHTML(
        `
        <div class="marker-popup">
          <div class="marker-popup-image"></div>
          <div>
            <a href="/search/${property.id}" target="_blank" class="marker-popup-title">${property.name}</a>
            <p class="marker-popup-price">
              $${property.pricePerMonth}
              <span class="marker-popup-price-unit"> / month</span>
            </p>
          </div>
        </div>
        `
      )
    )
    .addTo(map);

  return marker;
};

export default Map;
