import { setFilters, setViewMode } from "@/state";
import { useAppSelector } from "@/state/redux";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { cleanParams, cn, formatPriceValue } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Filter, Grid, List, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PropertyTypeIcons } from "@/lib/constants";
import { SheetTrigger } from "@/components/ui/sheet";

const FiltersBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const filters = useAppSelector((state) => state.global.filters);
  const viewMode = useAppSelector((state) => state.global.viewMode);
  const [searchInput, setSearchInput] = useState(
    filters.location === "All Locations" ? "" : filters.location
  );

  // Sync search input with filters
  useEffect(() => {
    setSearchInput(
      filters.location === "All Locations" ? "" : filters.location
    );
  }, [filters.location]);

  const updateURL = debounce((newFilters) => {
    const cleanFilters = cleanParams(newFilters);
    const updateSearchParams = new URLSearchParams();

    Object.entries(cleanFilters).forEach(([key, value]) => {
      updateSearchParams.set(
        key,
        Array.isArray(value) ? value.join(",") : value.toString()
      );
    });

    router.push(`${pathname}?${updateSearchParams.toString()}`);
  });

  const handleFilterChange = (
    key: string,
    value: any,
    isMin: boolean | null
  ) => {
    let newValue = value;
    if (key === "priceRange" || key === "squareFeet") {
      const currentArrayRange = [...filters[key]];
      if (isMin !== null) {
        const index = isMin ? 0 : 1;
        currentArrayRange[index] = value === "any" ? null : Number(value);
      }
      newValue = currentArrayRange;
    } else if (key === "coordinates") {
      if (value === "any") {
        newValue = null; // Let Redux use default coordinates
      } else {
        const coords = Array.isArray(value)
          ? value.map(Number)
          : [Number(value[0]), Number(value[1])];
        // Validate coordinates
        if (
          coords.length === 2 &&
          coords[0] >= -180 &&
          coords[0] <= 180 &&
          coords[1] >= -90 &&
          coords[1] <= 90
        ) {
          newValue = coords;
        } else {
          console.error("Invalid coordinates:", coords);
          return; // Don't update if coordinates are invalid
        }
      }
    } else {
      newValue = value === "any" ? "any" : value;
    }

    const newFilters = { ...filters, [key]: newValue };
    dispatch(setFilters(newFilters));
    updateURL(newFilters);
  };
  const handleLocationSearch = async () => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchInput
        )}.json?access_token=${
          process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
        }&fuzzyMatch=true`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;

        // Validate coordinates before setting
        if (lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90) {
          dispatch(
            setFilters({
              location: searchInput,
              coordinates: [lng, lat], // Store as [longitude, latitude]
              useLocationFilter: true, // Enable location filtering when user searches
            })
          );
        } else {
          console.error("Invalid coordinates received from Mapbox:", [
            lng,
            lat,
          ]);
        }
      }
    } catch (err) {
      console.error("error search location: ", err);
    }
  };

  return (
    <div className="flex justify-between items-center w-full py-3 sm:py-5 gap-2">
      {/* filters */}
      <div className="flex items-center gap-2 sm:gap-4 p-1 sm:p-2">
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="gap-1 sm:gap-2 rounded-xl border-primary hover:bg-secondary text-primary text-xs sm:text-sm px-2 sm:px-3"
          >
            <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">All Filters</span>
            <span className="sm:hidden">Filters</span>
          </Button>
        </SheetTrigger>

        {/* search location */}
        <div className="flex items-center">
          <Input
            placeholder="Search location"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-24 sm:w-40 rounded-l-xl rounded-r-none border-primary border-r-0 text-xs sm:text-sm"
          />
          <Button
            onClick={handleLocationSearch}
            className="rounded-r-xl rounded-l-none shadow-none cursor-pointer px-2 sm:px-3"
            size="sm"
          >
            <Search className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
          {filters.useLocationFilter && (
            <Button
              onClick={() => {
                setSearchInput("All Locations");
                dispatch(
                  setFilters({
                    location: "All Locations",
                    useLocationFilter: false,
                  })
                );
              }}
              variant="outline"
              className="rounded-xl ml-1 border-primary text-primary hover:bg-secondary text-xs px-1 sm:px-2"
              size="sm"
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4"/>
            </Button>
          )}
        </div>

        {/* minimum price range */}
        <div className="flex gap-1">
          <Select
            value={filters.priceRange[0]?.toString() || "any"}
            onValueChange={(value) =>
              handleFilterChange("priceRange", value, true)
            }
          >
            <SelectTrigger className="w-20 sm:w-34 rounded-xl border-primary text-primary hover:bg-secondary text-xs sm:text-sm">
              <SelectValue>
                {formatPriceValue(filters.priceRange[0], true)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="any">Any Min Price</SelectItem>
              {[500, 1000, 1500, 2000, 3000, 5000, 10000].map((price) => (
                <SelectItem key={price} value={price.toString()}>
                  ${price / 1000}k+
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* maximum price range */}
          <Select
            value={filters.priceRange[1]?.toString() || "any"}
            onValueChange={(value) =>
              handleFilterChange("priceRange", value, false)
            }
          >
            <SelectTrigger className="w-20 sm:w-34 rounded-xl border-primary text-primary hover:bg-secondary text-xs sm:text-sm">
              <SelectValue>
                {formatPriceValue(filters.priceRange[1], false)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="any">Any Max Price</SelectItem>
              {[1000, 2000, 3000, 5000, 10000].map((price) => (
                <SelectItem key={price} value={price.toString()}>
                  &lt;${price / 1000}k
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* beds */}
        <div className="flex gap-1">
          <Select
            value={filters.beds}
            onValueChange={(value) => handleFilterChange("beds", value, null)}
          >
            <SelectTrigger className="w-16 sm:w-34 rounded-xl border-primary text-primary hover:bg-secondary text-xs sm:text-sm">
              <SelectValue placeholder="beds" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="any">Any beds</SelectItem>
              <SelectItem value="1">1+ bed</SelectItem>
              <SelectItem value="2">2+ beds</SelectItem>
              <SelectItem value="3">3+ beds</SelectItem>
              <SelectItem value="4">4+ beds</SelectItem>
            </SelectContent>
          </Select>

          {/* baths */}
          <Select
            value={filters.baths}
            onValueChange={(value) => handleFilterChange("baths", value, null)}
          >
            <SelectTrigger className="w-16 sm:w-34 rounded-xl border-primary text-primary hover:bg-secondary text-xs sm:text-sm">
              <SelectValue placeholder="baths" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="any">Any Baths</SelectItem>
              <SelectItem value="1">1+ bath</SelectItem>
              <SelectItem value="2">2+ baths</SelectItem>
              <SelectItem value="3">3+ baths</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* property type */}
        <Select
          value={filters.propertyType || "any"}
          onValueChange={(value) =>
            handleFilterChange("propertyType", value, null)
          }
        >
          <SelectTrigger className="w-20 sm:w-40 rounded-xl border-primary text-primary hover:bg-secondary text-xs sm:text-sm">
            <SelectValue placeholder="Home Type" />
          </SelectTrigger>
          <SelectContent className="bg-white text-primary">
            <SelectItem value="any">Any Property Type</SelectItem>
            {Object.entries(PropertyTypeIcons).map(([type, Icon]) => (
              <SelectItem key={type} value={type}>
                <div className="flex items-center">
                  <Icon className="w-4 h-4 mr-2 text-primary" />
                  <span>{type}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* view mode - hidden on mobile since listings are in a sheet */}
      <div className="hidden md:flex justify-between items-center gap-4 p-2">
        <div className="flex border rounded-xl">
          <Button
            variant="ghost"
            className={cn(
              "px-3 py-1 rounded-none rounded-l-xl hover:bg-secondary border-primary text-primary",
              viewMode === "list"
                ? "bg-primary text-primary-foreground  hover:bg-primary/90 hover:text-primary-foreground"
                : ""
            )}
            onClick={() => dispatch(setViewMode("list"))}
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "px-3 py-1 rounded-none rounded-r-xl hover:bg-secondary border-primary text-primary",
              viewMode === "grid"
                ? "bg-primary text-primary-foreground  hover:bg-primary/90 hover:text-primary-foreground"
                : ""
            )}
            onClick={() => dispatch(setViewMode("grid"))}
          >
            <Grid className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FiltersBar;
