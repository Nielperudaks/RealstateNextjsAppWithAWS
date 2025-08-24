"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay, Search } from "lucide-react";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Input } from "../ui/input";

const Hero01 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <Image
        src="/landing-splash.jpg"
        alt="landing image"
        fill
        className="object-cover object-center"
        priority
      ></Image>
      <div className="absolute inset-0 bg-gray-950/60"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 text-center w-full "
      >
        <div className="max-w-4xl  mx-auto px-16 sm:px-12">
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-7xl md:leading-[1.2] font-bold text-white">
            Start your journey to finding perfect place to call home
          </h1>
          <p className="mt-6 text-[17px] md:text-lg text-white">
            Explore our wide range of rental properties tailored to fit your lifestyle and needs!
          </p>
          <div className="mt-12 flex items-center justify-center">
            <Input type="text" value="" onChange={() => {}} placeholder="Search by city, neighborhood or address" 
            className="w-full max-w-lg rounded-none rounded-l-full border-none bg-white h-12 "></Input>
            <Button onClick={()=> {}} className="bg-primary text-white rounded-none rounded-r-full border-none hover:bg-stone-800 h-12 ">
              <Search/> Search
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero01;
