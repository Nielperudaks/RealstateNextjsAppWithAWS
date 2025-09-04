import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { wktToGeoJSON } from "@terraformer/wkt";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import axios from "axios";
import { Location } from "@prisma/client";

const prisma = new PrismaClient();

const s3Client = new S3Client({
  region: process.env.AWS_REGION ?? "ap-southeast-2",
});

export const getProperties = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      favoriteIds,
      priceMin,
      priceMax,
      beds,
      baths,
      propertyType,
      squareFeetMin,
      squareFeetMax,
      amenities,
      availableFrom,
      latitude,
      longitude,
    } = req.query;

    let whereConditions: Prisma.Sql[] = [];

    if (favoriteIds) {
      const favoriteIdsArray = (favoriteIds as string).split(",").map(Number);
      whereConditions.push(
        Prisma.sql`p.id IN (${Prisma.join(favoriteIdsArray)})`
      );
    }

    if (priceMin) {
      whereConditions.push(
        Prisma.sql`p."pricePerMonth" >= ${Number(priceMin)}`
      );
    }
    if (priceMax) {
      whereConditions.push(
        Prisma.sql`p."pricePerMonth" <= ${Number(priceMax)}`
      );
    }

    if (beds && beds !== "any") {
      whereConditions.push(Prisma.sql`p.beds >= ${Number(beds)}`);
    }

    if (baths && baths !== "any") {
      whereConditions.push(Prisma.sql`p.baths >= ${Number(baths)}`);
    }

    if (squareFeetMin) {
      whereConditions.push(
        Prisma.sql`p."squareFeet" >= ${Number(squareFeetMin)}`
      );
    }

    if (squareFeetMax) {
      whereConditions.push(
        Prisma.sql`p."squareFeet" <= ${Number(squareFeetMax)}`
      );
    }

    if (propertyType && propertyType !== "any") {
      whereConditions.push(
        Prisma.sql`p."propertyType" = ${propertyType}::"PropertyType"`
      );
    }

    if (amenities && amenities !== "any") {
      const amenitiesArray = (amenities as string).split(",");
      whereConditions.push(
        Prisma.sql`p.amenities @> ${amenitiesArray}::"Amenity"[]`
      );
    }

    if (availableFrom && availableFrom !== "any") {
      const availableFromDate =
        typeof availableFrom === "string" ? availableFrom : null;
      if (availableFromDate) {
        const date = new Date(availableFromDate);
        if (!isNaN(date.getTime())) {
          whereConditions.push(
            Prisma.sql`EXISTS (SELECT 1 FROM "lease" l WHERE l."propertyId" = p.id AND l."startDate" <= ${date.toISOString})`
          );
        }
      }
    }

    if (latitude && longitude) {
      const lat = parseFloat(latitude as string);
      const lng = parseFloat(longitude as string);
      const radiusInKilometers = 1000;
      const degrees = radiusInKilometers / 111; //kilometer conversion to degrees

      whereConditions.push(
        Prisma.sql`ST_DWithin(
                l.coordinates::geometry,
                ST_SetSRID(ST_MakePoint(${lng},${lat}), 4326),
                ${degrees}
            )`
      );
    }

    const completeQuery = Prisma.sql`
        SELECT 
        p.*,
        json_build_object(
            'id', l.id,
            'address', l.address,
            'city', l.city,
            'state', l.state,
            'country', l.country,
            'postalCode', l."postalCode",
            'coordinates', json_build_object(
                'longitude', ST_X(l."coordinates"::geometry),
                'latitude', ST_Y(l."coordinates"::geometry)
            ) 
        ) as location
        FROM  "Property" p
        join "Location" l ON p."locationId" = l.id
        ${
          whereConditions.length > 0
            ? Prisma.sql`WHERE ${Prisma.join(whereConditions, " AND ")}`
            : Prisma.empty
        }
    `;

    const properties = await prisma.$queryRaw(completeQuery);

    res.json(properties);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `error retrieving properties${error.message}` });
  }
};

export const getProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const property = await prisma.property.findUnique({
      where: { id: Number(id) },
      include: {
        location: true,
      },
    });
    if (!property) {
      res.status(404).json({ message: "Property not found" });
    }
    if (property) {
      const coordinates: { coordinates: string }[] =
        await prisma.$queryRaw`SELECT ST_asText(coordinates) as coordinates from "Location"  where id= ${property.location.id}`;

      const geoJSON: any = wktToGeoJSON(coordinates[0]?.coordinates || "");
      const longitude = geoJSON.coordinates[0];
      const latitude = geoJSON.coordinates[1];

      const propertyWithCoordinates = {
        ...property,
        location: {
          ...property.location,
          coordinates: {
            longitude,
            latitude,
          },
        },
      };
      res.json(propertyWithCoordinates);
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `error retrieving property${error.message}` });
  }
};

export const deleteProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const propertyId = Number(id);

    if (!propertyId) {
      res.status(400).json({ message: "Property ID is required" });
      return;
    }

    // Check if property exists and get related records
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      include: {
        location: true,
        leases: true,
        applications: true,
      },
    });

    if (!property) {
      res.status(404).json({ message: "Property not found" });
      return;
    }

    // Check if property has active leases or applications
    const hasActiveLeases = property.leases && property.leases.length > 0;
    const hasApplications =
      property.applications && property.applications.length > 0;

    if (hasActiveLeases || hasApplications) {
      const issues = [];
      if (hasActiveLeases) issues.push(`${property.leases.length} lease(s)`);
      if (hasApplications)
        issues.push(`${property.applications.length} application(s)`);

      res.status(400).json({
        message: `Cannot delete property "${
          property.name
        }" because it has associated ${issues.join(
          " and "
        )}. Please remove these first or contact support.`,
      });
      return;
    }

    // If no blocking relationships, proceed with deletion
    // Delete the property first
    await prisma.property.delete({
      where: { id: propertyId },
    });

    // Delete the associated location if it exists
    if (property.locationId) {
      try {
        await prisma.location.delete({
          where: { id: property.locationId },
        });
      } catch (locationError) {
        // Location might be shared or already deleted, log but don't fail
        console.warn(
          `Could not delete location ${property.locationId}:`,
          locationError
        );
      }
    }

    res.json({ message: "Property deleted successfully" });
  } catch (error: any) {
    // Handle specific database constraint errors
    if (error.code === "P2003") {
      res.status(400).json({
        message:
          "Cannot delete property because it has associated records (leases, applications, or tenants). Please remove these relationships first.",
      });
    } else {
      res
        .status(500)
        .json({ message: `Error deleting property: ${error.message}` });
    }
  }
};

export const createProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[];
    const {
      address,
      city,
      state,
      country,
      postalCode,
      managerCognitoId,
      ...propertyData
    } = req.body;

    // const photoUrls = await Promise.all(
    //   files.map(async (file) => {
    //     const uploadParams = {
    //       Bucket: process.env.S3_BUCKET_NAME!,
    //       Key: `properties/${Date.now()}-${file.originalname}`,
    //       Body: file.buffer,
    //       ContentType: file.mimetype,
    //     };

    //     const uploadResult = await new Upload({
    //       client: s3Client,
    //       params: uploadParams,
    //     }).done();

    //     return uploadResult.Location;
    //   })
    // );

    // Try geocoding with the full address first
    let geocodingUrl = `https://nominatim.openstreetmap.org/search?${new URLSearchParams(
      {
        street: address,
        city,
        country,
        postalcode: postalCode,
        format: "json",
        limit: "1",
      }
    ).toString()}`;

    let geocodingResponse = await axios.get(geocodingUrl, {
      headers: {
        "User-Agent": "RealEstateApp (renielperuda2@gmail.com)",
      },
    });

    // If no results, try with just city and country
    if (!geocodingResponse.data || geocodingResponse.data.length === 0) {
      geocodingUrl = `https://nominatim.openstreetmap.org/search?${new URLSearchParams(
        {
          city,
          country,
          format: "json",
          limit: "1",
        }
      ).toString()}`;

      geocodingResponse = await axios.get(geocodingUrl, {
        headers: {
          "User-Agent": "RealEstateApp (renielperuda2@gmail.com)",
        },
      });
    }

    let longitude: number;
    let latitude: number;

    if (geocodingResponse.data[0]?.lon && geocodingResponse.data[0]?.lat) {
      longitude = parseFloat(geocodingResponse.data[0].lon);
      latitude = parseFloat(geocodingResponse.data[0].lat);
    } else {
      // If geocoding fails completely, use Philippines center coordinates as fallback
      // This is better than [0, 0] which places markers in the ocean
      longitude = 120.9842; // Philippines longitude
      latitude = 14.5995; // Philippines latitude
      console.warn(
        `Geocoding failed for address: ${address}, ${city}, ${country}. Using Philippines fallback coordinates.`
      );
    }

    // create location
    const [location] = await prisma.$queryRaw<Location[]>`
      INSERT INTO "Location" (address, city, state, country, "postalCode", coordinates)
      VALUES (${address}, ${city}, ${state}, ${country}, ${postalCode}, ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326))
      RETURNING id, address, city, state, country, "postalCode", ST_AsText(coordinates) as coordinates;
    `;

    // create property
    const newProperty = await prisma.property.create({
      data: {
        ...propertyData,
        // photoUrls,
        locationId: location?.id,
        managerCognitoId,
        amenities:
          typeof propertyData.amenities === "string"
            ? propertyData.amenities.split(",")
            : [],
        highlights:
          typeof propertyData.highlights === "string"
            ? propertyData.highlights.split(",")
            : [],
        isPetsAllowed: propertyData.isPetsAllowed === "true",
        isParkingIncluded: propertyData.isParkingIncluded === "true",
        pricePerMonth: parseFloat(propertyData.pricePerMonth),
        securityDeposit: parseFloat(propertyData.securityDeposit),
        applicationFee: parseFloat(propertyData.applicationFee),
        beds: parseInt(propertyData.beds),
        baths: parseFloat(propertyData.baths),
        squareFeet: parseInt(propertyData.squareFeet),
      },
      include: {
        location: true,
        manager: true,
      },
    });

    res.status(201).json(newProperty);
  } catch (err: any) {
    res
      .status(500)
      .json({ message: `Error creating property: ${err.message}` });
  }
};
