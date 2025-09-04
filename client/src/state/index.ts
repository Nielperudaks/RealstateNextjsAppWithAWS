import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateTypes{
  filters: FiltersState;
  isFiltersFullOpen: boolean;
  viewMode: "grid" | "list"
}

export const initialState: InitialStateTypes = {
  filters:{
    location: "All Locations",
  beds: "any",
  baths: "any",
  propertyType: "any",
  amenities:  [],
  availableFrom: "any",
  priceRange: [null, null],
  squareFeet:  [null, null],
  coordinates: [120.9842, 14.5995], // Philippines coordinates [longitude, latitude]
  useLocationFilter: false
  },
  isFiltersFullOpen: false,
  viewMode: "grid"

};

export interface FiltersState{
  location: string;
  beds: string;
  baths: string;
  propertyType: string;
  amenities: string [];
  availableFrom: string;
  priceRange: [number, number] | [null, null];
  squareFeet: [number, number] | [null, null];
  coordinates: [number, number];
  useLocationFilter: boolean;
}

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<FiltersState>>)=>{
      state.filters={
        ...state.filters,
        ...action.payload
      }
    },
    toggleFiltersFullOpen:(state) =>{
      state.isFiltersFullOpen = !state.isFiltersFullOpen
    },
     setViewMode: (state, action: PayloadAction<"grid" | "list">)=>{
      state.viewMode = action.payload
     }
  },
});

export const {setFilters, toggleFiltersFullOpen, setViewMode} = globalSlice.actions;

export default globalSlice.reducer;
