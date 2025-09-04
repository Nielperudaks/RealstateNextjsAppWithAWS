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

  // Use the same filters as the listings - this will show all properties initially,
  // and filtered properties when location search is performed
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
      center: [120.9842, 14.5995], // Philippines coordinates [longitude, latitude]
      zoom: 6, // Lower zoom to see more of Philippines
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
   * 2. Handle map view based on location filtering
   */
  useEffect(() => {
    if (!mapRef.current || !filters.coordinates) return;

    if (filters.useLocationFilter) {
      // When location filtering is enabled, fly to the searched location
      const [lng, lat] = filters.coordinates;

      // Validate coordinates before using them
      if (lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90) {
        mapRef.current.flyTo({
          center: [lng, lat],
          zoom: 10,
          essential: true,
        });

        // Ensure tiles actually rerender
        setTimeout(() => mapRef.current?.resize(), 200);
      } else {
        console.error("Invalid coordinates in filters:", filters.coordinates);
      }
    } else {
      // When location filtering is disabled, return to Philippines default view
      mapRef.current.flyTo({
        center: [120.9842, 14.5995], // Philippines coordinates
        zoom: 6,
        essential: true,
      });

      setTimeout(() => mapRef.current?.resize(), 200);
    }
  }, [filters.coordinates, filters.useLocationFilter]);

  /**
   * 3. Handle container resize (for sidebar open/close)
   */
  useEffect(() => {
    if (!mapRef.current || !mapContainerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      // Small delay to ensure DOM has updated
      setTimeout(() => {
        mapRef.current?.resize();
      }, 100);
    });

    resizeObserver.observe(mapContainerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  /**
   * 4. Update property markers when API data changes
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
    <div className="md:basis-5/12 grow relative rounded-xl w-full h-full">
      <div
        className="map-container rounded-xl w-full h-full"
        ref={mapContainerRef}
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
  const lng = property.location.coordinates.longitude;
  const lat = property.location.coordinates.latitude;

  const marker = new mapboxgl.Marker()
    .setLngLat([lng, lat])
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
