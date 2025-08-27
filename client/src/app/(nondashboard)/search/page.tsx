"use client";
import { useAppDispatch } from "@/state/redux";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
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
} from "@/components/ui/sheet";
import Listings from "./Listings";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initialFilters = Array.from(searchParams.entries()).reduce(
      (acc: any, [key, value]) => {
        if (key === "priceRange" || key === "squareFeet") {
          acc[key] = value.split(",").map((v) => (v === "" ? null : Number(v)));
        } else if (key === "coordinates") {
          acc[key] = value.split(",").map(Number);
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
      className="w-full mx-auto px-5 flex flex-col"
      style={{
        height: `calc(85vh )`,
      }}
    >
      <Sheet>
        <FiltersBar />
        <div className="flex justify-between flex-1 overflow-hidden gap-3 mb-5">
          <Map/>
          <div className="basis-4/12 overflow-y-auto"><Listings/></div>
        </div>
        <SheetContent side="left" className="w-96 sm:max-w-96">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-auto px-4 pb-4">
            <FiltersFull />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SearchPage;
