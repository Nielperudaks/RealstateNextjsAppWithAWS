"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Blocks,
  BookOpen,
  BookOpenCheck,
  CalendarSync,
  NotebookPen,
  Search,
  Settings2,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/shadcn-io/dot-pattern";

const Features03Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center pb-24">
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_top_left,white,transparent,transparent)] -z-1 bg-background"
        )}
      />

      <div className="w-full max-w-screen-lg mx-auto py-12 px-6">
        <h2 className="text-3xl text-center pb-6 leading-10 sm:text-4xl md:text-[40px] md:leading-[3.25rem] font-bold tracking-tight">
          Discover <br />
          <span className="font-light">
            Find your Dream Rental Property Today!
          </span>
        </h2>
        <p className="text-center">
          Finding your dream rental property has never been easier. With our
          user friendly search feature, you can quickly find the perfect home
          that meets all your needs. Start the search today and discover your
          dream property!
        </p>
        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <motion.div
            className="bg-muted rounded-xl pt-6 md:pt-8 pb-6 px-6 col-span-1 md:col-span-2 lg:col-span-1"
            initial={{
              opacity: 0,
              x: -20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.2,
            }}
          >
            {/* Media 1 Mobile */}

            <div className="md:hidden mb-6 aspect-video w-full relative bg-background border rounded-xl">
              <Image
                src="/feature2-image2.png"
                alt="feature image 2"
                fill
                className="object-cover"
              ></Image>
            </div>

            <span className="text-2xl font-semibold tracking-tight">
              Search for Properties
            </span>

            <ul className="mt-6 space-y-4">
              <li>
                <div className="flex items-start gap-3">
                  <Search className="shrink-0" />
                  <p className="-mt-0.5">
                    <span className="font-bold">Advanced Property Search </span>{" "}
                    <br />
                    Quickly find houses for rent using filters such as location,
                    price range, property type, and number of rooms.
                  </p>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <NotebookPen className="shrink-0" />
                  <p className="-mt-0.5">
                    <span className="font-bold">Detailed Listings </span>
                    <br />
                    view comprehensive property details including photos,
                    descriptions, amenities, and nearby landmarks.
                  </p>
                </div>
              </li>
            </ul>

            {/* <Button className="mt-12 w-full">
              Build your strategy <ArrowRight />
            </Button> */}
          </motion.div>
          {/* Media 1 Desktop */}
          <motion.div
            className="hidden md:block col-span-1 md:col-span-3 lg:col-span-2 h-100 relative  rounded-xl overflow-hidden"
            initial={{
              opacity: 0,
              x: -20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.2,
            }}
          >
            <Image
              src="/feature2-image2.png"
              alt="feature image 2"
              fill
              className="object-cover"
            ></Image>
          </motion.div>

          {/* Media 2 Desktop */}
          <motion.div
            className="hidden md:block col-span-1 md:col-span-3 lg:col-span-2 h-100 relative  rounded-xl overflow-hidden"
            initial={{
              opacity: 0,
              x: 20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.2,
            }}
          >
            <Image
              src="/feature2-image1.png"
              alt="feature image 1"
              fill
              className="object-cover"
            ></Image>
          </motion.div>
          {/* Card 2 */}
          <motion.div
            className="bg-muted rounded-xl pt-6 md:pt-8 pb-6 px-6 col-span-1 md:col-span-2 lg:col-span-1"
            initial={{
              opacity: 0,
              x: 20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.2,
            }}
          >
            {/* Media 2 Mobile */}
            <div className="md:hidden mb-6 aspect-video relative w-full bg-background border rounded-xl">
              <Image
                src="/feature2-image1.png"
                alt="feature image 1"
                fill
                className="object-cover"
              ></Image>
            </div>

            <span className="text-2xl font-semibold tracking-tight">
              Book your Rental
            </span>

            <ul className="mt-6 space-y-4">
              <li>
                <div className="flex items-start gap-3">
                  <BookOpenCheck className="shrink-0" />
                  <p className="-mt-0.5">
                    <span className="font-bold">Easy Booking Process</span>
                    <br />
                    Secure your chosen property with just a few clicks through a
                    simple and user-friendly booking system.
                  </p>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <CalendarSync className="shrink-0" />
                  <p className="-mt-0.5">
                    <span className="font-bold">Flexible Scheduling</span>{" "}
                    <br />
                    Choose your preferred move-in date and time that works best
                    for you.
                  </p>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <Zap className="shrink-0" />
                  <p className="-mt-0.5">
                    <span className="font-bold">Instant Confirmation</span>{" "}
                    <br />
                    Receive real-time booking confirmation and property details
                    right after securing your rental.
                  </p>
                </div>
              </li>
            </ul>

            {/* <Button className="mt-12 w-full">
              Build your strategy <ArrowRight />
            </Button> */}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Features03Page;
