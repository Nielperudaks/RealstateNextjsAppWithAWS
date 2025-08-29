import { useGetPropertyQuery } from "@/state/api";
import { MapPin, Star } from "lucide-react";
import React from "react";

const PropertyOverview = ({ propertyId }: PropertyOverviewProps) => {
  const {
    data: property,
    isError,
    isLoading,
  } = useGetPropertyQuery(propertyId);

  if (isLoading) return <>Loading...</>;
  if (isError || !property) {
    return <>Property not Found</>;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <div className="text-sm text-gray-500 mb-1">
          {property.location?.country} / {property.location?.state} /{" "}
          <span className="font-semibold text-gray-600">
            {property.location?.city}
          </span>
        </div>
        <h1 className="text-3xl text-primary font-bold my-5">{property.name}</h1>
        <div className="flex justify-between items-center">
          <span className="flex items-center text-gray-500">
            <MapPin className="w-4 h-4 mr-1 text-gray-700" />
            {property.location?.city}, {property.location?.state},{" "}
            {property.location?.country}
          </span>
          <div className="flex justify-between items-center gap-3">
            <span className="flex items-center text-yellow-500">
              <Star className="w-4 h-4 mr-1 fill-current" />
              {property.averageRating.toFixed(1)} ({property.numberOfReviews}{" "}
              Reviews)
            </span>
            <span className="text-green-600">Verified Listing</span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="border border-primary-200 rounded-xl p-6 mb-6">
        <div className="flex justify-between items-center gap-4 px-5">
          <div>
            <div className="text-sm text-gray-500">Monthly Rent</div>
            <div className="font-semibold">
              ${property.pricePerMonth.toLocaleString()}
            </div>
          </div>
          <div className="border-l border-gray-300 h-10"></div>
          <div>
            <div className="text-sm text-gray-500">Bedrooms</div>
            <div className="font-semibold">{property.beds} bd</div>
          </div>
          <div className="border-l border-gray-300 h-10"></div>
          <div>
            <div className="text-sm text-gray-500">Bathrooms</div>
            <div className="font-semibold">{property.baths} ba</div>
          </div>
          <div className="border-l border-gray-300 h-10"></div>
          <div>
            <div className="text-sm text-gray-500">Square Feet</div>
            <div className="font-semibold">
              {property.squareFeet.toLocaleString()} sq ft
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="my-16">
        <h2 className="text-xl font-semibold mb-5">About {property.name}</h2>
        <p className="text-gray-500 leading-7">
          {property.description}
          {` `}Welcome to your future home—a beautifully designed rental
          property that blends comfort, style, and convenience in one perfect
          package. From the moment you step inside, you’ll feel the warmth of a
          space that isn’t just a house, but a true place to live, relax, and
          create lasting memories. This rental home offers generous living space
          with an open-concept layout that allows natural light to flow freely,
          creating a bright and inviting atmosphere throughout. Whether you’re
          hosting family dinners, enjoying quiet evenings in the living room, or
          working from home, the design is crafted to meet all your lifestyle
          needs. The modern kitchen is a chef’s delight—equipped with
          high-quality countertops, ample storage cabinets, and updated
          appliances that make cooking and meal prep a breeze. Imagine whipping
          up your favorite recipes while still being connected with family or
          guests in the adjoining dining and living areas. Each bedroom is
          spacious and serene, designed with relaxation in mind. Large windows
          provide plenty of sunlight by day, while the thoughtful layout ensures
          peace and privacy at night. The master suite, in particular, offers a
          cozy retreat, with enough space to create your personal sanctuary. The
          bathrooms are sleek and functional, featuring elegant fixtures, clean
          finishes, and all the conveniences you’d expect in a modern home. Step
          outside and you’ll find a private outdoor space perfect for morning
          coffees, weekend BBQs, or simply unwinding after a long day. Whether
          it’s a charming backyard, balcony, or patio, this area will quickly
          become one of your favorite spots. Beyond the house itself, location
          is everything—and this property doesn’t disappoint. Situated in a
          safe, welcoming neighborhood, you’ll enjoy easy access to schools,
          shops, restaurants, parks, and public transportation. Commuting to
          work or running errands has never been easier, giving you more time to
          enjoy the things that matter most.
        </p>
      </div>
    </div>
  );
};

export default PropertyOverview;
