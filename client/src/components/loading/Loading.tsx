import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-background dark:bg-gray-900 overflow-auto">
      {/* Navbar Skeleton */}
      <div className="sticky top-0 z-[10000] w-full bg-background/95 shadow backdrop-blur skeleton-navbar">
        <div className="mx-4 sm:mx-8 flex h-14 items-center">
          <div className="flex items-center space-x-4 lg:space-x-0">
            {/* Menu button skeleton */}
            <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded shimmer"></div>
            {/* Title skeleton */}
            <div className="w-60 sm:w-80 h-6 bg-gray-300 dark:bg-gray-600 rounded shimmer"></div>
          </div>
          <div className="flex flex-1 items-center justify-end">
            {/* User nav skeleton */}
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full shimmer"></div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="w-full pb-8 px-4 sm:px-8 skeleton-content">
        <div
          className="w-full mx-auto px-2 sm:px-5 flex flex-col"
          style={{
            height: `calc(85vh)`,
          }}
        >
          {/* Filters Bar Skeleton */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full py-5 gap-4 lg:gap-0 skeleton-filters">
            {/* Left side filters */}
            <div className="flex flex-wrap justify-start items-center gap-2 sm:gap-4 p-2 w-full lg:w-auto">
              {/* All Filters button */}
              <div className="w-24 sm:w-28 h-10 bg-gray-300 dark:bg-gray-600 rounded-xl shimmer"></div>

              {/* Search location */}
              <div className="flex items-center">
                <div className="w-32 sm:w-40 h-10 bg-gray-300 dark:bg-gray-600 rounded-l-xl shimmer"></div>
                <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-r-xl shimmer"></div>
              </div>

              {/* Price range selects */}
              <div className="flex gap-1">
                <div className="w-28 sm:w-34 h-10 bg-gray-300 dark:bg-gray-600 rounded-xl shimmer"></div>
                <div className="w-28 sm:w-34 h-10 bg-gray-300 dark:bg-gray-600 rounded-xl shimmer"></div>
              </div>

              {/* Beds and baths */}
              <div className="flex gap-1">
                <div className="w-20 sm:w-28 h-10 bg-gray-300 dark:bg-gray-600 rounded-xl shimmer"></div>
                <div className="w-20 sm:w-28 h-10 bg-gray-300 dark:bg-gray-600 rounded-xl shimmer"></div>
              </div>

              {/* Property type */}
              <div className="w-32 sm:w-40 h-10 bg-gray-300 dark:bg-gray-600 rounded-xl shimmer"></div>
            </div>

            {/* View mode buttons */}
            <div className="flex justify-end items-center gap-4 p-2 w-full lg:w-auto">
              <div className="flex border border-gray-300 dark:border-gray-600 rounded-xl">
                <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-l-xl shimmer"></div>
                <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-r-xl shimmer"></div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-col lg:flex-row justify-between flex-1 overflow-hidden gap-3 mb-5 skeleton-main-content">
            {/* Map Skeleton */}
            <div className="flex-1 bg-gray-300 dark:bg-gray-600 rounded-lg shimmer relative min-h-[300px] lg:min-h-0">
              {/* Map controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <div className="w-10 h-10 bg-gray-400 dark:bg-gray-500 rounded shimmer"></div>
                <div className="w-10 h-10 bg-gray-400 dark:bg-gray-500 rounded shimmer"></div>
              </div>
              {/* Map markers simulation */}
              <div className="absolute top-1/4 left-1/3 w-6 h-6 bg-gray-400 dark:bg-gray-500 rounded-full shimmer"></div>
              <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-gray-400 dark:bg-gray-500 rounded-full shimmer"></div>
              <div className="absolute top-3/4 left-2/3 w-6 h-6 bg-gray-400 dark:bg-gray-500 rounded-full shimmer"></div>
              {/* Additional map elements */}
              <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-gray-400 dark:bg-gray-500 rounded-full shimmer"></div>
              <div className="absolute top-2/3 left-3/4 w-4 h-4 bg-gray-400 dark:bg-gray-500 rounded-full shimmer"></div>
            </div>

            {/* Listings Skeleton */}
            <div className="w-full lg:basis-4/12 overflow-y-auto skeleton-listings">
              <div className="w-full">
                {/* Results count skeleton */}
                <div className="px-4 mb-4">
                  <div className="w-40 sm:w-48 h-4 bg-gray-300 dark:bg-gray-600 rounded shimmer"></div>
                </div>

                {/* Property Cards Skeleton */}
                <div className="p-4 w-full space-y-5">
                  {[...Array(3)].map((_, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg w-full"
                    >
                      {/* Image skeleton */}
                      <div className="relative">
                        <div className="w-full h-48 bg-gray-300 dark:bg-gray-600 shimmer"></div>
                        {/* Badges skeleton */}
                        <div className="absolute bottom-4 left-4 flex gap-2">
                          <div className="w-16 sm:w-20 h-6 bg-gray-400 dark:bg-gray-500 rounded-full shimmer"></div>
                          <div className="w-20 sm:w-24 h-6 bg-gray-400 dark:bg-gray-500 rounded-full shimmer"></div>
                        </div>
                        {/* Heart button skeleton */}
                        <div className="absolute bottom-4 right-4 w-10 h-10 bg-gray-400 dark:bg-gray-500 rounded-full shimmer"></div>
                      </div>

                      {/* Card content skeleton */}
                      <div className="p-4">
                        {/* Title */}
                        <div className="w-3/4 h-6 bg-gray-300 dark:bg-gray-600 rounded mb-2 shimmer"></div>
                        {/* Address */}
                        <div className="w-1/2 h-4 bg-gray-300 dark:bg-gray-600 rounded mb-3 shimmer"></div>

                        {/* Rating and price row */}
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded mr-2 shimmer"></div>
                            <div className="w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded shimmer"></div>
                          </div>
                          <div className="w-20 sm:w-24 h-6 bg-gray-300 dark:bg-gray-600 rounded shimmer"></div>
                        </div>

                        <hr className="my-3 border-gray-200 dark:border-gray-700" />

                        {/* Property details */}
                        <div className="flex justify-between items-center gap-2 sm:gap-4">
                          <div className="flex items-center">
                            <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded mr-2 shimmer"></div>
                            <div className="w-8 sm:w-12 h-4 bg-gray-300 dark:bg-gray-600 rounded shimmer"></div>
                          </div>
                          <div className="flex items-center">
                            <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded mr-2 shimmer"></div>
                            <div className="w-8 sm:w-12 h-4 bg-gray-300 dark:bg-gray-600 rounded shimmer"></div>
                          </div>
                          <div className="flex items-center">
                            <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded mr-2 shimmer"></div>
                            <div className="w-12 sm:w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded shimmer"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

   
      
    </div>
  );
};

export default Loading;
