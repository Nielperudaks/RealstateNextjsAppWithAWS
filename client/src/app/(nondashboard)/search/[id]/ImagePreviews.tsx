"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const ImagePreviews = ({ images }: ImagePreviewsProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative h-[450px] w-full">
      {images.map((images, index) => (
        <div
          key={images}
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out 
            ${index === currentImageIndex ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={images}
            alt={`property image: ${index + 1}`}
            fill
            priority={index == 0}
            className="object-cover cursor-pointer transition-transform duration-500 ease-in-out"
          />
        </div>
      ))}
      <Button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-primary/50 p-2 rounded-full focus:outline-none focus:ring focus:ring-primary"
        aria-label="previous image"
      >
        <ChevronLeft className="text-white" />
      </Button>
      <Button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-primary/50 p-2 rounded-full focus:outline-none focus:ring focus:ring-primary"
        aria-label="previous image"
      >
        <ChevronRight className="text-white" />
      </Button>
    </div>
  );
};

export default ImagePreviews;
