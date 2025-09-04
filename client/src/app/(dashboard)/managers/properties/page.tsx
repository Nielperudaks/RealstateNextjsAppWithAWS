"use client";

import Card from "@/components/card/Card";
import Header from "@/components/header/Header";
import Loading from "@/components/loading/Loading";
import { useGetAuthUserQuery, useGetManagerPropertiesQuery, useDeletePropertyMutation } from "@/state/api";
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const Properties = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const [deleteProperty] = useDeletePropertyMutation();
  const {
    data: managerProperties,
    isLoading,
    error,
  } = useGetManagerPropertiesQuery(authUser?.cognitoInfo?.userId || "", {
    skip: !authUser?.cognitoInfo?.userId,
  });

  const handleDeleteProperty = async (propertyId: number, propertyName: string) => {
    if (window.confirm(`Are you sure you want to delete "${propertyName}"? This action cannot be undone.`)) {
      try {
        await deleteProperty(propertyId).unwrap();
      } catch (error: any) {
        console.error("Failed to delete property:", error);
        // The error toast will be shown automatically by the mutation
        // but we can also show additional context if needed
        if (error?.data?.message) {
          alert(`Deletion failed: ${error.data.message}`);
        }
      }
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading Properties</div>;

  return (
    <div className="dashboard-container">
      <Header
        title="My Properties"
        subtitle="View and manage your property listings"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {managerProperties?.map((property) => (
          <div key={property.id} className="relative">
            <Card
              property={property}
              isFavorite={false}
              onFavoriteToggle={() => {}}
              showFavoriteButton={false}
              propertyLink={`/managers/properties/${property.id}`}
            />
            <Button
              onClick={() => handleDeleteProperty(property.id, property.name)}
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2 p-2 h-8 w-8"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      {(!managerProperties || managerProperties.length === 0) && (
        <p>You don&lsquo;t manage any properties</p>
      )}
    </div>
  );
};

export default Properties;
