"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay, Search } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setFilters } from "@/state";

const Hero01 = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleLocationSearch = async () => {
    try {
      const trimmedQuery = searchQuery.trim();
      if (!trimmedQuery) return;

      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          trimmedQuery
        )}.json?access_token=${
          process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
        }&fuzzyMatch=true`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        dispatch(
          setFilters({
            location: trimmedQuery,
            coordinates: [lng, lat], // Store as [longitude, latitude] to match the rest of the app
            useLocationFilter: true, // Enable location filtering when searching from hero
          })
        );
        const params = new URLSearchParams({
          location: trimmedQuery,
          coordinates: `${lng},${lat}`, // Store as lng,lat in URL
          useLocationFilter: "true",
        });
        router.push(`/search?${params.toString()}`);
      }
    } catch (error) {
      console.error("error search location:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <Image
        src="/landing-splash.jpg"
        alt="landing image"
        fill
        className="object-cover object-center"
        priority
      ></Image>
      <div className="absolute inset-0 bg-gray-950/60"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 text-center w-full "
      >
        <div className="max-w-4xl  mx-auto px-16 sm:px-12">
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-7xl md:leading-[1.2] font-bold text-white">
            Start your journey to finding perfect place to call home
          </h1>
          <p className="mt-6 text-[17px] md:text-lg text-white">
            Explore our wide range of rental properties tailored to fit your
            lifestyle and needs!
          </p>
          <div className="mt-12 flex items-center justify-center">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city, neighborhood or address"
              className="w-full max-w-lg rounded-none rounded-l-full border-none bg-white h-12 "
            ></Input>
            <Button
              onClick={handleLocationSearch}
              className="bg-primary text-primary-foreground rounded-none rounded-r-full border-none h-12 "
            >
              <Search /> Search
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero01;
