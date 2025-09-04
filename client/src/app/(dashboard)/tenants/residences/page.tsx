"use client";

import Card from "@/components/card/Card";
import Header from "@/components/header/Header";
import Loading from "@/components/loading/Loading";
import {
  useGetAuthUserQuery,
  useGetCurrentResidencesQuery,
  useGetTenantQuery,
} from "@/state/api";
import React from "react";

const Residences = () => {
  const { data: authUser, error: authError } = useGetAuthUserQuery();
  const { data: tenant, error: tenantError } = useGetTenantQuery(
    authUser?.cognitoInfo?.userId || "",
    {
      skip: !authUser?.cognitoInfo?.userId,
    }
  );

  const {
    data: currentResidences,
    isLoading: residencesLoading,
    error: residencesError,
  } = useGetCurrentResidencesQuery(authUser?.cognitoInfo?.userId || "", {
    skip: !authUser?.cognitoInfo?.userId,
  });

  const isLoading = residencesLoading;

  // Helper function to extract error message
  const getErrorMessage = (error: any) => {
    if (!error) return "Unknown error";
    if (typeof error === "string") return error;
    if (error.message) return error.message;
    if (error.data?.message) return error.data.message;
    if (error.status) return `Error ${error.status}`;
    return "Unknown error";
  };

  if (isLoading) return <Loading />;

  if (authError)
    return (
      <div className="p-4 text-red-600">
        Error loading user authentication: {getErrorMessage(authError)}
      </div>
    );

  if (!authUser?.cognitoInfo?.userId) {
    return (
      <div className="p-4 text-yellow-600">
        No authenticated user found. Please log in.
      </div>
    );
  }

  if (tenantError)
    return (
      <div className="p-4 text-red-600">
        Error loading tenant data: {getErrorMessage(tenantError)}
      </div>
    );

  if (residencesError)
    return (
      <div className="p-4 text-red-600">
        Error loading current residences: {getErrorMessage(residencesError)}
      </div>
    );

  return (
    <div className="dashboard-container">
      <Header
        title="Current Residences"
        subtitle="View and manage your current living spaces"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentResidences?.map((property) => (
          <Card
            key={property.id}
            property={property}
            isFavorite={tenant?.favorites.includes(property.id) || false}
            onFavoriteToggle={() => {}}
            showFavoriteButton={false}
            propertyLink={`/tenants/residences/${property.id}`}
          />
        ))}
      </div>
      {(!currentResidences || currentResidences.length === 0) && (
        <p>You don&lsquo;t have any current residences</p>
      )}
    </div>
  );
};

export default Residences;
