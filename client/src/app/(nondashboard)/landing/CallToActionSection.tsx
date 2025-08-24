"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { EtheralShadow } from "@/components/ui/shadcn-io/etheral-shadow";
const CallToActionSection = () => {
  return (
    <EtheralShadow
      color="rgba(128, 128, 128, 1)"
      animation={{ scale: 100, speed: 90 }}
      noise={{ opacity: 1, scale: 1.2 }}
      sizing="fill"
      className="relative py-24 h-100"
    >
   
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        transition={{
          duration: 0.5,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true }}
        className="relative max-w-4xl xl:max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-12"
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:-mb-0 md:mr-10">
            <h2 className="text-3xl font-bold text-black">
              Find your Dream Property
            </h2>
          </div>
          <div className="">
            <p className="text-black mb-3 text-lg font-semibold">
              Discover a wide range of rental properties in your desired
              location
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <button
                className="inline-block text-black bg-white rounded-lg px-6 py-3 font-semibold hover:bg-gray-900 hover:text-white"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Search
              </button>
              <Link href="/signup" scroll={false}>
                <button className="inline-block text-white bg-primary rounded-lg px-6 py-3 font-semibold hover:bg-gray-200 hover:text-primary">
                  {" "}
                  Signup
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </EtheralShadow>
  );
};

export default CallToActionSection;
