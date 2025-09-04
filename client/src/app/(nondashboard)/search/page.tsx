"use client";
import { useAppDispatch } from "@/state/redux";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import FiltersBar from "./FiltersBar";
import FiltersFull from "./FiltersFull";
import { cleanParams } from "@/lib/utils";
import { setFilters } from "@/state";
import Map from "./Map";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";
import Listings from "./Listings";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [isListingsOpen, setIsListingsOpen] = useState(false);

  useEffect(() => {
    const initialFilters = Array.from(searchParams.entries()).reduce(
      (acc: any, [key, value]) => {
        if (key === "priceRange" || key === "squareFeet") {
          acc[key] = value.split(",").map((v) => (v === "" ? null : Number(v)));
        } else if (key === "coordinates") {
          const coords = value.split(",").map(Number);
          // Validate coordinates: longitude [-180, 180], latitude [-90, 90]
          if (
            coords.length === 2 &&
            coords[0] >= -180 &&
            coords[0] <= 180 &&
            coords[1] >= -90 &&
            coords[1] <= 90
          ) {
            acc[key] = coords;
          }
          // If invalid coordinates, don't set them - let Redux use default
        } else if (key === "useLocationFilter") {
          acc[key] = value === "true";
        } else {
          acc[key] = value === "any" ? null : value;
        }

        return acc;
      },
      {}
    );

    const cleannedFilters = cleanParams(initialFilters);
    dispatch(setFilters(cleannedFilters));
  }, []);
  return (
    <div
      className="w-full mx-auto px-2 sm:px-5 flex flex-col min-h-0"
      style={{
        height: `calc(100vh - 120px)`, // Account for navbar and footer
      }}
    >
      <Sheet>
        {/* Filters Bar with horizontal scroll on mobile */}
        <div className="overflow-x-auto pb-2 mb-2 -mx-2 px-2 sm:mx-0 sm:px-0">
          <div className="min-w-max">
            <FiltersBar />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden gap-3 mb-5">
          {/* Desktop Layout */}
          <div className="hidden md:flex w-full gap-3">
            <Map />
            <div className="basis-4/12 overflow-y-auto">
              <Listings />
            </div>
          </div>

          {/* Mobile Layout - Map Only with Floating Button */}
          <div className="md:hidden w-full h-full relative">
            <div className="absolute inset-0">
              <Map />
            </div>

            {/* Floating Listings Button */}
            <Sheet open={isListingsOpen} onOpenChange={setIsListingsOpen}>
              <SheetTrigger asChild>
                <Button
                  className="absolute top-4 right-4 z-20 shadow-lg bg-white text-primary border border-primary hover:bg-primary hover:text-white"
                  size="sm"
                >
                  <List className="w-4 h-4 mr-2" />
                  Listings
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md p-0">
                <SheetHeader className="p-4 pb-2">
                  <SheetTitle>Property Listings</SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto">
                  <Listings />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Filters Sheet */}
        <SheetContent
          side="left"
          className="w-full sm:w-96 sm:max-w-96 p-0 flex flex-col"
        >
          <SheetHeader className="p-4 pb-2 border-b">
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-4">
            <FiltersFull />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SearchPage;
